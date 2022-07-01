const express = require('express');
var router = express.Router();
const TwittData = require('../models/twittdata.model')

router.get("/getAll", async (req, res) => {
    let limit = req.body.limit | 300
    const twittdata = await TwittData.find().limit(limit);
    console.log("request twittdata")
    res.json(twittdata)
    
})

router.post("/postOne", async (req, res) => {
    const twittdata = await TwittData.findOne()
    console.log("Post request")
    res.json(twittdata)
    
})
module.exports = router