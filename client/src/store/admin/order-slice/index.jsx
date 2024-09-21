import {createAsyncThunk, createSlice}  from "@reduxjs/toolkit"
import axios from "axios"


const initialState ={
    isLoading: false,
    orderList: [],
    orderDetails: null
}

export const getAllOrderForAdmin = createAsyncThunk('/order/getAllOrderForAdmin', async()=>{
    const response = await axios.get(`http://localhost:5000/api/admin/order/get`)
    return response.data
})

export const getOrderDetailsForAdmin = createAsyncThunk('/order/getOrdetaiForAdmin', async(id)=>{
    const response = await axios.get(`http://localhost:5000/api/admin/order/details/${id}`)
    return response.data
})

export const updateOrderStatus = createAsyncThunk('/order/updateOrderStatus', async({id,orderStatus})=>{
    const response = await axios.put(`http://localhost:5000/api/admin/order/update/${id}`,{
        orderStatus
    })
    return response.data
})


const adminOrderSlice  = createSlice({
    name:'adminOrderSlice',
    initialState,
    reducers:{
        resetOrderDetailsAdmin: (state)=>{
            state.orderDetails = null
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getAllOrderForAdmin.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getAllOrderForAdmin.fulfilled, (state,action)=>{
            state.isLoading = false
            state.orderList= action.payload.data
        })
        .addCase(getAllOrderForAdmin.rejected, (state)=>{
            state.isLoading = true
            state.orderList= []
        })
        .addCase(getOrderDetailsForAdmin.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getOrderDetailsForAdmin.fulfilled, (state,action)=>{
            state.isLoading = false
            state.orderDetails= action.payload.data
        })
        .addCase(getOrderDetailsForAdmin.rejected, (state)=>{
            state.isLoading = true
            state.orderDetails= null
        })
    }
})

export const {resetOrderDetailsAdmin} = adminOrderSlice.actions
export default adminOrderSlice.reducer