const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType', required: true },
    imageUrl: { type: String, required: true },
    buyPrice: { type: Number, required: true },
    promotionPrice: { type: Number, required: true },
    amount: { type: Number, default: 0 }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product