const {Schema, model} = require('mongoose')

const Cell = new Schema({
    title: {type: String, unique: true, required: true},
    desc: {type: String, required: true},
    specifications: {type: String},
    price: {type: Number, required: true},
    img: {type: String, required: true}
})

module.exports = model('Cell', Cell)