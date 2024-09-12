const { imageUploadUtils } = require("../../helpers.js/cloudinary");
const Product = require('../../models/Product')

const handleImageUpload = async (req,res)=>{
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtils(url)
        res.json({
            success: true,
            result: result
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Error occured'
        })
    }
}

// add new products 

const addProduct = async (req, res)=>{
    try {
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body
        const newCreatedProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        })
        await newCreatedProduct.save()
        res.status(200).json({
            success: true,
            data: newCreatedProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

// fetch new products

const fetchAllProduct = async (req, res)=>{
    try {
        const listOfProduct = await Product.find({})
        res.status(200).json({
            success: true,
            data: listOfProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

// edit a product

const editProduct = async (req, res)=>{
    try {
        const {id} = req.params;
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body
        const findProduct = await Product.findById(id)
        if(!findProduct) return res.status(404).json({
            success: false,
            message: "Product not found"
        })
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price || findProduct.price
        findProduct.salePrice = salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.image = image || findProduct.image

        await findProduct.save()
        res.status(200).json({
            success: true,
            data: findProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

// delete product

const deleteProduct = async (req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product) return res.status(404).json({
            success: false,
            message: "Product not found"
        })
        res.status(200).json({
            success: true,
            message: 'Product delete successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

module.exports = {
    handleImageUpload,
    addProduct,
    fetchAllProduct,
    editProduct,
    deleteProduct
}