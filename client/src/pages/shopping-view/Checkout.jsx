import React from 'react'
import accImg from '../../assets/account.avif'
import Address from '@/components/shopping-view/Address'
import { useSelector } from 'react-redux'
import CartItemsContent from '@/components/shopping-view/CartItemsContent'
import { Button } from '@/components/ui/button'


const Checkout = () => {

  const {cartItems} = useSelector(state=> state.shopCart)

  const totalCartAmount = cartItems && cartItems.items.length > 0 ? cartItems.items.reduce((sum, currentItem)=> sum + (
    currentItem?.salePrice > 0 ? currentItem?.salePrice: currentItem?.price
)* currentItem?.quantity, 0) :0

  return (
    <div className='flex flex-col'>
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={accImg} alt="" className='h-full w-full object-cover object-center'/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 p-5">
        <Address />
        <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ?
            cartItems.items.map(item => <CartItemsContent cartItem={item}/>) : null
          }
          <div className="mt-6 space-y-4">
            <div className='flex justify-between'>
                <div className="font-bold">Total</div>
                <div className="font-bold">₹{totalCartAmount}</div>
            </div>
        </div>
        <div className='mt-4 w-full'>
          <Button className='w-full'>Checkout With Paypal</Button>
        </div>
        </div>   
      </div>
    </div>
  )
}

export default Checkout