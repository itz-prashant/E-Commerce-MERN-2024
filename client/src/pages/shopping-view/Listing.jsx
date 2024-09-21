import ProductDetails from '@/components/shopping-view/ProductDetails'
import ProductFilter from '@/components/shopping-view/ProductFilter'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOption } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { fertchAllFilterProduct, fetchProductdetail } from '@/store/shop/product-slice'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useSearchParams } from 'react-router-dom'


function createSearchParamHelper(filterParams){
  const queryParams = []
  
  for(const [key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length > 0){
      const paramValue = value.join(",")
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  return queryParams.join('&')
}

const Listing = () => {

  const dispatch = useDispatch()
  const {productList, productDetails} = useSelector(state => state.shopProduct)
  const {user} = useSelector(state => state.auth)
  const [filter, setFilter] = useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const {toast} = useToast()

  const categorySearchParams= searchParams.get('category')
  
  function handleSort(value){
    setSort(value)
  }

  function handleFilter(getSectionId, getCurrentOption){

    let copyFilter = {...filter};
    const indexOfCurrentSection = Object.keys(copyFilter).indexOf(getSectionId)
    if(indexOfCurrentSection === -1){
      copyFilter ={
        ...copyFilter,
        [getSectionId]: [getCurrentOption]
      }
    }else{
      const indexOfCurrentOption = copyFilter[getSectionId].indexOf(getCurrentOption)

      if(indexOfCurrentOption === -1) copyFilter[getSectionId].push(getCurrentOption) 
        else{
          copyFilter[getSectionId].splice(indexOfCurrentOption, 1)
      }
    }
    setFilter(copyFilter)
    sessionStorage.setItem('filters', JSON.stringify(copyFilter))
  }
  
  useEffect(()=>{
    setSort("price-lowtohigh")
    setFilter(JSON.parse(sessionStorage.getItem('filters')) || {})
  },[categorySearchParams])

  useEffect(()=>{
    if(filter !==null && sort !==null)
    dispatch(fertchAllFilterProduct({filterParams: filter, sortParams: sort}))
  },[dispatch,sort,filter])

  useEffect(()=>{
    if(filter & Object.keys(filter).length > 0 ){
      const createQuearyString = createSearchParamHelper(filter)
      setSearchParams(new URLSearchParams(createQuearyString))
    }
  },[filter])

  function handleGetProductDetails(getCurrentProductId){
    dispatch(fetchProductdetail(getCurrentProductId))
  }
  
  useEffect(()=>{
    if(productDetails !== null) setOpenDetailsDialog(true)
  },[productDetails])

  function handleAddToCart(getCurrentProductId){
    dispatch(addToCart({userId : user?.id, productId: getCurrentProductId, quantity: 1})).then(data =>{
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
        toast({
          title: "Product is added to cart"
        })
      }
    })    
  }

  console.log(productList);
  

  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5 p-4 md:p-6'>
      <ProductFilter filter={filter} handlefilter={handleFilter} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className='text-lg font-extrabold'>All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList.length} Products</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowUpDown className='h-4 w-4'/>
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOption.map(sortItem => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>)
                  }
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2'>
                  {
                    productList && productList.length > 0 ?
                    productList.map(productItem=> <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} 
                    product={productItem} handleAddToCart={handleAddToCart}/>) : null
                  }
        </div>
      </div>
      <ProductDetails open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
    </div>
  )
}

export default Listing