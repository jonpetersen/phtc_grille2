// teal #00808000
// green #00800000
// cyan #00FFFF00 (bright)
// purple #50008000
// olive #80800000
// maroon #80000000
// grey #80808000
// silver #9BAEC000 (bright)
// magenta #DA36FF00
// yellow #B087FF00
// blue #0000FF00
// lime #008A3B00 (bright)
// red #FF000000
// warm white #000000FF
// cool white

var ZWave = require('openzwave-shared');
var winston = require('winston');
var fs = require('fs');
var yaml = require("node-yaml")
const delay = require('delay');
var DashingClient = require('dashing-client');
var dashing = new DashingClient("http://localhost:3030", "YOUR_AUTH_TOKEN");

var configFile = '/home/pi/phtc/phtc_grille2.json';
var config = JSON.parse(
    fs.readFileSync(configFile));

const env = process.env.NODE_ENV || 'development';
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: '/home/pi/phtc/phtc_grille.log',
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});

var zwave = new ZWave({
  ConsoleOutput: false
});

// global params
var seismic_intensity = config.SeismicIntensity;
var zwavedriverpath = config.UsbPort;
var routine = config.Routine;

// params for predefined routine
var predefined_secs_until_dim = config.PredefinedSecondsUntilDim * 1000;

//params for custom routine
var delay_secs = config.DelaySecs * 1000;
var delay_increment_secs = config.DelayIncrementSecs * 1000;   
var loop_number = config.LoopNumber;    
var interval_secs = config.IntervalSecs * 1000;

if (routine == "predefined") {
  predefined_routine = config.PredefinedRoutine
  if (predefined_routine == 1) {
    var predefined_program = config.PredefinedRoutines.Routine1  
  }
  if (predefined_routine == 2) {
    var predefined_program = config.PredefinedRoutines.Routine2  
  }
};

if (routine == "custom") {
  custom_routine = config.CustomRoutine
  if (custom_routine == 1) {
    var colour1 = config.Custom1.Colour1;
    var colour2 = config.Custom1.Colour2;
    var colour3 = config.Custom1.Colour3;
  }
  if (custom_routine == 2) {
    var colour1 = config.Custom2.Colour1;
    var colour2 = config.Custom2.Colour2;
    var colour3 = config.Custom2.Colour3;
  }
  if (custom_routine == 3) {
    var colour1 = config.Custom3.Colour1;
    var colour2 = config.Custom3.Colour2;
    var colour3 = config.Custom3.Colour3;
  }
}; 

var nodes = [];
var homeid = null;
zwave.on('driver ready', function(home_id) {
  homeid = home_id;
  logger.info('scanning homeid=0x%s...', homeid.toString(16));
});

zwave.on('driver failed', function() {
  logger.info('failed to start driver');
  zwave.disconnect();
  process.exit();
});

zwave.on('node added', function(nodeid) {
  logger.info('node added');
  nodes[nodeid] = {
    manufacturer: '',
    manufacturerid: '',
    product: '',
    producttype: '',
    productid: '',
    type: '',
    name: '',
    loc: '',
    classes: {},
    ready: false,
  };
});

zwave.on('node event', function(nodeid, data) {
  logger.info('node%d event: Basic set %d', nodeid, data);
});

zwave.on('value added', function(nodeid, comclass, value) {
  //logger.info('comclass added to node %d %s %s', nodeid, comclass, value);
  if (!nodes[nodeid]['classes'][comclass])
    nodes[nodeid]['classes'][comclass] = {};
  nodes[nodeid]['classes'][comclass][value.index] = value;
});

zwave.on('value changed', function(nodeid, comclass, value) {
  logger.info('node%d: changed: %d:%s:%s->%s', nodeid, comclass,
    value['label'],
    nodes[nodeid]['classes'][comclass][value.index]['value'],
    value['value']);
//  }
//  if (value['label'] == "Burglar") {
  
  // write seismic value to yaml for dashboard

  if (value['label'] == "Seismic Intensity" && value['value'] > 0.0 && nodeid == "3") {
    yaml.write("/home/pi/phtc/last_seismic_intensity1.yml", value['value']);
    logger.info('sensor 1 hit');
    logger.info(nodeid);
  }
  if (value['label'] == "Seismic Intensity" && value['value'] > 0.0 && nodeid == "4") {
    yaml.write("/home/pi/phtc/last_seismic_intensity2.yml", value['value']);
    logger.info('sensor 2 hit');
    logger.info(nodeid);
  }
  
  if ((value['label'] == "Seismic Intensity" && value['value'] > seismic_intensity && nodeid == "3")
      || (value['label'] == "Seismic Intensity" && value['value'] > seismic_intensity && nodeid == "4"))
   {
    //logger.info(value['label']);
    //logger.info(nodes[nodeid]['classes'][comclass][value.index]['value']);
    
    if (nodeid == "3") {yaml.write("/home/pi/phtc/last_seismic_intensity_lit1.yml", value['value']);}
    if (nodeid == "4") {yaml.write("/home/pi/phtc/last_seismic_intensity_lit2.yml", value['value']);}
    
    //dashing.send("welcome", {welcome: value['value']});
    
    logger.info(value['value']);
    //zwave.requestAllConfigParams(3);
    //player.play('/home/pi/Music/hit_me.m4a');
    logger.info('go lit');
    
    if (routine == "predefined") {
    
        zwave.setValue(2, 38, 1, 0, 99); // light up full brightness
        //zwave.setValue(2, 51, 1, 0, "#FF000000"); //red
        zwave.setValue(2, 112, 1, 72, predefined_program); //run pre-defined program
        
        delay(predefined_secs_until_dim)
        .then(() => {
            logger.info('%d - go dim');
            zwave.setValue(2, 38, 1, 0, 0);// dim
        });
      }
    else if (routine == "custom") {
      
      //zwave.setValue(2, 51, 1, 0, colour1);
      zwave.setValue(2, 38, 1, 0, 99);// light up full brightness
      for(var i=0; i < loop_number; i++){
        setTimeout( function (i) {
          delay(delay_secs + (delay_increment_secs * 0.2))
            .then(() => {
	          logger.info('%d - go colour1',i);
	          zwave.setValue(2, 51, 1, 0, colour1);
	      });
          delay(delay_secs + (delay_increment_secs * 0.4))
            .then(() => {
              logger.info('%d - go dim',i);
              zwave.setValue(2, 38, 1, 0, 0);// dim
          });
          delay(delay_secs + (delay_increment_secs * 0.6))
            .then(() => {
              logger.info('%d - light up full brightness',i);
              zwave.setValue(2, 38, 1, 0, 99);// light up full brightness
          });
          delay(delay_secs + (delay_increment_secs * 0.8))
            .then(() => {
              logger.info('%d - go colour2',i);
              zwave.setValue(2, 51, 1, 0, colour2);
          });
          delay(delay_secs + (delay_increment_secs * 1.0))
            .then(() => {
	          logger.info('%d - go dim',i);
	          zwave.setValue(2, 38, 1, 0, 0);// dim
	      });
          delay(delay_secs + (delay_increment_secs * 1.2))
            .then(() => {
              logger.info('%d - light up full brightness',i);
              zwave.setValue(2, 38, 1, 0, 99);// light up full brightness
          });
          delay(delay_secs + (delay_increment_secs * 1.4))
            .then(() => {
              logger.info('%d - go colour3',i);
              zwave.setValue(2, 51, 1, 0, colour3);
          });
          delay(delay_secs + (delay_increment_secs * 1.6))
            .then(() => {
              logger.info('%d - go dim',i);
              zwave.setValue(2, 38, 1, 0, 0);// dim
          });
          
        }, interval_secs * i, i);
      }
      delay(predefined_delay_secs)
        .then(() => {
            logger.info('%d - go dim');
            zwave.setValue(2, 38, 1, 0, 0);// dim
        });
    }     
  }
  
  nodes[nodeid]['classes'][comclass][value.index] = value;
});

zwave.on('value removed', function(nodeid, comclass, index) {
  if (nodes[nodeid]['classes'][comclass] &&
    nodes[nodeid]['classes'][comclass][index])
    delete nodes[nodeid]['classes'][comclass][index];
});

zwave.on('node ready', function(nodeid, nodeinfo) {
  logger.info('node ready');
  nodes[nodeid]['manufacturer'] = nodeinfo.manufacturer;
  nodes[nodeid]['manufacturerid'] = nodeinfo.manufacturerid;
  nodes[nodeid]['product'] = nodeinfo.product;
  nodes[nodeid]['producttype'] = nodeinfo.producttype;
  nodes[nodeid]['productid'] = nodeinfo.productid;
  nodes[nodeid]['type'] = nodeinfo.type;
  nodes[nodeid]['name'] = nodeinfo.name;
  nodes[nodeid]['loc'] = nodeinfo.loc;
  nodes[nodeid]['ready'] = true;
  logger.info('node%d: %s, %s', nodeid,
    nodeinfo.manufacturer ? nodeinfo.manufacturer : 'id=' + nodeinfo.manufacturerid,
    nodeinfo.product ? nodeinfo.product : 'product=' + nodeinfo.productid +
    ', type=' + nodeinfo.producttype);
  logger.info('node%d: name="%s", type="%s", location="%s"', nodeid,
    nodeinfo.name,
    nodeinfo.type,
    nodeinfo.loc);
  for (comclass in nodes[nodeid]['classes']) {
    switch (comclass) {
      case 0x25: // COMMAND_CLASS_SWITCH_BINARY
      case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
        zwave.enablePoll(nodeid, comclass);
        break;
    }
    var values = nodes[nodeid]['classes'][comclass];
  }
});

zwave.on('notification', function(nodeid, notif) {
  switch (notif) {
    case 0:
      logger.info('node%d: message complete', nodeid);
      break;
    case 1:
      logger.info('node%d: timeout', nodeid);
      break;
    case 2:
      logger.info('node%d: nop', nodeid);
      break;
    case 3:
      logger.info('node%d: node awake', nodeid);
      break;
    case 4:
      logger.info('node%d: node sleep', nodeid);
      break;
    case 5:
      logger.info('node%d: node dead', nodeid);
      break;
    case 6:
      logger.info('node%d: node alive', nodeid);
      break;
  }
});

zwave.on('scan complete', function() {
  logger.info('====> scan complete');
  // set dimmer node 5 to 50%
  //    zwave.setValue(2,38,1,0,50);
  //zwave.setValue({node_id:5,	class_id: 38,	instance:1,	index:0}, 50 );
});

zwave.on('controller command', function(n, rv, st, msg) {
  logger.info(
    'controller commmand feedback: %s node==%d, retval=%d, state=%d', msg,
    n, rv, st);
});

logger.info("connecting to " + zwavedriverpath);
zwave.connect(zwavedriverpath);

process.on('SIGINT', function() {
  logger.info('disconnecting...');
  zwave.disconnect(zwavedriverpath);
  process.exit();
});
