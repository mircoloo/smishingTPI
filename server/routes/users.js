const express = require('express');
const router = express.Router();
const db = require('../scripts/db')
const jwt = require('jsonwebtoken')


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

router.get('/getAll', async (req, res) => {
    
    let sql = "SELECT * FROM Users";
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        res.json(result)
})
})


router.get('/:id', async (req, res) => {
    
    let sql = "SELECT * FROM Users WHERE id = " + req.params.id;
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        res.json(result)
})
})

router.delete('/:id', verify, async (req, res) => {
    
    if(req.user.id == req.params.id){
        let sql = "DELETE FROM Users WHERE id = " + req.params.id;
        await db.query(sql, (err, result) => {
            if(err) throw(err)
            res.status(200).json("User has been deleted")
    })
    } else{
        res.status(403).json("You are not allowed to delete this user")
    }
    
})



module.exports = router