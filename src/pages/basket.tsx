import {RootState, useAppDispatch} from "../bll/redux/store.ts";
import {useSelector} from "react-redux";
import {Card} from "../bll/redux/reducers/products-reducer.ts";
import {useCallback, useEffect, useMemo, useState} from "react";
import {getProductsCards} from "../bll/redux/thunks/get-products-cards.ts";
import {CardProduct} from "../components/card-product.tsx";

export const Basket = () => {
    const storedProducts = localStorage.getItem('products');
    const parsedProducts: number[] = storedProducts ? JSON.parse(storedProducts) : [];
    const dispatch = useAppDispatch();
    const [productsId, setProductsId] = useState<number[]>(parsedProducts);
    const products = useSelector<RootState, Card[]>(state => state.products.products);

    useEffect(() => {
        dispatch(getProductsCards())
    }, [])
    const filterProducts = useMemo(() => {
        return products.filter(item => productsId.includes(item.id))
    }, [productsId, products]);

    const deleteProduct = useCallback((id: number) => {
        const filterProducts = productsId.filter(i => i !== id);
        setProductsId(filterProducts);
        localStorage.setItem('products', JSON.stringify(filterProducts));
    }, [productsId])

    return (
        <main
            className="gap-4 w-full grid grid-cols-[repeat(auto-fit,minmax(300px,400px))] justify-center justify-items-center">
            {filterProducts.length > 0 ?filterProducts.map((item) => (
                <CardProduct key={item.id} productCard={item} selectToBasket={true}
                             onClickSaveToBasketProduct={deleteProduct}/>))
            : <h2 className='text-2xl'>К сожалению ваша корзина пуста</h2>}
        </main>
    );
};
