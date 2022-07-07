const mongoose = require('mongoose')

const dbURI = "mongodb+srv://mirco:mircomirco@smishingdb.sf0xe.mongodb.net/?retryWrites=true&w=majority"
try{
    mongoose.connect(dbURI)
    console.log('connected to db');
}catch(error){
    console.log(error)
}
