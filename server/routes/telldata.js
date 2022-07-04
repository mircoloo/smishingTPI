const express = require('express');
var router = express.Router();
const TellData = require('../models/telldata.model')

router.post("/getAll", async (req, res) => {
    console.log("body", req.body)
    let limit = req.body.limit ? parseInt(req.body.limit): 5
    let skip = parseInt(req.body.skip) 
    const telldata = await TellData.find().skip(skip).limit(limit)
    console.log("request telldata")
    res.json(telldata)
    
})

router.get("/getOne", async (req, res) => {
    const telldata = await TellData.findOne({Number: req.query.number})
    res.json(telldata) 
    
})
module.exports = router