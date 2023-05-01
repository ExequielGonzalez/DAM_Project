const express = require('express');
var routerLogs = express.Router();
var sql = require('../mysql');

//API Moudel to get and list measures from form DB DAM
// Basic functions for DB Data retrival 

// -- Get Last log for  (ElectroVale ID) : List last Device status for "electrovalvulaId"
//    Input parameter: electrovalvulaId
//    Responds 200 if all OK, 400 if error while fetching data from DB
// 
routerLogs.get('/:id', function (req, res) {
    let electrovalvulaId = req.params.id;
    let query = 'Select * from Log_Riegos where electrovalvulaId=? order by fecha desc';
    sql.query(query, [electrovalvulaId], (err, data) => {
        if (err) {
            console.error(err);
            res.send(("Error reading logs for valve  " + electrovalvulaId ).status(400))
            return;
        }
        // rows fetch
        console.log(data[0]);
        res.send(JSON.stringify(data[0])).status(200);
    });
});

// -- GET List ALL Riego_logs for  (ElectroValve ID): List historical watering (valve status).
//    Input parameter: electrovalvulaId
//    Responds 200 if all OK, 400 if error while fetching data from DB
routerLogs.get('/:id/all', function (req, res) {
    let electrovalvulaId = req.params.id;
    let query = 'Select * from Log_Riegos where electrovalvulaId=? order by fecha desc';
    sql.query(query, [electrovalvulaId], (err, data) => {
        if (err) {
            console.error(err);
            res.send(("Error reading logs for valve " + electrovalvulaId ).status(400))
            return;
        }
        // rows fetch
        console.log(data);
        res.send(JSON.stringify(data)).status(200);
    });
    //res.send("dispositivo with id " + req.params.id);
});


// -- POST Add Log event: Adds a "riego" event: Valve open or close, based on the date and data provided in the body as a json object..
//    Input parameter: N/A
//    Body: Apertura: (Boolen open/close), date, electrovalvulaId
//    Responds 200 if all OK, 400 if error while fetching data from DB
routerLogs.post('/add', function(req, res) {
    console.log('DEBUG:  Add LogRiego: ' + JSON.stringify(req.body));
    sql.query("SET time_zone = '-06:00'");  // THIS NEEDS TO BE FIXED AND SET AS A PARAMETER, OR GENERAL VARIABLE
    sql.query('Insert into Log_Riegos (apertura,fecha,electrovalvulaId) values (?,?,?)', [req.body.apertura, req.body.fecha, req.body.electrovalvulaId], function(err, result, fields) {
        if (err) {
            console.error(err);
            res.send("Error while adding a new log for valve:" + req.body.electrovalvulaId ).status(400);
            return;
        }
        res.send(result);
    });
});

// Module Export for user on Main module
module.exports = routerLogs;
