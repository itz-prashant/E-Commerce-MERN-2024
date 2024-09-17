import React, { useEffect, useState } from 'react'
import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'
import { Button } from '@/components/ui/button'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, Cloud, ShirtIcon, Shovel, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fertchAllFilterProduct, fetchProductdetail } from '@/store/shop/product-slice'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
import ProductDetails from '@/components/shopping-view/ProductDetails'

const Home = () => {

  const [currentSlide, setCurrentslide] = useState(0)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const {productList, productDetails} = useSelector(state=> state.shopProduct)
  const slides = [banner1,banner2, banner3]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector(state => state.auth)
  const {toast} = useToast()

  const categoriesWithIcon = [
    {id:"men", label:'Men', icon: <ShirtIcon size={40}/>},
    {id:"women", label:'Women', icon: <Cloud size={40}/>},
    {id:"kids", label:'Kids', icon: <BabyIcon size={40}/>},
    {id:"accessories", label:'Accessories', icon: <WatchIcon size={40}/>},
    {id:"footwear", label:'Footwear', icon: <Shovel size={40}/>},
]

const brand =[
  {id:"nike", label:'Nike' , icon: <ShirtIcon size={40}/>},
  {id:"adidas", label:'Adidas' , icon: <ShirtIcon size={40}/>},
  {id:"puma", label:'Puma' , icon: <ShirtIcon size={40}/>},
  {id:"levi", label:"Levi's" , icon: <ShirtIcon size={40}/>},
  {id:"zara", label:'Zara' , icon: <ShirtIcon size={40}/>},
  {id:"h&m", label:'H&m' , icon: <ShirtIcon size={40}/>},
]

useEffect(()=>{
  if(productDetails !== null) setOpenDetailsDialog(true)
},[productDetails])

useEffect(()=>{
  const timer = setInterval(()=>{
    setCurrentslide(prevSlide=> (prevSlide +1 ) % slides.length)
  },4000)

  return ()=> clearInterval(timer)
},[])

useEffect(()=>{
   dispatch(fertchAllFilterProduct({filterParams: {}, sortParams: 'price-lowtohigh'})) 
},[])

function handleNavigateToListingPage(currentItem, section){
    sessionStorage.clear('filters')
    const currentfilter = {
      [section]: [currentItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentfilter))
    navigate(`/shop/listing`)
}

function handleGetProductDetails(getCurrentProductId){
  dispatch(fetchProductdetail(getCurrentProductId))
}

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

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="relative w-full h-[500px] overflow-hidden">
        {
          slides.map((slide,index)=>(
            <img src={slide} alt="" key={index} className={`${index === currentSlide ? 'opacity-100': 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}/>

          ))
        }
        <Button onClick={()=> setCurrentslide(prevSlide=> (prevSlide -1 + slides.length) % slides.length)} 
        variant="outline" size='icon' className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'>
          <ChevronLeftIcon className='w-4 h-4 ' />
        </Button>
        <Button onClick={()=> setCurrentslide(prevSlide=> (prevSlide + 1 ) % slides.length)} 
        variant="outline" size='icon' className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'>
          <ChevronRightIcon className='w-4 h-4 ' />
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className="container mx-auto px-4">
          <h2 className='text-3xl font-bold text-center mb-8'>Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {
              categoriesWithIcon.map((item)=> <Card onClick={()=> handleNavigateToListingPage(item, 'category')}
              className='cursor-pointer hover:shadow-lg transition-shadow'>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className='mb-4 text-primary'>{item.icon}</div>
                    <span className='font-bold'>{item.label}</span>
                  </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>
      <section className='py-12 bg-gray-50'>
        <div className="container mx-auto px-4">
          <h2 className='text-3xl font-bold text-center mb-8'>Shop By Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {
              brand.map((item)=> <Card onClick={()=> handleNavigateToListingPage(item, 'brand')}
              className='cursor-pointer hover:shadow-lg transition-shadow'>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className='mb-4 text-primary'>{item.icon}</div>
                    <span className='font-bold'>{item.label}</span>
                  </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>
      <section className='py-2'>
        <div className="container mx-auto px-4">
          <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-4 gap-6">
            {
              productList && productList.length > 0 ? 
              productList.map(productItem =><ShoppingProductTile handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails} product={productItem} />)
              : null
            }
          </div>
        </div>
      </section>
      <ProductDetails open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
    </div>
  )
}

export default Home