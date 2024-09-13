const Product = require('../../models/Product')

const getFilterProduct = async (req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            data: products
        })     
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error some occoured'
        })
    }
}

module.exports = {
    getFilterProduct
}