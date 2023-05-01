const express = require('express');
var routeDevice = express.Router();
var sql = require('../mysql');

//API Moudel to get and list devices form DB DAM
// Basic functions for DB Data retrival 
// -- GET Device List: List all object inside "Dispositivo" Table
//    Responds 200 if all OK, 400 if error while fetching data from DB
routeDevice.get('/', function (req, res) {
    try {
        let query = 'SELECT * FROM Dispositivos';
        console.log("DEBUG: Accessed API DeviceGet with query: " + query);
        sql.query(query, (err, data) => {
            if (err) {
                console.error(err);
                res.send(("Error listing devices ").status(400))
                return;
            }
            // rows fetch
            console.log(data);
            res.send(JSON.stringify(data)).status(200);
        });
    } catch (error) {
        console.log(error);
    }
});

// -- Get Device ID: List specific Device with param set as "ID"
//    Input parameter: DeviceID
//    Responds 200 if all OK, 400 if error while fetching data from DB
routeDevice.get('/:id', function (req, res) {
    let deviceID = req.params.id;
    let query = 'SELECT * FROM Dispositivos WHERE dispositivoId =?';
    sql.query(query, [deviceID], (err, data) => {
        if (err) {
            console.error(err);
            res.send(("Error: Device not found").status(400))
            return;
        }
        // rows fetch
        console.log(data[0]);
        res.send(JSON.stringify(data[0])).status(200);
    });
    //res.send("dispositivo with id " + req.params.id);
});

// -- DELETE Device ID: delete specific Device with param set as "ID"
//    Input parameter: DeviceID
//    Responds 200 if all OK, 400 if error while fetching data from DB
routeDevice.delete('/:id', function (req, res) {
    let query = 'DELETE from Dispositivos WHERE dispositivoId  = ' + req.params.id;
    console.log(query);
    sql.query(query, (err, response) => {
        if (err) {
            console.error(err);
            res.send(("Error while removing device with id " + deviceID).status(400))
            return;
        }
        res.send(("Removed device with id " + deviceID).status(200));
    });
});

// Module Export for user on Main module
module.exports = routeDevice;
