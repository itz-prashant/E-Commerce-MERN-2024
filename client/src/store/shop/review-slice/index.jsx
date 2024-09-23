import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    reviews: []
}

export const addReview = createAsyncThunk('/addReview', async (data)=>{
    const result = await axios.post(`http://localhost:5000/api/shop/review/add`, data)
    return result.data
}) 

export const getReview = createAsyncThunk('/getReview', async (id)=>{
    const result = await axios.get(`http://localhost:5000/api/shop/search/${id}`)
    return result.data
})

const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getReview.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getReview.fulfilled, (state,action)=>{
            state.isLoading = false
            state.reviews  = action.payload.data
        })
        .addCase(getReview.rejected, (state)=>{
            state.isLoading = false
            state.reviews  = []
        })
    }
})

export default reviewSlice.reducer;