const Order = require('../../models/order')
const Product = require('../../models/Product')
const ProductReview = require('../../models/review')

const addProductReview = async(req,res)=>{
    try {
        const {productId,userId,userName,reviewMessage,reviewValue} = req.body
        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: 'confirmed'
        })

        if(!order){
            return res.status(403).json({
                success: false,
                message: 'You need to purchase product to review it.'
            })
        }

        const checkExistingReview  = await ProductReview.findOne({productId, userId})

        if(checkExistingReview){
            return res.status(400).json({
                success: false,
                message: 'You already review this product'
            })
        }

        const newReview = new ProductReview({
            productId,userId,userName,reviewMessage,reviewValue
        })

        await newReview.save()

        const review = await ProductReview.find({productId})

        const totalReviewLength = review.length
        const averageReview = review.reduce((sum, reviewItem)=>{
            sum + reviewItem.reviewValue, 0}) / totalReviewLength

        await Product.findByIdAndUpdate(productId, {averageReview})    

        res.status(201).json({
            success: true,
            data: newReview
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

const getProductReview = async(req,res)=>{
    try {
        const {productId} = req.params
        const review = await ProductReview.find({productId})

        res.status(200).json({
            success: true,
            data: review
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

module.exports={
    addProductReview,
    getProductReview
}