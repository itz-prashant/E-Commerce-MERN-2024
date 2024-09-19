import{ configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice"
import adminProductReducer from "./admin/product-slice"
import shopProductSlice from './shop/product-slice'
import shopCartSlice from './shop/cart-slice'
import shopAddressSlice from './shop/address-slice'
import shopOrderSlice from './shop/order-slice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProduct: adminProductReducer,
        shopProduct: shopProductSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice
    }
})

export default store;