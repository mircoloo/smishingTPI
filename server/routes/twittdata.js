const express = require('express');
var router = express.Router();
const TwittData = require('../models/twittdata.model')

router.get("/getAll", async (req, res) => {
    const twittdata = await TwittData.find()
    console.log("request")
    res.json(twittdata)
    
})

router.post("/postOne", async (req, res) => {
    const twittdata = await TwittData.findOne()
    console.log("Post request")
    res.json(twittdata)
    
})
module.exports = router