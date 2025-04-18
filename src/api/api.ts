import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

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

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://fakestoreapi.com/products',}),
    endpoints: (build) => ({
        getAllProducts: build.query<Card[], void>({
            query: () => ''
        }),
        getSingleProduct: build.query<Card, string>({
            query: (id) => `/${id}`
        })
    }),
})
export const {useGetAllProductsQuery, useGetSingleProductQuery} = productsApi;
