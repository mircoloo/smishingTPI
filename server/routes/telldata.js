const express = require('express');
var router = express.Router();
const db = require('../scripts/db')

router.post("/getAll",  async (req, res) => {
    //let sql = "SELECT link, COUNT(*) AS n FROM twittdata GROUP BY link HAVING CHAR_LENGTH(link)>0;"
    let limit = req.body.limit ? parseInt(req.body.limit): 5
    const sql = "SELECT * FROM Telldata LIMIT " + limit
    await db.query(sql, (err, result) => {
    res.json(result)
})
    
})

router.get("/getOne", async (req, res) => {
    const sql = "SELECT * FROM Telldata WHERE Number =  " + req.query.number + " LIMIT 1"
    await db.query(sql, (err, result) => {
    res.json(result)  
    })
})

router.get('/comments/:number', async (req, res) => {
    
    let { number } = req.params;
    let sql = "SELECT  C.id, C.comment, C.nickname FROM Comments as C, Telldata as T WHERE C.telldata_id = T.id AND T.number = " + number;
    console.log("richiesta")
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        console.log(result)
        res.json(result)
})
})

module.exports = router