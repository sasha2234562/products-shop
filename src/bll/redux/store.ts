import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {productsApi} from "../../api/api.ts";

export const RootStateReducer = combineReducers({
    [productsApi.reducerPath]: productsApi.reducer,
})
export const store = configureStore({
    reducer: RootStateReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch)
