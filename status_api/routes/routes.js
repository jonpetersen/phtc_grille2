const exec = require('child_process').exec;
var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });

  app.get("/appstatus", function(req, res) {
    exec('sudo systemctl show -p SubState --value thin.service',(error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
      return;
      }
      appstatus = `${stdout.replace(/ActiveState=/, '')}`
      res.status(200).send(appstatus.replace(/\s+$/, ''));
    });
  });
  
  app.get("/apprestart", function(req, res) {
    exec('sudo service thin restart',(error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
      return;
      }
      res.status(200).send(`${stdout.replace(/\s+$/, '')}`);
      res.redirect("http://petworth.dvrdns.org:3030/phtc");      
      return;
    });
  });

}

module.exports = appRouter;
