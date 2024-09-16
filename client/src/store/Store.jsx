import{ configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice"
import adminProductReducer from "./admin/product-slice"
import shopProductSlice from './shop/product-slice'
import shopCartSlice from './shop/cart-slice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProduct: adminProductReducer,
        shopProduct: shopProductSlice,
        shopCart: shopCartSlice
    }
})

export default store;