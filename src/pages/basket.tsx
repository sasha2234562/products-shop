import {useCallback, useMemo, useState} from "react";
import {CardProduct} from "../components/card-product.tsx";
import {useGetAllProductsQuery} from "../api/api.ts";

export const Basket = () => {
    const storedProducts = localStorage.getItem('products');
    const parsedProducts: number[] = storedProducts ? JSON.parse(storedProducts) : [];
    const [productsId, setProductsId] = useState<number[]>(parsedProducts);

    const {data} = useGetAllProductsQuery()

    const filterProducts = useMemo(() => {
        if(!data){
            return [];
        }
        return data.filter(item => productsId.includes(item.id))
    }, [productsId, data]);

    const deleteProduct = useCallback((id: number) => {
        const filterProducts = productsId.filter(i => i !== id);
        setProductsId(filterProducts);
        localStorage.setItem('products', JSON.stringify(filterProducts));
    }, [productsId])

    return (
        <main
            className="gap-4 w-full grid grid-cols-[repeat(auto-fit,minmax(300px,400px))] justify-center justify-items-center">
            {filterProducts.length > 0 ? filterProducts.map((item) => (
                    <CardProduct key={item.id} productCard={item} selectToBasket={true}
                                 onClickSaveToBasketProduct={deleteProduct}/>))
                : <h2 className='text-2xl'>К сожалению ваша корзина пуста</h2>}
        </main>
    );
};
