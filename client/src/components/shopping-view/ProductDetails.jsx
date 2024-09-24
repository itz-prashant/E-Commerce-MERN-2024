import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
import { setProductDetails } from '@/store/shop/product-slice'
import { Label } from '../ui/label'
import StarRating from '../common/StarRating'
import { addReview, getReview } from '@/store/shop/review-slice'

const ProductDetails = ({open, setOpen, productDetails}) => {
    const [reviewMsg, setReviewMsg] = useState([])
    const [rating, setRating] = useState(0)
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {cartItems} = useSelector(state => state.shopCart)
    const {reviews} = useSelector(state => state.review)
    const {toast} = useToast() 

    function handleRatingChange(getRating){
        setRating(getRating)
    }

    useEffect(()=>{
        if(productDetails !== null){
            dispatch(getReview(productDetails?._id))
        }
    },[productDetails])
    

    function handleAddToCart(getCurrentProductId, getTotalStock){
        let getCartItems = cartItems.items || []
    if(getCartItems.length){
      const indexOfCurrentitems = getCartItems.findIndex(item=> item?.productId === getCurrentProductId)

      if(indexOfCurrentitems > -1){
        const quantity = getCartItems[indexOfCurrentitems].quantity
        if(quantity +1 > getTotalStock){
          toast({
            title: `Only ${quantity} quantity can be added for this item`,
            variant: 'destructive'
          })
          return
        }
      }
    }
        dispatch(addToCart({userId : user?.id, productId: getCurrentProductId, quantity: 1})).then(data =>{
          if(data?.payload?.success){
            dispatch(fetchCartItems(user?.id))
            toast({
              title: "Product is added to cart"
            })
          }
        })    
      }

      function handleDialogClose(){
        setOpen(false)
        setRating(0)
        setReviewMsg('')
        dispatch(setProductDetails())
      }

    function handleAddReview(){
        dispatch(addReview({
            productId: productDetails?._id,
            userId: user?.id,
            userName: user?.userName,
            reviewMessage: reviewMsg,
            reviewValue: rating
        })).then(data=>{
            if(data?.payload?.success){
                setRating(0)
                setReviewMsg('')
                dispatch(getReview( productDetails?._id))
            }
            toast({
                title: 'Review added successfully'
            })            
        })
    }  

    const averageReview = reviews && reviews.length > 0 ? 
        review.reduce((sum, reviewItem)=>{
        sum + reviewItem.reviewValue, 0}) / reviews.length : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
            <div className="relative overflow-hidden rounded-lg">
                <img src={productDetails?.image} alt={productDetails?.title} width={600} height={500}
                className='aspect-square w-full object-cover'/>
            </div>
            <div className=" gap-6 ">
                <div>
                    <h1 className='text-3xl font-semibold'>{productDetails?.title}</h1>
                    <p className='text-muted-foreground text-2xl mb-5 mt-4'>{productDetails?.description}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className={`${productDetails?.salePrice>0 ? 'line-through': ''} text-3xl font-bold text-primary`}>₹{productDetails?.price}</p>
                    {
                        productDetails?.salePrice>0 ? <p className='text-3xl font-bold text-muted-foreground'>{productDetails?.salePrice}</p>: null
                    }
                </div>
                <div className='flex items-center gap-2 mt-2'>
                <div className='flex items-center gap-0.5'>
                    <StarRating rating={averageReview}/>
                    <p className='text-muted-foreground'>{averageReview.toFixed(2)}</p>
                </div>
                </div>
                <div className='mt-5 mb-5'>
                    {
                        productDetails?.totalStock === 0 ? <Button className='w-full opacity-60 cursor-not-allowed'>Out of stock</Button> : <Button onClick={()=> handleAddToCart(productDetails?._id, productDetails?.totalStock)} className='w-full'>Add to cart</Button>
                    }
                </div>
                <Separator />
                <div className='max-h-[300px] overflow-auto'>
                    <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                    <div className='grid gap-6'>
                        {
                            reviews && reviews.length > 0 ?
                            reviews.map(reviewItem => <div className='flex gap-4'>
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1 ">
                                    <div className="flex items-center gap-2">
                                        <h3 className='font-bold'>{reviewItem.userName}</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarRating rating={reviewItem.reviewValue}/>
                                    </div>
                                    <p className='text-muted-foreground'>{reviewItem.reviewMessage}</p>
                                </div>
                            </div>) : <h1>No Reviews</h1>
                        }
                    </div>
                    <div className="mt-5 flex-col flex gap-2">
                        <Label>Write a review</Label>
                        <div className='flex gap-2'>
                            <StarRating rating={rating} handleRatingChange={handleRatingChange}/>
                        </div>
                        <Input name="reviewMsg" value={reviewMsg} onChange={(e)=> setReviewMsg(e.target.value)} placeholder="Write a review...."/>
                        <Button onClick={handleAddReview}
                        disabled={reviewMsg.length === 0}>Submit</Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ProductDetails