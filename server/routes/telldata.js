const express = require('express');
var router = express.Router();
const db = require('../scripts/db')

router.post("/getAll",  async (req, res) => {
    //let sql = "SELECT link, COUNT(*) AS n FROM twittdata GROUP BY link HAVING CHAR_LENGTH(link)>0;"
    let limit = req.body.limit ? parseInt(req.body.limit): 5
    const sql = "SELECT * FROM Telldata ORDER BY id DESC LIMIT " + limit
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
    let sql = "SELECT  C.id, C.telldata_id, C.comment, C.nickname, C.likes, C.dislikes, C.creationDate, C.parentId FROM Comments as C, Telldata as T WHERE C.telldata_id = T.id AND T.number = " + number;
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        res.json(result)
    })
})

router.post('/comments', async (req, res) => {
    let { telldata_id, nickname, comment} = req.body;
    if (!telldata_id || !nickname || !comment){res.json("Missing informations")}else{
        let sql = `INSERT INTO Comments (telldata_id, nickname, comment) VALUES (${telldata_id}, '${nickname}', '${comment}')`;
        await db.query(sql, (err, result) => {
            if(err) throw(err)
            res.json({inserted: true})
        })
    }
    
})

module.exports = router