import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    productList: []
}

export const fertchAllFilterProduct = createAsyncThunk('/product/get', async ()=>{
    const result = await axios.get('http://localhost:5000/api/shop/product/get');
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
    }
})

export default shoppingProductSlice.reducer