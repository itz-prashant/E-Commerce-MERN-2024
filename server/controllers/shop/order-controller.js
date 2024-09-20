const paypal  = require('../../helpers.js/paypal')
const Order = require('../../models/order')
const Cart = require('../../models/cart')

const createOrder=  async (req, res)=>{
    try {
        const {userId, cartItems,addressInfo,orderStatus,paymentMethod,paymentStatus,
            totalAmount,orderDate,orderUpdateDate,paymentId,payerId,cartId} = req.body
        
         const create_payment_json = {
            intent: 'sale',
            payer:{
                payment_method: 'paypal'
            },
            redirect_urls:{
                return_url: 'http://localhost:5173/shop/paypal-return',
                cancel_url: 'http://localhost:5173/shop/paypal-cancel'
            },
            transactions:[
                {
                    item_list:{
                        items: cartItems.map(item=> ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description: 'description'
                }
            ]
        }  

        paypal.payment.create(create_payment_json, async(error, paymentInfo)=>{
            if(error){
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Error while creating paypal payment'
                })
            }else{
                const newlyCreatedOrder = new Order({
                    userId, cartItems,addressInfo,orderStatus,paymentMethod,paymentStatus,
                    totalAmount,orderDate,orderUpdateDate,paymentId,payerId, cartId
                })
                await newlyCreatedOrder.save()
                const approvalURL = paymentInfo.links.find(link=> link.rel === 'approval_url').href

                res.status(200).json({
                    success:  true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id
                })
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}

const capturePayment=  async (req, res)=>{
    try {
        const {paymentId, payerId, orderId} = req.body
        let order = await Order.findById(orderId)

        if(!order){
            return res.status(404).json({
                success: false,
                message: 'Order can not be found'
            })
        }

        order.paymentStatus = 'paid'
        order.orderStatus = 'confirmed'
        order.paymentId = paymentId
        order.payerId = payerId

        const getCartId = order.cartId
        await Cart.findByIdAndUpdate(getCartId)

        await order.save()
        res.status(200).json({
            success: true,
            message: 'Order confirmed',
            data: order
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}


module.exports = {
    createOrder,
    capturePayment
}