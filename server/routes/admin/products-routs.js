const express = require('express')
const { upload } = require('../../helpers.js/cloudinary')
const handleImageUpload = require('../../controllers/admin/product-controller')
const router = express()

router.post('/upload-image', upload.single('my_file'), handleImageUpload)

module.exports = router