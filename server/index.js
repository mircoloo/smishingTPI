const express = require('express')
const app = express()
const cors = require('cors')
require('./scripts/dbConn')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')

const PORT = 4000

const twittRoute = require('./routes/twittdata')
const tellRoute = require('./routes/telldata')
const userRoute = require('./routes/users')
//MIDDELWARES
app.use(cors())
app.use(express.json())

//ROUTES
app.use('/api/twittdata', twittRoute)
app.use('/api/telldata', tellRoute)
app.use('/api/users', userRoute)
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())


app.use('/', (req,res) => res.send("<h1>Server up, but routes are not identified</h1>"))
/*
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
 app.listen(PORT, () =>{
    console.log("Server started on port " + PORT)
 })