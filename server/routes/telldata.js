const express = require('express');
var router = express.Router();
const TellData = require('../models/telldata.model')
const db = require('../scripts/db')

router.get("/getAll/:limit",  async (req, res) => {
    //let sql = "SELECT link, COUNT(*) AS n FROM twittdata GROUP BY link HAVING CHAR_LENGTH(link)>0;"
    let limit = req.body.limit ? parseInt(req.body.limit): 5
    const sql = "SELECT * FROM telldata LIMIT " + limit
    await db.query(sql, (err, result) => {
    res.json(result)
})
    
})

router.get("/getOne", async (req, res) => {
    const telldata = await TellData.findOne({Number: req.query.number})
    res.json(telldata) 
    
})
module.exports = router