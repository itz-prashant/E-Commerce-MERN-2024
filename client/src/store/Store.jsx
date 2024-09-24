import{ configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice"
import adminProductReducer from "./admin/product-slice"
import adminOrderSlice from './admin/order-slice'
import shopProductSlice from './shop/product-slice'
import shopCartSlice from './shop/cart-slice'
import shopAddressSlice from './shop/address-slice'
import shopOrderSlice from './shop/order-slice'
import searchSlice from './shop/search-slice'
import reviewSlice from './shop/review-slice'
import commonFeatureSlice from './common-slice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProduct: adminProductReducer,
        shopProduct: shopProductSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice,
        adminOrder: adminOrderSlice,
        shopSearch: searchSlice,
        review: reviewSlice,
        commonFeature:commonFeatureSlice
    }
})

export default store;