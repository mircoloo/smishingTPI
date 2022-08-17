const mysql = require('mysql');
//var settings = require('./settings.json');
const { spawn } = require('child_process');
var db;

const settings = {
    host: "localhost",  
    user: "root",
    password: "",
    database: "smishingDb"
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

const updateDatabase = async () => {
    console.log("Updating database...")
    const python = spawn('python3', ['../pyscripts/sql_updater.py']);
  
    python.stdout.on('data', (data) => {
      console.log("stdout:" + data)
    })
  }
//
updateDatabase()

module.exports = connectDatabase()