const express = require('express')
const { fetchAddress, editAddress, deleteAddress, addAddress } = require('../../controllers/shop/address-controller')


const router = express.Router()

router.post('/add', addAddress)
router.get('/get/:userId', fetchAddress)
router.put('/update/:userId/:addressId', editAddress)
router.delete('/delete/:userId/:addressId', deleteAddress)


module.exports = router