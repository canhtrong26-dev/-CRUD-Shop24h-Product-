const express = require('express')
const router = express.Router()
const { createCustomer, getAllCustomer, getCustomerByID, updateCustomer, deleteCustomer } = require('../controllers/customer')

router.post('/', createCustomer)
router.get('/', getAllCustomer)
router.get('/:id', getCustomerByID)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)

module.exports = router