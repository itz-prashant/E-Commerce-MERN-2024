const Cart = require('../../models/cart')
const Product = require('../../models/Product')

const addToCart = async(req, res)=>{
    try {
        const {userId, productId, quantity} = req.body
        if(!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }

        const product = await Product.findById(productId)
        if(!product){
            return res.status(400).json({
                success: false,
                message: 'Product Not found'
            })
        }
        let cart = await Cart.findOne({userId})
        if(!cart){
            cart = new Cart({userId, items: []})
        }

        const findCurrentProductIndex = cart.items.findIndex(item=> item.productId.toString() === productId)

        if(findCurrentProductIndex === -1){
            cart.items.push({productId, quantity})
        }else{
            cart.items[findCurrentProductIndex].quantity += quantity
        }
        await cart.save()
        res.status(200).json({
            success: true,
            data: cart
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succsess:true,
            mesage: 'Error'
        })
    }
}

const fetchCartItem = async(req, res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succsess:true,
            mesage: 'Error'
        })
    }
}

const updateCartItemQuantity = async(req, res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succsess:true,
            mesage: 'Error'
        })
    }
}

const deleteCartItem = async(req, res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succsess:true,
            mesage: 'Error'
        })
    }
}

module.exports = {
    addToCart,
    fetchCartItem,
    updateCartItemQuantity,
    deleteCartItem
}