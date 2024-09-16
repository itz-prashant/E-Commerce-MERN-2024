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
        const {userId} = req.params
        if(!userId){
            return res.status(400).json({
                succsess:false,
                mesage: 'User id required'
            })
        }
        const cart =await Cart.findOne({userID}).populate({
            path: 'item.productID',
            select: 'image title price salePrice'
        })
        if(!cart){
            return res.status(400).json({
                succsess:false,
                mesage: 'cart not found'
            })
        }
        const validItems = cart.items.filter(productItem=> productItem.productId)
        if(validItems.lengts < cart.items.length){
            cart.items = validItems
            await cart.save()
        }

        const populateCartItems = validItems.map(item => ({
            productId: item.productId._id,
            image : item.productId.image,
            title : item.productId.title,
            price : item.productId.price,
            salePrice : item.productId.salePrice,
            quantity : item.quantity,
        }))

        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })
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
        const {userId, productId, quantity} = req.body

        if(!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            })
        }
        const cart =await Cart.findOne({userId})
        if(!cart){
            return res.status(400).json({
                succsess:false,
                mesage: 'cart not found'
            })
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        if(findCurrentProductIndex === -1){
            return res.status(404).json({
                success: false,
                message: 'Cart item not present'
            })
        }
        cart.item[findCurrentProductIndex].quantity = quantity
        await cart.save()
        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice'
        })

        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image : item.image ? item.productId.image : null,
            title : item.title ?item.productId.title : 'Product not found',
            price : item.price ? item.productId.price : null,
            salePrice : item.salePrice ? item.productId.salePrice : null,
            quantity : item.quantity,
        }))
        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })
        
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