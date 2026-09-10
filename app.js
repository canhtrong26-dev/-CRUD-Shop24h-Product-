const express = require('express')
const mongoose = require('mongoose')
const productTypeRouter = require('./routes/productType')

const app = express()

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/shop24h')
    .then(() => console.log('Kết nối MongoDB thành công'))
    .catch((error) => console.log('Kết nối MongoDB thất bại:', error))

app.use('/product-types', productTypeRouter)

app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000')
})