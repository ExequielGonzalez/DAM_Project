//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

var express = require('express');
var app = express();

//CORS Config
var corsConfig = {
    origin: '*',
    optionSuccessStatus:200

}


//CORS Setup
const cors = require('cors');
// to parse application/json
app.use(express.json());

//Middleware CORS
app.use(cors(corsConfig));


//logger function for troubleshooting
var logger = function (req, res, next) {
    console.log(req.method + " - " + req.url + " - " + new Date());   
    next();
}
app.use(logger);


//Device Router connection
var routerDevice = require('./route/device');
app.use('/api/v1/device', routerDevice);
//Measures Router connection
var routerMeasures = require('./route/Measures');
app.use('/api/v1/measure', routerMeasures);
var routerLogs = require('./route/LogRiego');
//Router connection for LogsRiego
app.use('/api/v1/logs', routerLogs);
  
//=======[ Main module code ]==================================================


app.listen(PORT, function (req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
