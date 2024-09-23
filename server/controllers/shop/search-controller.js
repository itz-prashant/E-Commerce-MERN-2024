const Product = require('../../models/Product')

const searchProducts = async (req, res)=>{
    try {
        const {keyword} = req.params
        if(!keyword && typeOf(keyword) !== 'string'){
            return res.status(404).json({
                success: false,
                message: 'Keyword is required'
            })
        }

        const regEx = new RegExp(keyword, 'i')

        const createSearchQuery = {
            $or: [
                {title: regEx},
                {description: regEx},
                {category: regEx},
                {brand: regEx},
            ]
        }

        const searchResult = await Product.find(createSearchQuery)

        res.status(200).json({
            success: true,
            data: searchResult
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
    searchProducts
}