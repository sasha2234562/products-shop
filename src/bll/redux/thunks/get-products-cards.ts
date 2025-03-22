import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsCards = createAsyncThunk(
    'cardsSlice/getProductsCards',
    async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');

            return {status: response.status, data: response.data};
        } catch (error) {
            console.log(error);
        }
    }
)
