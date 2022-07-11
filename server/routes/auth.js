const express = require('express')
const router = express.Router()
const db = require('../scripts/db')
const jwt = require('jsonwebtoken')
//Middleware
const authorization = (req, res, next) => {
    const authorized = false
    if(authorized){
        next()
    }else{

        res.json({error: "anuthorized"})
    }
}

router.get('/', async (req, res) => {
    const sql = "SELECT * FROM Users"
    await db.query(sql, (err, result) => {
    if(err) throw(err)
    res.json({succes: true, data: result}).status(200)
    })
})


router.post('/register' ,async (req, res) => {
    const { email, password, typeofuser } = req.body
    const newUser = {
                        email,
                        password,
                        typeofuser
                    }

    const sql = `INSERT INTO Users (email, password, typeofuser) VALUES ("${email}", "${password}", "${typeofuser}");`
    await db.query(sql, (err, result) => {
    if(err) { res.json({succes: false, error: err})}
        res.json({success: true, data: result, token: "tokentoken"})
    });
    
})

router.post('/login' ,async (req, res) => {
    const { email, password } = req.body

    const sql = `SELECT * FROM Users WHERE email= "${email}" AND password = "${password}";`
    await db.query(sql, (err, result) => {
    if(err) { 
        res.json({succes: false, error: err})
    }
    if(result[0]){
        const token = jwt.sign({id: result[0].ID}, 'secretKey', {expiresIn:10})
        
        res.status(200).json({authenticated: true, data: result, token})
    }else{
        res.json({authenticated: false, error: "Wrong credentials"})
    }
        
    });
    
})







module.exports = router