const Order = require('../models/Order')
const Customer = require('../models/Customer')

const createOrderOfCustomer = async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.customerId)
        if (!customer) {
            return res.status(404).json({ message: 'Không tìm thấy Customer' })
        }
        const order = new Order(req.body)
        await order.save()
        customer.orders.push(order._id)
        await customer.save()
        res.status(201).json(order)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllOrder = async(req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllOrderOfCustomer = async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.customerId).populate('orders')
        if (!customer) {
            return res.status(404).json({ message: 'Không tìm thấy Customer' })
        }
        res.status(200).json(customer.orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOrderByID = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy Order' })
        }
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateOrder = async(req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy Order' })
        }
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteOrder = async(req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy Order' })
        }
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createOrderOfCustomer, getAllOrder, getAllOrderOfCustomer, getOrderByID, updateOrder, deleteOrder }