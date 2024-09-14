const express = require('express')
const { getFilterProduct, getProductDetail } = require('../../controllers/shop/product-controller')

const router = express.Router()

router.get('/get', getFilterProduct)
router.get('/get/:id', getProductDetail)

module.exports = router