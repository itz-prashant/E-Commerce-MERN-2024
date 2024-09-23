import ProductDetails from '@/components/shopping-view/ProductDetails'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchProductdetail } from '@/store/shop/product-slice'
import { getSearchResult, resetSearchResult } from '@/store/shop/search-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
    const [keyword, setKeyword] = useState('')
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    const {searcResult} = useSelector(state=> state.shopSearch)
    const {cartItems} = useSelector(state => state.shopCart)
    const {user} = useSelector(state => state.auth)
    const { productDetails} = useSelector(state => state.shopProduct)
    const {toast} = useToast()


    useEffect(()=>{
        if(keyword && keyword.trim() !== '' && keyword.trim().length > 3 ){
            setTimeout(()=>{
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResult(keyword))
            },1000)
        }else{
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetSearchResult())
        }
    },[keyword])

    function handleAddToCart(getCurrentProductId, getTotalStock){
        let getCartItems = cartItems.items || []
        if(getCartItems.length){
          const indexOfCurrentitems = getCartItems.findIndex(item=> item.productId === getCurrentProductId)
    
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

      function handleGetProductDetails(getCurrentProductId){
        dispatch(fetchProductdetail(getCurrentProductId))
      }

      useEffect(()=>{
        if(productDetails !== null) setOpenDetailsDialog(true)
      },[productDetails])
    

  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
        <div className="flex justify-center mb-7">
            <div className="w-full felx items-center">
                <Input onChange={(e)=> setKeyword(e.target.value)} 
                value={keyword} name="keyword"  
                className="py-7" 
                placeholder="Serach Products"/>
            </div>
        </div>
        {
            !searcResult.length ? <h1 className='text-5xl font-extrabold'>No result found!</h1> : null
        }
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {
                searcResult.map(item=> <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} product={item}/>) 
            }
        </div>
        <ProductDetails open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>

    </div>
  )
}

export default Search