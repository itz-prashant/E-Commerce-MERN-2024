import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/AuthLayout"
import Login from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import AdminLayout from "./components/admin-view/AdminLayout"
import AdminDashboard from "./pages/admin-view/AdminDashboard"
import AdminProducts from "./pages/admin-view/AdminProducts"
import AdminOrders from "./pages/admin-view/AdminOrders"
import ShoppingLayout from "./components/shopping-view/ShoppingLayout"
import Home from "./pages/shopping-view/Home"
import Checkout from "./pages/shopping-view/Checkout"
import Account from "./pages/shopping-view/Account"
import Listing from "./pages/shopping-view/Listing"
import NotFound from "./pages/not-found/NotFound"



function App() {

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white">

      <Routes>

        <Route path="/auth" element={<AuthLayout />}>
           <Route path="login" element={<Login />}/>
           <Route path="register" element={<Register />}/>
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
           <Route path="dashboard" element={<AdminDashboard />}/>
           <Route path="products" element={<AdminProducts />}/>
           <Route path="orders" element={<AdminOrders />}/>
        </Route>

        <Route path="/shop" element={<ShoppingLayout />}>
           <Route path="home" element={<Home />}/>
           <Route path="checkout" element={<Checkout />}/>
           <Route path="account" element={<Account />}/>
           <Route path="listing" element={<Listing />}/>
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  )
}

export default App
