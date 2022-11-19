import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICharacters } from "../models/Characters";
import api from "../utils/Requests";

export type CharacterListState = {
    characters: ICharacters[],
    searchedCharacters: ICharacters[],
    searchText: string,
    limit: number,
    loading: boolean,
    error: boolean
}

const initialState: CharacterListState = {
    characters: [],
    searchedCharacters: [],
    searchText: '',
    loading: true,
    limit: 20,
    error: false
}

export const fetchCharacters = createAsyncThunk(
    'fetchCharacters',
    async () => {
        const response = await api.get(`characters?offset=0=&limit=20=&orderBy=name`);
        if (response !== undefined) {
            return response.data.data.results
        } else {
            throw 'An error occured when fetching characters.'
        }
    }
)

export const fetchMoreCharacters = createAsyncThunk(
    'fetchMoreCharacters',
    async ({limit}: {limit: number}) => {
        const response = await api.get(`characters?offset=0=&limit=${limit.toString()}=&orderBy=name`);
        if (response !== undefined) {
            return response.data.data.results
        } else {
            throw 'An error occured when fetching characters.'
        }
    }
)

export const searchCharacters = createAsyncThunk(
    'searchCharacters',
    async ({text}: {text: string}) => {
        const response = await api.get(`characters?nameStartsWith=${text}`);
        if (response !== undefined) {
            return response.data.data.results
        } else {
            throw 'An error occured when searching.'
        }
    }
)

const characterListSlice = createSlice({
    name: 'apartmentList',
    initialState: initialState,
    reducers: {
        increaseCharactersLimit(state) {
            state.limit += 20
        },
        setCharacterSearchText(state, action) {
            state.searchText = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.fulfilled, (state, action) =>{
                state.characters = action.payload
                state.loading = false
            })
            .addCase(fetchCharacters.rejected, (state) => {
                state.error = true
            })
            .addCase(fetchMoreCharacters.fulfilled, (state, action) => {
                state.characters = action.payload
            })
            .addCase(fetchMoreCharacters.rejected, (state, action) => {
                state.error = true
            })
            .addCase(searchCharacters.fulfilled, (state, action) => {
                state.searchedCharacters = action.payload
            })
            .addCase(searchCharacters.rejected, (state, action) => {
                state.error = true
            })
    }
})

export const { increaseCharactersLimit, setCharacterSearchText } = characterListSlice.actions
export default characterListSlice.reducer;
