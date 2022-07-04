const mongoose = require('mongoose')

const TwittData = new mongoose.Schema({
    ID: {type: String, required: true},
    Number: {type: String},
    Comment: {type: String},
    Password: {type: String}
},
{ collection: 'twitt-data'}
)

const model = mongoose.model('TwittData', TwittData)

module.exports = model