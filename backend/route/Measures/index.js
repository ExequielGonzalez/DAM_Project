const express = require('express');
var routerMeasure = express.Router();
var sql = require('../mysql');

//API Moudel to get and list measures from form DB DAM
// Basic functions for DB Data retrival 

// -- Get Last Measure for  (Device ID) : List last Device measurement for "Dispositivo ID"
//    Input parameter: DeviceID
//    Responds 200 if all OK, 400 if error while fetching data from DB
routerMeasure.get('/:id', function (req, res) {
    let deviceID = req.params.id;
    let query = 'Select * from Mediciones where dispositivoId=? order by fecha desc';
    sql.query(query, [deviceID], (err, data) => {
        if (err) {
            console.error(err);
            res.send(("Error listing measures for device " + deviceID ).status(400))
            return;
        }
        // rows fetch
        console.log(data);
        res.send(JSON.stringify(data[0])).status(200);
    });
});

// -- GET Measures List (DeviceID): List all measures for  "DispositivoID " Ordered in descendent mode.
//    Input parameter: DeviceID
//    Responds 200 if all OK, 400 if error while fetching data from DB
routerMeasure.get('/:id/all', function (req, res) {
    let deviceID = req.params.id;
    let query = 'Select * from Mediciones where dispositivoId=? order by fecha desc';
    sql.query(query, [deviceID], (err, data) => {
        if (err) {
            console.error(err);
            res.send(("Error listing measures for device " + deviceID ).status(400))
            return;
        }
        // rows fetch
        console.log(data);
        res.send(JSON.stringify(data)).status(200);
    });
    //res.send("dispositivo with id " + req.params.id);
});


// -- POST Add Measures: Adds a measure into a device with date and data provided in the body as a json object..
//    Input parameter: N/A
//    Body: Date, reading value, deviceId
//    Responds 200 if all OK, 400 if error while fetching data from DB
routerMeasure.post('/add', function(req, res) {
    console.log('DEBUG:  Add Measure: ' + JSON.stringify(req.body));
    sql.query("SET time_zone = '-06:00'");   // THIS NEEDS TO BE FIXED AND SET AS A PARAMETER, OR GENERAL VARIABLE
    sql.query('Insert into Mediciones (fecha,valor,dispositivoId) values (?,?,?)', [req.body.fecha, req.body.valor, req.body.dispositivoId], function(err, result, fields) {
        if (err) {
            console.error(err);
            res.send("Error while adding a new measurement").status(400);
            return;
        }
        res.send(result);
    });
});

// Module Export for user on Main module
module.exports = routerMeasure;
