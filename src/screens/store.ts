import {combineReducers, configureStore} from '@reduxjs/toolkit';
import CharacterSlice from '../features/CharacterSlice';
import ComicsSlice from '../features/ComicsSlice';

const rootReducer = combineReducers({
  characterSlice: CharacterSlice,
  comicsSlice: ComicsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
