const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const authRouter = require('./routes/auth/auth-routes')
const adminProductrouter = require('./routes/admin/products-routs')

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

app.listen(PORT, ()=>{
    console.log('Server is now running');
})
