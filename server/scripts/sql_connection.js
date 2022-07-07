const { query } = require('express');
const express = require('express')
const mysql = require('mysql')

const DATABASE = {
    host: "localhost",
    user: "root",
    password: "",
    database: "smishingDB"
}

const db = mysql.createConnection(DATABASE);

db.connect((err) =>  {
    if(err){
        throw(err)
    }else{
        console.log("MySql Connected")
    }
})


sql = "SELECT link, COUNT(*) AS n FROM twittdata GROUP BY link HAVING CHAR_LENGTH(link)>0;"
sql = "SELECT nickname FROM twittdata;"
db.query(sql, (err, result) => {
    if(err) throw(err)
    /* console.log(result.json()) */
    result.map((data) => {
        console.log(data)
    }) 
})
