import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { deleteCartItem, updateCart } from '@/store/shop/cart-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@/hooks/use-toast'

const CartItemsContent = ({cartItem}) => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {toast} = useToast()

    function handleCartItemDelete(getCartItem){
        dispatch(deleteCartItem({userId: user?.id, productId: getCartItem.productId})).then((data)=>{
            if(data?.payload?.succes){
                toast({
                    title: "Cart item is deleted"
                })
            }
        })
    }

    function handleUpdateQuantity(getCartItem, typeOfAction){
        dispatch(updateCart({userId: user?.id, productId: getCartItem?.productId, quantity: typeOfAction ==="plus" ? getCartItem?.quantity+1 : getCartItem?.quantity - 1})).then((data)=>{
            if(data?.payload?.succes){
                toast({
                    title: "Cart item is updated"
                })
            }
        })
    }

  return (
    <div className='flex items-center space-x-4'>
        <img src={cartItem.image} alt={cartItem.title} className='w-20 h-20 rounded object-cover'/>
        <div className="flex-1">
            <h3 className='font-extrabold'>{cartItem.title}</h3>
            <div className='flex items-center mt-1 gap-2'>
                <Button onClick={()=> handleUpdateQuantity(cartItem, 'minus')} disabled={cartItem?.quantity ===1}
                 variant="outline" size="icon" className='h-8 w-8 rounded'>
                    <Minus className='w-4 h-4'/>
                    <span className='sr-only'>Decrease</span>
                </Button>
                <span>{cartItem?.quantity}</span>
                <Button onClick={()=> handleUpdateQuantity(cartItem, 'plus')} variant="outline" size="icon" className='h-8 w-8 rounded'>
                    <Plus className='w-4 h-4'/>
                    <span className='sr-only'>Increase</span>
                </Button>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <p className="font-semibold">
                ₹{((cartItem?.salePrice>0 ? cartItem?.salePrice : cartItem?.price ) * cartItem?.quantity).toFixed(2)}
            </p>
            <Trash onClick={()=> handleCartItemDelete(cartItem)} className='cursor-pointer mt-1' size={20}/>
        </div>
    </div>
  )
}

export default CartItemsContent