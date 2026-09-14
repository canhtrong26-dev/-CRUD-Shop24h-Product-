const express = require('express')
const mongoose = require('mongoose')
const productTypeRouter = require('./routes/productType')
const productRouter = require('./routes/product')
const customerRouter = require('./routes/customer')
const orderRouter = require('./routes/order')

const app = express()

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/shop24h')
    .then(() => console.log('Kết nối MongoDB thành công'))
    .catch((error) => console.log('Kết nối MongoDB thất bại:', error))

app.use('/product-types', productTypeRouter)
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/', orderRouter)

app.get('/test/mongo-connection', (req, res) => {
    res.json({ message: "MongoDB connected successfully" });
});

app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000')
})

module.exports = app