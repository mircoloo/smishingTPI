const express = require('express');
var router = express.Router();
const TwittData = require('../models/twittdata.model')
var bodyParser = require('body-parser')


router.use(bodyParser.urlencoded({ extended: false }))
router.use(express.json())

router.post("/getAll", async (req, res) => {
    console.log("body", req.body)
    let limit = req.body.limit ? parseInt(req.body.limit): 3
    let skip = parseInt(req.body.skip) 
    const twittdata = await TwittData.find().skip(skip).limit(limit);
    console.log("request twittdata")
    console.log(req.body)
    res.json(twittdata)
    
})

router.get("/getOne", async (req, res) => {
    const twittdata = await TwittData.findOne({})
    console.log("Get request")
    res.json(twittdata) 
    
})



router.get("/getLinks", async (req, res) => {
    const links = await TwittData.find({}, {Link:1, _id:0})
    links.filter((link) => {
        link != ''
    }) 
    res.json(links) 
    
})


module.exports = router