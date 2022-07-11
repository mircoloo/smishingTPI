const mysql = require('mysql');
//var settings = require('./settings.json');
var db;

const settings = {
    host: "localhost",  
    user: "root",
    password: "",
    database: "smishingDB"
}

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings);

        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!', err);
            }
        });
    }
    return db;
}

module.exports = connectDatabase();