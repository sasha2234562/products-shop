import {createSlice} from "@reduxjs/toolkit";
import {getProductsCards} from "../thunks/get-products-cards.ts";
import {getSingleProduct} from "../thunks/get-single-product.ts";

export interface Card {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: {
        rate: number;
        count: number;
    }
    title: string;
}

interface InitialState {
    products: Card[];
    singleProduct: Card;
}

const initialState: InitialState = {
    products: [],
    singleProduct: {} as Card,
}

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProductsCards.fulfilled, (state, action) => {
            state.products = action.payload?.data
        })
        builder.addCase(getSingleProduct.fulfilled, (state, action) => {
            state.singleProduct = action.payload?.data
        })
    }
})
