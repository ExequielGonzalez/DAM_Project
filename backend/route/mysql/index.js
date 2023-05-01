//=======[ Settings, Imports & Data ]==========================================

var mysql = require('mysql');

var confgSQL = {
    host     : 'mysql-server',
    port     : '3306',
    user     : 'root',
    password : 'userpass',
    database : 'DAM',
    connectionLimit:10
};


//var connection = mysql.createConnection();

//=======[ Main module code ]==================================================

//connection pool
// limit:
const poolConnections = mysql.createPool(confgSQL);

poolConnections.getConnection((error, connection) =>{
    if (error){
        switch (error.code) {
            case 'ER_ACCESS_DENIED_ERROR':
                console.log('User or password incorrect');
                break;
            case 'PROTOCOL_CONNECTION_LOST':
                console.log('DB Connection closed/lost');
                break;
            case 'ECONNREFUSED':
                console.log(error);
                console.log('DB Connection Refused');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.log('DB Connection exceeded');
                break;
            default:
                break;
        }
    }
    if (connection) {
        connection.release();
    }
    return;
});

module.exports = poolConnections;

//=======[ End of file ]=======================================================
