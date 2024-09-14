import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    productList: [],
    productDetails: null
}

export const fertchAllFilterProduct = createAsyncThunk('/product/get', async ({filterParams, sortParams})=>{

    const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams
    })

    const result = await axios.get(`http://localhost:5000/api/shop/product/get?${query}`);
    
    return result.data;
})

export const fetchProductdetail = createAsyncThunk('/product/fetchProductdetail', async (id)=>{

    const result = await axios.get(`http://localhost:5000/api/shop/product/get/${id}`);
    
    return result.data;
})

const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducer:{},
    extraReducers : (builder) =>{
        builder.addCase(fertchAllFilterProduct.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fertchAllFilterProduct.fulfilled, (state,action)=>{            
            state.isLoading = false
            state.productList = action.payload.data
        })
        .addCase(fertchAllFilterProduct.rejected, (state)=>{
            state.isLoading = false
            state.productList = []
        })
        .addCase(fetchProductdetail.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchProductdetail.fulfilled, (state,action)=>{            
            state.isLoading = false
            state.productDetails = action.payload.data
        })
        .addCase(fetchProductdetail.rejected, (state)=>{
            state.isLoading = false
            state.productDetails = null
        })
    }
})

export default shoppingProductSlice.reducer