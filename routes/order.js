const express = require('express')
const router = express.Router()
const { createOrderOfCustomer, getAllOrder, getAllOrderOfCustomer, getOrderByID, updateOrder, deleteOrder } = require('../controllers/order')

router.post('/customers/:customerId/orders', createOrderOfCustomer)
router.get('/orders', getAllOrder)
router.get('/customers/:customerId/orders', getAllOrderOfCustomer)
router.get('/orders/:id', getOrderByID)
router.put('/orders/:id', updateOrder)
router.delete('/orders/:id', deleteOrder)

module.exports = router