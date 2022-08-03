const express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
const db = require('../scripts/db')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(express.json())

router.post("/getAll",  async (req, res) => {
    //let sql = "SELECT link, COUNT(*) AS n FROM twittdata GROUP BY link HAVING CHAR_LENGTH(link)>0;"
    let limit = req.body.limit ? parseInt(req.body.limit): 3
    const sql = "SELECT * FROM Twittdata ORDER BY creation DESC LIMIT " + limit
    await db.query(sql, (err, result) => {
    if(err) throw(err)
    res.json(result)
    })
})


router.get("/getLinks", async (req, res) => {
    let sql = "SELECT link, COUNT(*) AS n FROM Twittdata GROUP BY link HAVING CHAR_LENGTH(link)>0;"
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        res.json(result)
    })
})

module.exports = router