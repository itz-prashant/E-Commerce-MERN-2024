const cloudinary = require('cloudinary').v2
const multer = require('multer')
const dotenv = require('dotenv')

dotenv.config()

const CLOUD_NAME= process.env.CLOUD_NAME
const CLOUD_API_KEY=process.env.CLOUD_API_KEY
const CLOUD_API_SECRET=process.env.CLOUD_API_SECRET

cloudinary.config({ 
    cloud_name: CLOUD_NAME, // use your cloud name 
    api_key: CLOUD_API_KEY, // use your cloud api key
    api_secret: CLOUD_API_SECRET // use your cloud api secret key
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