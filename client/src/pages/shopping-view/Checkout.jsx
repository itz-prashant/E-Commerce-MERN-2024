import React, { useState } from 'react'
import accImg from '../../assets/account.avif'
import Address from '@/components/shopping-view/Address'
import { useDispatch, useSelector } from 'react-redux'
import CartItemsContent from '@/components/shopping-view/CartItemsContent'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/shop/order-slice'


const Checkout = () => {

  const {cartItems} = useSelector(state=> state.shopCart)
  const {user} = useSelector(state=> state.auth)
  const {approvalURL} = useSelector(state=> state.shopOrder)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [isPaymentStart, setIsPaymentStart] = useState(false)
  const dispatch = useDispatch()

  const totalCartAmount = cartItems && cartItems?.items?.length > 0 ? cartItems?.items.reduce((sum, currentItem)=> sum + (
    currentItem?.salePrice > 0 ? currentItem?.salePrice: currentItem?.price
    )* currentItem?.quantity, 0) : 0


  function handleInitiatePaypalPayment(){
    const orderData ={
      userId: user?.id, 
      cartId: cartItems?._id,
      cartItems: cartItems.items.map(singleCartItem=> ({
            productId: singleCartItem?.productId,
            title: singleCartItem?.title,
            image: singleCartItem?.image,
            price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
            quantity: singleCartItem?.quantity
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: ''
    }
    dispatch(createNewOrder(orderData)).then((data)=>{
      if(data?.payload?.success){
        setIsPaymentStart(true)
      }else{
        setIsPaymentStart(false)
      }
    })
  }

  if(approvalURL){
    window.location.href = approvalURL
  }

  return (
    <div className='flex flex-col'>
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={accImg} alt="" className='h-full w-full object-cover object-center'/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress}/>
        <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems?.items && cartItems?.items?.length > 0 ?
            cartItems.items.map(item => <CartItemsContent cartItem={item}/>) : null
          }
          <div className="mt-6 space-y-4">
            <div className='flex justify-between'>
                <div className="font-bold">Total</div>
                <div className="font-bold">₹{totalCartAmount}</div>
            </div>
        </div>
        <div className='mt-4 w-full'>
          <Button onClick={handleInitiatePaypalPayment} className='w-full'>Checkout With Paypal</Button>
        </div>
        </div>   
      </div>
    </div>
  )
}

export default Checkout