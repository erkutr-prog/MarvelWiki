import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/Requests";
import { IComics } from "../models/Comics";

export type ComicsListState = {
    comics: IComics[],
    loading: boolean,
    error: boolean
}

const initialState: ComicsListState = {
    comics: [],
    loading: true,
    error: false
}

export const fetchComics = createAsyncThunk(
    'fetchComics',
    async ({limit, offset} : {limit: Number, offset: Number}) => {
        console.log("********limit", limit);
        const response = await api.get(`comics?offset=${offset.toString()}=&limit=${limit.toString()}`);
        console.log("***************responsefirst", response);
        if (response !== undefined) {
            console.log("**********response", response);
            return response.data.data.results
        } else {
            throw 'An error occured when fetching comics.'
        }
    }
)

const characterListSlice = createSlice({
    name: 'apartmentList',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComics.fulfilled, (state, action) =>{
                state.comics = action.payload
                state.loading = false
            })
            .addCase(fetchComics.rejected, (state) => {
                state.error = true
            })
    }
})

export default characterListSlice.reducer;
