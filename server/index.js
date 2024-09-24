const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const authRouter = require('./routes/auth/auth-routes')
const adminProductrouter = require('./routes/admin/products-routs')
const shopProductRouter = require('./routes/shop-view/products-routes')
const shopCartRouter = require('./routes/shop-view/cart-routes')
const shopAddressRouter = require('./routes/shop-view/address-routes')
const shopOrderRouter = require('./routes/shop-view/order-routes')
const adminOrderRouter = require('./routes/admin/order-routes')
const searchRouter = require('./routes/shop-view/search-routes')
const reviewRouter = require('./routes/shop-view/review-routes')
const commonfeatureRouter = require('./routes/common/feature-routes')

const app = express()
dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI).then(()=>{
    console.log('MongoDB Connected');
}).catch(error=>{console.log(error);
})

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT' ],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials: true
}))


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', authRouter)
app.use('/api/admin/product', adminProductrouter)
app.use('/api/admin/order', adminOrderRouter)
app.use('/api/shop/product', shopProductRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/order', shopOrderRouter)
app.use('/api/shop/search', searchRouter)
app.use('/api/shop/review', reviewRouter)
app.use('/api/common/feature', commonfeatureRouter)

app.listen(PORT, ()=>{
    console.log('Server is now running');
})
