import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItem } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice'
import CartWrapper from './CartWrapper'
import { fetchCartItems } from '@/store/shop/cart-slice'
import { Label } from '../ui/label'

const ShoppingHead = () => {
  const {user} = useSelector(state=> state.auth)
  const [opanChartSheet, setOpenChartSheet] = useState(false)
  const {cartItems} = useSelector(state => state.shopCart)
  const [searchParams, setsearchParams]  =useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleLogout(){
    dispatch(logoutUser())
  }

  function handleNavigateToListingPage(currentItem){
    sessionStorage.clear('filters')
    const currentfilter = currentItem.id !== 'home' && currentItem.id !== 'products' && currentItem.id !== 'search' ? {
      category: [currentItem.id]
    }: null

    sessionStorage.setItem('filters', JSON.stringify(currentfilter))

    location.pathname.includes('listing') && currentfilter !== null ? setsearchParams(new URLSearchParams(
      `?category=${currentItem.id}`
    )): 
    navigate(currentItem.path)
}

  function MenuItems(){
    const location = useLocation()
    return <nav className='flex flex-col mb-b lg:mb-0 lg:items-center gap-6 lg:flex-row'>
      {
        shoppingViewHeaderMenuItem.map(menuItem=> <Label key={menuItem.id} onClick={()=> handleNavigateToListingPage(menuItem)}
          className='text-sm font-medium cursor-pointer'>
            {menuItem.label}
            </Label>)
      }
    </nav>
  }

  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
  },[dispatch])

  function HeaderRightContent(){
    return <div className='flex flex-col lg:flex-row lg:items-center gap-4'>
      <Sheet open={opanChartSheet} onOpenChange={()=>setOpenChartSheet(false)}>
        <Button className="relative" 
        onClick={()=> setOpenChartSheet(true)} variant="outline" size='icon'>
          <ShoppingCart className='w-6 h-6'/>
          <span className='absolute -top-1 font-bold right-1 text-sm'>{cartItems?.items?.length || 0}</span>
          <span className='sr-only'>User only</span>
        </Button>
        <CartWrapper setOpenChartSheet={setOpenChartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}/>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold">
                  {user.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='right' className='w-56'>

          <DropdownMenuLabel>
            Logged in as {user?.userName}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={()=> navigate('/shop/account')}>
            <UserCog className='mr-2 h-4 w-4'/>
            Account
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className='mr-2 h-4 w-4'/>
            Logout
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className='flex items-center h-16 justify-between px-4 md:px-6'>
        <Link to={'/shop/home'} className='flex items-center gap-2'>
          <HousePlug className='h-6 w-6'/>
          <span className='font-bold'>E-Commerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className='h-6 w-6'/>
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>
          <MenuItems />
        </div>
        <div className='hidden lg:block'>
          <HeaderRightContent />
        </div> 
      </div>
    </header>
  )
}

export default ShoppingHead