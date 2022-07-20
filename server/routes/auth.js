const express = require('express')
const router = express.Router()
const db = require('../scripts/db')
const jwt = require('jsonwebtoken')
require('dotenv').config();
//Middleware 

const verify = (req, res, next)  => {
    const authHeader = req.headers.authorization;
    if(authHeader){
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, process.env.SECRET_JWT_KEY, (err, user) => {
        if(err){
          return res.status(403).json("Token is not valid")
        }
        req.user = user;
        next();
      });
  
    }else{
      res.status(401).json("You are not authenticated")
    }
  }

router.get('/', async (req, res) => {
    const sql = "SELECT * FROM Users"
    await db.query(sql, (err, result) => {
    if(err) throw(err)
    res.status(200).json({data: result})
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
    if(err) { res.json({error: err})}
        //const token = jwt.sign({id, typeofuser}, process.env.SECRET_JWT_KEY, {expiresIn: 200})
        res.json({data: result, token: "tokentoken"})
    });
    
})

router.post('/login' ,async (req, res) => {
    //Retrieving user
    const { email, password } = req.body
    const sql = `SELECT * FROM Users WHERE email= "${email}" AND password = "${password}";`
    await db.query(sql, (err, result) => {
    if(err) { 
        res.json({error: err})
    }
    //Check id user exists
    if(result[0]){
        //Generate an access token
        let { id, typeofuser, email} = result[0];
        const token = jwt.sign({id, typeofuser}, process.env.SECRET_JWT_KEY, {expiresIn: 200})
        //console.log(jwt.decode(token))
        res.status(203).json({email, typeofuser, token})
    }else{
        res.status(400).json({error: "Wrong credentials"})
    }
        
    });
    
})


router.post('/logout', verify ,async (req, res) => {
    
    
})






module.exports = router