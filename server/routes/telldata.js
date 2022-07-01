const express = require('express');
var router = express.Router();
const TellData = require('../models/telldata.model')

router.get("/getAll", async (req, res) => {
    
    let limit = req.body.limit | 5
    const telldata = await TellData.find().limit(limit)
    console.log("request telldata")
    res.json(telldata)
    
})

router.post("/postOne", async (req, res) => {
    const telldata = await TellData.findOne()
    console.log("Post request telldata")
    res.json(telldata)
    
})
module.exports = router