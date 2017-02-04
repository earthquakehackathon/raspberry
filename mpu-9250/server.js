var express = require('express'); 
var app = express();
 
var capture = require('./capture');

var porta = 5000;
 
 
app.get('/mpu9250', function (req, res) { 
 
  res.header('Access-Control-Allow-Origin', '*');
  var data = capture.getdata(function(err,data){
    if(!err){
      process.stdout.write(JSON.stringify(data));
      res.json(data);
    }
  });
  
 
});
 
 
// Express route for any other unrecognised incoming requests
app.get('*', function(req, res) {
  res.status(404).send('Unrecognised API call');
});
 
var server = app.listen(porta, function () { // server in ascolto sulla porta
 
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log('App in ascolto su http://%s:%s', host, port);
 
});
