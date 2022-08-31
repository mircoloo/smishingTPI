const express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
const db = require('../scripts/db')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(express.json())

router.get("/",  async (req, res) => {
    //let sql = "SELECT link, COUNT(*) AS n FROM twittdata GROUP BY link HAVING CHAR_LENGTH(link)>0;"
    let limit = parseInt(req.query.limit) || 3
    const sql = "SELECT * FROM Twittdata ORDER BY creation DESC LIMIT " + limit
    await db.query(sql, (err, result) => {
    if(err) throw(err)
    res.json(result)
    })
})




router.get("/getLinks", async (req, res) => {
    let sql = "SELECT link, COUNT(*) AS n FROM Twittdata GROUP BY link HAVING CHAR_LENGTH(link)>0 ORDER BY COUNT(*) DESC;"
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        res.json(result)
    })
})

router.post("/getOrganization", async (req, res) => {
    const { keyWords } = req.body 
    const sql = `SELECT * FROM Twittdata WHERE organization LIKE '%${keyWords}%';`
    await db.query(sql, (err, result) => {
    res.json(result)  
    })
})

router.post("/getKeyWords", async (req, res) => {
    const { keyWords } = req.body 
    const sql = `SELECT * FROM Twittdata WHERE comment LIKE '%${keyWords}%';`
    await db.query(sql, (err, result) => {
    res.json(result)  
    })
})

router.get('/typeOfOrganizations', async (req, res) => {
    let sql = "SELECT COUNT(*) as count, organization as label FROM twittdata WHERE organization != '' GROUP BY organization;" 
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        res.json(result)
    })
})

router.post('/organization/tweets/addTweet', async (req, res) => {
    console.log(req.body)
    const { org_id, twittdata_id } = req.body
    let sql = `INSERT INTO org_twittdatas (org_id, twittdata_id) VALUES (${org_id}, ${twittdata_id})`;
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        res.json(result)
    })
    
})

router.get('/organization/tweets/', async (req, res) => {
    let sql = `SELECT * FROM org_twittdatas`;
    console.log(req.query)
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        res.json(result)
    })
})

module.exports = router