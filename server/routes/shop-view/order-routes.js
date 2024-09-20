const express = require('express')
const { createOrder, capturePayment, getAllOrdersByUser, getAllOrdersDetails } = require('../../controllers/shop/order-controller')

const router = express.Router()

router.post('/create', createOrder)
router.post('/capture', capturePayment)
router.get('/list/:userId', getAllOrdersByUser)
router.get('/details/:id', getAllOrdersDetails)

module.exports = router