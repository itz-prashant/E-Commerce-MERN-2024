const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({ 
    cloud_name: '', // use your cloud name 
    api_key: '', // use your cloud api key
    api_secret: '' // use your cloud api secret key
});

const storage = new multer.memoryStorage()

async function imageUploadUtils(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    })
    return result
}

const upload = multer({storage})

module.exports = {upload, imageUploadUtils}