import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import CartItemsContent from './CartItemsContent'

const CartWrapper = ({cartItems}) => {
    const totalCartAmount = cartItems && cartItems.length > 0 ? cartItems.reduce((sum, currentItem)=> sum + (
        currentItem?.salePrice > 0 ? currentItem?.salePrice: currentItem?.price
    )* currentItem?.quantity, 0) :0
  return (
    <SheetContent className="sm:max-w-md">
        <SheetHeader>
            <SheetTitle>
                Your Cart
            </SheetTitle>
        </SheetHeader>
        <div className='mt-6 space-y-4'>
            {
                cartItems && cartItems.length > 0 ? 
                cartItems.map(item => <CartItemsContent cartItem={item} /> ) : null
            }
        </div>
        <div className="mt-6 space-y-4">
            <div className='flex justify-between'>
                <div className="font-bold">Total</div>
                <div className="font-bold">₹{totalCartAmount}</div>
            </div>
        </div>
        <Button className='w-full mt-6'>Checkout</Button>
    </SheetContent>
  )
}

export default CartWrapper