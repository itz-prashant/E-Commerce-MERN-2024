const express = require('express')
const { getAllOrdersOfAllUser, getAllOrdersDetailsForAdmin, updateOrderStatus } = require('../../controllers/admin/order-controller')

const router = express.Router()

router.get('/get', getAllOrdersOfAllUser)
router.get('/details/:id', getAllOrdersDetailsForAdmin)
router.put('/update/:id', updateOrderStatus)

module.exports = router