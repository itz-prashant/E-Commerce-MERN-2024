const express = require('express')
const { getAllOrdersOfAllUser, getAllOrdersDetailsForAdmin } = require('../../controllers/admin/order-controller')

const router = express.Router()

router.get('/get', getAllOrdersOfAllUser)
router.get('/details/:id', getAllOrdersDetailsForAdmin)

module.exports = router