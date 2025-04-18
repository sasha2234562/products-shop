import {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import {CardProduct} from "../components/card-product.tsx";
import {Input} from "../components/input.tsx";
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useGetAllProductsQuery, Card} from "../api/api.ts";

function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
    let timer: number;
    return function (...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export const Start = () => {
    const [selectedSort, setSelectedSort] = useState('plus-price');
    const [searchProductsParams, setSearchProductsParams] = useState('');
    const [selectProducts, setSelectProducts] = useState<number[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Card[]>([]);
    const storedProducts = localStorage.getItem('products');
    const {data} = useGetAllProductsQuery()

    useEffect(() => {
        if (storedProducts) {
            setSelectProducts(JSON.parse(storedProducts));
            return;
        }
        setSelectProducts([]);
    }, []);

    const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchProductsParams(event.currentTarget.value);
    };

    const filterAndSortProducts = useCallback(() => {
        if(!data){
            setFilteredProducts([]);
            return;
        }
        const filtered = data.filter(item => {
            return item.title.toLowerCase().startsWith(searchProductsParams.toLowerCase());
        }).sort((a, b) => selectedSort === 'plus-price' ? a.price - b.price : b.price - a.price);

        setFilteredProducts(filtered);
    }, [data, selectedSort, searchProductsParams]);

    const debouncedFilterAndSortProducts = useMemo(() => debounce(filterAndSortProducts, 300), [filterAndSortProducts]);

    useEffect(() => {
        debouncedFilterAndSortProducts();
    }, [searchProductsParams, debouncedFilterAndSortProducts]);

    const onChangeSort = (event: SelectChangeEvent) => {
        setSelectedSort(event.target.value);
    };

    const onClickSaveToBasketProduct = useCallback((id: number) => {
        if (!storedProducts) {
            localStorage.setItem('products', JSON.stringify([id]));
            return;
        }

        const storedProductsParse: number[] = JSON.parse(storedProducts);
        let newProducts: number[];
        const isSelected = storedProductsParse.includes(id);

        if (isSelected) {
            newProducts = storedProductsParse.filter(i => i !== id);
        } else {
            newProducts = [...storedProductsParse, id];
        }
        setSelectProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    }, [storedProducts]);

    if (!data) {
        return null;
    }

    return (
        <main className='flex flex-col gap-8 items-start'>
            <div className='flex gap-8 w-full mobile'>
                <Input placeholder={'Поиск'} value={searchProductsParams} onChange={onChangeSearch} />
                <FormControl sx={{ minWidth: 300, height: 42 }}>
                    <Select value={selectedSort} onChange={onChangeSort} defaultValue={selectedSort}>
                        <MenuItem value={'plus-price'} selected>По возрастанию цены</MenuItem>
                        <MenuItem value={'minus-price'}>По убыванию цены</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <section className="gap-4 w-full grid grid-cols-[repeat(auto-fit,minmax(306px,1fr))] justify-items-center">
                {filteredProducts.map((item) => (
                    <CardProduct key={item.id} selectToBasket={selectProducts.includes(item.id)} productCard={item}
                                 onClickSaveToBasketProduct={onClickSaveToBasketProduct}/>))}
            </section>
        </main>
    );
};
