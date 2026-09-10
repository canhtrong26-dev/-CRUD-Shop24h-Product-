const Customer = require('../models/Customer')

const createCustomer = async(req, res) => {
    try {
        const customer = new Customer(req.body)
        await customer.save()
        res.status(201).json(customer)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllCustomer = async(req, res) => {
    try {
        const customers = await Customer.find()
        res.status(200).json(customers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getCustomerByID = async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        if (!customer) {
            return res.status(404).json({ message: 'Không tìm thấy Customer' })
        }
        res.status(200).json(customer)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateCustomer = async(req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!customer) {
            return res.status(404).json({ message: 'Không tìm thấy Customer' })
        }
        res.status(200).json(customer)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteCustomer = async(req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id)
        if (!customer) {
            return res.status(404).json({ message: 'Không tìm thấy Customer' })
        }
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createCustomer, getAllCustomer, getCustomerByID, updateCustomer, deleteCustomer }