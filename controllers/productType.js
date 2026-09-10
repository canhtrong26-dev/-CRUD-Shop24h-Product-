const ProductType = require('../models/ProductType')

const createProductType = async(req, res) => {
    try {
        const productType = new ProductType(req.body)
        await productType.save()
        res.status(201).json(productType)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllProductType = async(req, res) => {
    try {
        const productTypes = await ProductType.find()
        res.status(200).json(productTypes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductTypeByID = async(req, res) => {
    try {
        const productType = await ProductType.findById(req.params.id)
        if (!productType) {
            return res.status(404).json({ message: 'Không tìm thấy ProductType' })
        }
        res.status(200).json(productType)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProductType = async(req, res) => {
    try {
        const productType = await ProductType.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!productType) {
            return res.status(404).json({ message: 'Không tìm thấy ProductType' })
        }
        res.status(200).json(productType)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteProductType = async(req, res) => {
    try {
        const productType = await ProductType.findByIdAndDelete(req.params.id)
        if (!productType) {
            return res.status(404).json({ message: 'Không tìm thấy ProductType' })
        }
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createProductType, getAllProductType, getProductTypeByID, updateProductType, deleteProductType }