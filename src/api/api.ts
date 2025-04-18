import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Card} from "../bll/redux/reducers/products-reducer.ts";

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
