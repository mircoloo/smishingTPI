const express = require('express')
const app = express()
const cors = require('cors')
require('./scripts/dbConn')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')


const twittRoute = require('./routes/twittdata')

//MIDDELWARES
app.use(cors())
app.use(express.json())

//ROUTES
app.use('/api/twittdata', twittRoute)








/*
app.post("/api/register", async (req, res) => {
    console.log(req.body)
    console.log(typeof(User))
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

app.post("/api/login", async (req, res) => {

        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })



        if(user){
            
            const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            }, 
            
            'secret123')

            res.json({status: 'ok', user: token})
        }else{
            res.json({status: 'error', user: false})
        }
    
})
*/
 app.listen(1337, () =>{
    console.log("Server started on port 1337")
 })