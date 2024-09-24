const Feature = require('../../models/feature')

const addFeatureImage = async(req,res)=>{
    try {
        const {image} = req.body;
        const featureImages = new Feature({
            image
        }) 

        await featureImages.save()

        res.status(201).json({
            success: true,
            data: featureImages
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

const getFeatureImage = async(req,res)=>{
    try {
        const images = await Feature.find()

        res.status(200).json({
            success: true,
            data: images
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

module.exports = {
    addFeatureImage,
    getFeatureImage
}