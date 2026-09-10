const mongoose = require('mongoose')

const ProductTypeSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String }
})

const ProductType = mongoose.model('ProductType', ProductTypeSchema)

module.exports = ProductType