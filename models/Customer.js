const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    country: { type: String, default: '' },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
})

const Customer = mongoose.model('Customer', CustomerSchema)

module.exports = Customer