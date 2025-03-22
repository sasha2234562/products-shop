import {RootState, useAppDispatch} from "../bll/redux/store.ts";
import {useSelector} from "react-redux";
import {Card} from "../bll/redux/reducers/products-reducer.ts";
import {useEffect, useMemo} from "react";
import {getProductsCards} from "../bll/redux/thunks/get-products-cards.ts";
import {CardProduct} from "../components/card-product.tsx";

export const Basket = () => {
    const selectProducts = localStorage.getItem('products');
    const parsedProducts: number[] = selectProducts ? JSON.parse(selectProducts) : []; // Ensure not null
    const dispatch = useAppDispatch();
    const products = useSelector<RootState, Card[]>(state => state.products.products);

    const filterProducts = useMemo(() => {
        return products.filter(item => parsedProducts.includes(item.id))
    }, [products, selectProducts]);

    useEffect(() => {
        dispatch(getProductsCards())
    }, [])

    return (
        <main
            className="gap-4 w-full grid grid-cols-[repeat(auto-fit,minmax(306px,1fr))] justify-start">
            {filterProducts.map((item) => <CardProduct key={item.id} productCard={item}/>)}
        </main>
    );
};
