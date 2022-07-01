const express = require('express');
var router = express.Router();
const User = require('../models/user.model')
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))


router.post("/register", async (req, res) => {
    console.log(req.body)
    try{
        const user = await User.create({
            name: req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        res.json({status: 'ok'})
    }catch(err){ 
        console.log(err)
        res.json({status: 'error', error: 'Duplicate email'})
    }
    
})
module.exports = router