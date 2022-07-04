const mongoose = require('mongoose')

const TellData = new mongoose.Schema({
    Number: {type: String, required: true},
    Comment: {type: String},
    Type: {type: String}
},
{ collection: 'tell-data'}
)

const model = mongoose.model('TellData', TellData)

module.exports = model