var ZWave = require('openzwave-shared');
var os = require('os');
//var player = require('play-sound')(opts = {player: "omxplayer"});
var winston = require('winston');
var async = require('async');
const delay = require('delay');

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

zwavedriverpath = '/dev/ttyACM1'

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
  logger.info('comclass added to node %d %s %s', nodeid, comclass, value);
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
  if (value['label'] == "Seismic Intensity") {
    logger.info(value['label']);
    //zwave.requestAllConfigParams(3);
    //player.play('/home/pi/Music/hit_me.m4a');
    
    zwave.setValue(2, 51, 1, 0, "#FF000000"); //red 
    delay(25)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FFFFFF99"); // white
    });
    delay(150)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#0000FF00"); // blue
    });
    delay(250)
    .then(() => {
        zwave.setValue(2, 38, 1, 0, 0);// dim
    }); 
    delay(350)
    .then(() => {
    zwave.setValue(2, 51, 1, 0, "#FF000000"); //red 
    });
    delay(650)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FFFFFF99"); // white
    });
    delay(950)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#0000FF00"); // blue
    });
    delay(1150)
    .then(() => {
        zwave.setValue(2, 38, 1, 0, 0);// dim
    });
    
    delay(1250)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FF000000"); //red 
    });
    delay(1350)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FFFFFF99"); // white
    });
    delay(1450)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#0000FF00"); // blue
    });
    delay(1650)
    .then(() => {
        zwave.setValue(2, 38, 1, 0, 0);// dim
    });
    
    delay(1850)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FF000000"); //red 
    });
    delay(2050)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FFFFFF99"); // white
    });
    delay(2150)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#0000FF00"); // blue
    });
    delay(2250)
    .then(() => {
        zwave.setValue(2, 38, 1, 0, 0);// dim
    });
    
    delay(2450)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FF000000"); //red 
    });
    delay(2650)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FFFFFF99"); // white
    });
    delay(2650)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#0000FF00"); // blue
    });
    delay(2850)
    .then(() => {
        zwave.setValue(2, 38, 1, 0, 0);// dim
    });    
    delay(3050)
    .then(() => {
       zwave.setValue(2, 51, 1, 0, "#FF000000"); //red 
    });
    delay(3250)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FFFFFF99"); // white
        //zwave.setValue(2, 38, 1, 0, 99)  
    });
    delay(3500)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#0000FF00"); // blue
    });
    delay(3750)
    .then(() => {
        zwave.setValue(2, 38, 1, 0, 0);// dim
    });
    
    zwave.setValue(2, 51, 1, 0, "#FF000000"); //red 
    delay(3950)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FF000000"); //red 
    });
    delay(4150)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FFFFFF99"); // white
    });

    delay(4250)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#0000FF00"); // blue
    });
    delay(4350)
    .then(() => {
        zwave.setValue(2, 38, 1, 0, 0);// dim
    });
    
    delay(4450)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FF000000"); //red 
    });
    delay(4550)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#FFFFFF99"); // white
    });

    delay(4650)
    .then(() => {
        zwave.setValue(2, 51, 1, 0, "#0000FF00"); // blue
    });
    delay(4800)
    .then(() => {
        zwave.setValue(2, 38, 1, 0, 0);// dim
    });  
  
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
    //logger.info('node%d: class %d', nodeid, comclass);
    //for (idx in values)
      //logger.info('node%d:   %s=%s', nodeid, values[idx]['label'], values[
      //  idx]['value']);
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
