import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    productList: []
}

export const addNewProduct = createAsyncThunk('/product/add', async (formData)=>{
    const result = await axios.post('http://localhost:5000/api/admin/product/add', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return result.data
})

export const fertchAllProduct = createAsyncThunk('/product/get', async ()=>{
    const result = await axios.get('http://localhost:5000/api/admin/product/get');
    return result.data;
})

export const editProduct = createAsyncThunk('/product/edit', async (id, formData)=>{
    const result = await axios.put(`http://localhost:5000/api/admin/product/edit/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return result.data
})

export const deleteProduct = createAsyncThunk('/product/delete', async (id)=>{
    const result = await axios.post(`http://localhost:5000/api/admin/product/delete/${id}`)
    return result.data
})

const AdminProductSlice = createSlice({
    name: 'adminProduct',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fertchAllProduct.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fertchAllProduct.fulfilled, (state,action)=>{
            console.log(action.payload)
            state.isLoading = false,
            state.productList = action.payload.data
        })
        .addCase(fertchAllProduct.rejected, (state)=>{
            state.isLoading = false,
            state.productList = []
        })
    }
})

export default AdminProductSlice.reducer