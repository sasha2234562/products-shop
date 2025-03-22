import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {RootState, useAppDispatch} from "../bll/redux/store.ts";
import {useSelector} from "react-redux";
import {Card} from "../bll/redux/reducers/products-reducer.ts";
import {getProductsCards} from "../bll/redux/thunks/get-products-cards.ts";
import {CardProduct} from "../components/card-product.tsx";


export const Start = () => {
    const dispatch = useAppDispatch()
    const products = useSelector<RootState, Card[]>(state => state.products.products);
    const [searchProductsParams, setSearchProductsParams] = useState('');

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchProductsParams(event.currentTarget.value)
    }

    const searchProducts: Card[] = useMemo(() => {
        return products.filter(item => item.title.toLowerCase().startsWith(searchProductsParams))
    }, [products, searchProductsParams])

    useEffect(() => {
        dispatch(getProductsCards())
    }, [])

    if (!products) {
        return
    }
    return (
        <main className='flex flex-col gap-8 items-start'>
            <input type="text" placeholder={'Поиск'} value={searchProductsParams} onChange={onChangeHandler}
                   className='outline-none text-gray-900 border bg-transparent w-full p-2 rounded focus:border-purple-600'/>
            <section
                className="gap-4 w-full grid grid-cols-[repeat(auto-fit,minmax(306px,1fr))] justify-start">
                {searchProducts.map((item) => <CardProduct key={item.id} productCard={item}/>)}
            </section>
        </main>
    );
};
