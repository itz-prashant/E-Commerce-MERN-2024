import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState= {
    isLoading: false,
    searcResult: []
}

export const getSearchResult = createAsyncThunk('/getSearchResult', async (keyword)=>{
    const result = await axios.get(`http://localhost:5000/api/shop/search/${keyword}`)
    return result.data
})

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers:{
        resetSearchResult: (state)=>{
            state.searcResult= []
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getSearchResult.pending, (state)=>{
            state.isLoading= true
        })
        .addCase(getSearchResult.fulfilled, (state, action)=>{
            state.isLoading= false
            state.searcResult = action.payload.data
        })
        .addCase(getSearchResult.rejected, (state)=>{
            state.isLoading= false
            state.searcResult = []
        })
    }
})

export const {resetSearchResult} = searchSlice.actions

export default searchSlice.reducer