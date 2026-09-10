const OrderDetail = require('../models/OrderDetail')
const Order = require('../models/Order')

const createOrderDetailOfOrder = async(req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy Order' })
        }
        const orderDetail = new OrderDetail(req.body)
        await orderDetail.save()
        order.orderDetails.push(orderDetail._id)
        await order.save()
        res.status(201).json(orderDetail)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllOrderDetailOfOrder = async(req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('orderDetails')
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy Order' })
        }
        res.status(200).json(order.orderDetails)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOrderDetailByID = async(req, res) => {
    try {
        const orderDetail = await OrderDetail.findById(req.params.id)
        if (!orderDetail) {
            return res.status(404).json({ message: 'Không tìm thấy OrderDetail' })
        }
        res.status(200).json(orderDetail)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateOrderDetail = async(req, res) => {
    try {
        const orderDetail = await OrderDetail.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!orderDetail) {
            return res.status(404).json({ message: 'Không tìm thấy OrderDetail' })
        }
        res.status(200).json(orderDetail)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteOrderDetail = async(req, res) => {
    try {
        const orderDetail = await OrderDetail.findByIdAndDelete(req.params.id)
        if (!orderDetail) {
            return res.status(404).json({ message: 'Không tìm thấy OrderDetail' })
        }
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createOrderDetailOfOrder, getAllOrderDetailOfOrder, getOrderDetailByID, updateOrderDetail, deleteOrderDetail }