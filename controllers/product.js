const Product = require('../models/Product')

const createProduct = async(req, res) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllProduct = async(req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductByID = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy Product' })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy Product' })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteProduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy Product' })
        }
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createProduct, getAllProduct, getProductByID, updateProduct, deleteProduct }