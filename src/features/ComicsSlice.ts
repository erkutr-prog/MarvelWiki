import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../utils/Requests';
import {IComics} from '../models/Comics';

export type ComicsListState = {
  comics: IComics[];
  searchedComics: IComics[];
  searchText: string;
  limit: number;
  loading: boolean;
  error: boolean;
};

export const initialState: ComicsListState = {
  comics: [],
  searchedComics: [],
  searchText: '',
  limit: 20,
  loading: true,
  error: false,
};

export const fetchComics = createAsyncThunk('fetchComics', async () => {
  const response = await api.get(`comics?offset=0=&limit=20=&orderBy=title`);
  if (response !== undefined) {
    return response.data.data.results;
  } else {
    throw 'An error occured when fetching comics.';
  }
});

export const fetchMoreComics = createAsyncThunk(
  'fetchMoreComics',
  async ({limit}: {limit: number}) => {
    const response = await api.get(
      `comics?offset=0=&limit=${limit.toString()}=&orderBy=title`,
    );
    if (response !== undefined) {
      return response.data.data.results;
    } else {
      throw 'An error occured when fetching characters.';
    }
  },
);

export const searchComics = createAsyncThunk(
  'searchComics',
  async ({text}: {text: string}) => {
    const response = await api.get(`comics?titleStartsWith=${text}`);
    if (response !== undefined) {
      return response.data.data.results;
    } else {
      throw 'An error occured when searching.';
    }
  },
);

const comicsSlice = createSlice({
  name: 'comicsSlice',
  initialState: initialState,
  reducers: {
    increaseComicsLimit(state) {
      state.limit += 20;
    },
    setComicsSearchText(state, action) {
      state.searchText = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComics.fulfilled, (state, action) => {
        state.comics = action.payload;
        state.loading = false;
      })
      .addCase(fetchComics.rejected, state => {
        state.error = true;
      })
      .addCase(fetchMoreComics.fulfilled, (state, action) => {
        state.comics = action.payload;
      })
      .addCase(fetchMoreComics.rejected, (state, action) => {
        state.error = true;
      })
      .addCase(searchComics.fulfilled, (state, action) => {
        state.searchedComics = action.payload;
      })
      .addCase(searchComics.rejected, (state, action) => {
        state.error = true;
      });
  },
});

export const {increaseComicsLimit, setComicsSearchText} = comicsSlice.actions;
export default comicsSlice.reducer;
