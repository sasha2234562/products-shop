import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {productsSlice} from "./reducers/products-reducer.ts";

export const RootStateReducer = combineReducers({
    products: productsSlice.reducer
})
export const store = configureStore({reducer: RootStateReducer});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
