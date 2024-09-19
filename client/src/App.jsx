import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/AuthLayout"
import Login from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import AdminLayout from "./components/admin-view/AdminLayout"
import AdminDashboard from "./pages/admin-view/AdminDashboard"
import AdminProducts from "./pages/admin-view/AdminProducts"
import ShoppingLayout from "./components/shopping-view/ShoppingLayout"
import Home from "./pages/shopping-view/Home"
import Checkout from "./pages/shopping-view/Checkout"
import Account from "./pages/shopping-view/Account"
import Listing from "./pages/shopping-view/Listing"
import NotFound from "./pages/not-found/NotFound"
import CheckAuth from "./components/common/CheckAuth"
import UnAuth from "./pages/un-Auth/UnAuth"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Skeleton } from "@/components/ui/skeleton"
import AdminOrdersView from "./pages/admin-view/AdminOrdersView"
import PaypalReturn from "./pages/shopping-view/PaypalReturn"


function App() {

  const {isAuthenticated, user, isLoading} = useSelector(state => state.auth)  
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  if(isLoading) return <Skeleton className="w-[600px] h-[600px] bg-black" />


  return (
    <div className="flex flex-col w-full overflow-hidden bg-white">

      <Routes>

        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
           <Route path="login" element={<Login />}/>
           <Route path="register" element={<Register />}/>
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
           <Route path="dashboard" element={<AdminDashboard />}/>
           <Route path="products" element={<AdminProducts />}/>
           <Route path="orders" element={<AdminOrdersView />}/>
        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
           <Route path="home" element={<Home />}/>
           <Route path="checkout" element={<Checkout />}/>
           <Route path="account" element={<Account />}/>
           <Route path="listing" element={<Listing />}/>
           <Route path="paypal-return" element={<PaypalReturn />}/>
        </Route>
        <Route path="*" element={<NotFound />}/>
        <Route path="/unAuth" element={<UnAuth />}/>
      </Routes>
    </div>
  )
}

export default App
