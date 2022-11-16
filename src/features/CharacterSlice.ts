import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICharacters } from "../models/Characters";
import api from "../utils/Requests";

export type CharacterListState = {
    characters: ICharacters[],
    loading: boolean,
    error: boolean
}

const initialState: CharacterListState = {
    characters: [],
    loading: true,
    error: false
}

export const fetchCharacters = createAsyncThunk(
    'fetchCharacters',
    async ({limit, offset} : {limit: Number, offset: Number}) => {
        const response = await api.get(`characters?offset=${offset.toString()}=&limit=${limit.toString()}=&orderBy=name`);
        if (response !== undefined) {
            console.log("**********response", response);
            return response.data.data.results
        } else {
            throw 'An error occured when fetching characters.'
        }
    }
)

const characterListSlice = createSlice({
    name: 'apartmentList',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.fulfilled, (state, action) =>{
                state.characters = action.payload
                state.loading = false
            })
            .addCase(fetchCharacters.rejected, (state) => {
                state.error = true
            })
    }
})

export default characterListSlice.reducer;
