const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    orderDate: { type: Date, default: Date.now },
    shippedDate: { type: Date },
    note: { type: String },
    orderDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderDetail' }],
    cost: { type: Number, default: 0 }
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order