const express = require('express')
const app = express()
const cors = require('cors')
//require('./scripts/db')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')

const PORT = 4000

const twittRoute = require('./routes/twittdata')
const tellRoute = require('./routes/telldata')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
//MIDDELWARES 
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
//ROUTES
app.use('/api/twittdata', twittRoute)
app.use('/api/telldata', tellRoute)
app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)








app.use('/', (req,res) => res.send("<h1>Error page not found</h1>").status(404))







 app.listen(PORT, () =>{
    console.log("Server started on port " + PORT)
 })