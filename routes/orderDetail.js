const express = require('express')
const router = express.Router()
const { createOrderDetailOfOrder, getAllOrderDetailOfOrder, getOrderDetailByID, updateOrderDetail } = require('../controllers/orderDetail')

router.post('/orders/:orderId/order-details', createOrderDetailOfOrder)
router.get('/orders/:orderId/order-details', getAllOrderDetailOfOrder)
router.get('/order-details/:id', getOrderDetailByID)
router.put('/order-details/:id', updateOrderDetail)

module.exports = router