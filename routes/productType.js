const express = require('express')
const router = express.Router()
const { createProductType, getAllProductType, getProductTypeByID, updateProductType, deleteProductType } = require('../controllers/productType')

router.post('/', createProductType)
router.get('/', getAllProductType)
router.get('/:id', getProductTypeByID)
router.put('/:id', updateProductType)
router.delete('/:id', deleteProductType)

module.exports = router