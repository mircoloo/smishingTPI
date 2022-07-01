const mongoose = require('mongoose')

const TellData = new mongoose.Schema({
    number: {type: String, required: true},
    comment: {type: String},
    type: {type: String}
},
{ collection: 'tell-data'}
)

const model = mongoose.model('TellData', TellData)

module.exports = model