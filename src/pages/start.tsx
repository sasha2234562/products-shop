import {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import {RootState, useAppDispatch} from "../bll/redux/store.ts";
import {useSelector} from "react-redux";
import {Card} from "../bll/redux/reducers/products-reducer.ts";
import {getProductsCards} from "../bll/redux/thunks/get-products-cards.ts";
import {CardProduct} from "../components/card-product.tsx";
import {Input} from "../components/input.tsx";
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";


export const Start = () => {
    const dispatch = useAppDispatch()
    const [selectedSort, setSelectedSort] = useState('plus-price');
    const products = useSelector<RootState, Card[]>(state => state.products.products);
    const [searchProductsParams, setSearchProductsParams] = useState('');
    const [selectProducts, setSelectProducts] = useState<number[]>([]);
    const storedProducts = localStorage.getItem('products');

    useEffect(() => {
        dispatch(getProductsCards())
        if (storedProducts) {
            setSelectProducts(JSON.parse(storedProducts));
            return;
        }
        setSelectProducts([]);
    }, [])

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchProductsParams(event.currentTarget.value)
    }

    const searchProducts: Card[] = useMemo(() => {
        return products.filter(item => {
            return item.title.toLowerCase().startsWith(searchProductsParams)
        }).sort((a, b) => selectedSort === 'plus-price' ? a.price - b.price : a.price + b.price);
    }, [products, searchProductsParams, selectedSort])


    const handleChange = (event: SelectChangeEvent) => {
        setSelectedSort(event.target.value);
    };

    const onClickSaveToBasketProduct = useCallback((id: number) => {
        if (!storedProducts) {
            localStorage.setItem('products', JSON.stringify([id]));
            return;
        }

        const storedProductsParse: number[] = JSON.parse(storedProducts)
        let newProducts: number[]
        const isSelected = storedProductsParse.includes(id);

        if (isSelected) {
            newProducts = storedProductsParse.filter(i => i !== id);
        } else {
            newProducts = [...storedProductsParse, id];
        }
        setSelectProducts(newProducts)
        localStorage.setItem('products', JSON.stringify(newProducts));
    }, [storedProducts]);

    if (!products) {
        return
    }
    return (
        <main className='flex flex-col gap-8 items-start'>
            <div className='flex gap-8 w-full'>
                <Input placeholder={'Поиск'} value={searchProductsParams} onChange={onChangeHandler}/>
                <FormControl sx={{minWidth: 320}}>
                    <Select
                        value={selectedSort}
                        aria-placeholder={'Сортировка'}
                        onChange={handleChange}
                        defaultValue={selectedSort}
                    >
                        <MenuItem value={'plus-price'} selected>По возрастанию цены</MenuItem>
                        <MenuItem value={'minus-price'}>По убыванию цены</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <section
                className="gap-4 w-full grid grid-cols-[repeat(auto-fit,minmax(306px,1fr))] justify-start">
                {searchProducts.map((item) => (
                    <CardProduct key={item.id} selectToBasket={selectProducts.includes(item.id)} productCard={item}
                                 onClickSaveToBasketProduct={onClickSaveToBasketProduct}/>))}
            </section>
        </main>
    );
};
