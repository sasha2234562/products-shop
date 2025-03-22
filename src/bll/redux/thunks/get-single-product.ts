import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getSingleProduct = createAsyncThunk(
    'cardsSlice/getSingleProduct',
    async (id: number) => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`);

            return {status: response.status, data: response.data};
        } catch (error) {
            console.log(error);
        }
    }
)
