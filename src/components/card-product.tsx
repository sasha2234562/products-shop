import {FC, memo} from "react";
import {Link} from "react-router";
import {Card} from "../bll/redux/reducers/products-reducer.ts";
import {Rating} from "@mui/material";

interface Props {
    productCard: Card;
    onClickSaveToBasketProduct: (id: number) => void;
    selectToBasket: boolean;
}

export const CardProduct: FC<Props> = memo(({productCard, onClickSaveToBasketProduct, selectToBasket}) => {

    const selectProduct = () => onClickSaveToBasketProduct(productCard.id);

    return (
        <div
            className='border border-gray-200 p-2 w-full h-full flex flex-col justify-between gap-4 rounded-xl max-w-[400px]'>
            <div className='flex flex-col gap-4'>
                <h4 className='truncate-text text-2xl h-16'>{productCard.title}</h4>
                <Link to={`/cart/${productCard.id}`}>
                    <img src={productCard.image} alt="логотип продукта"
                         className='w-full aspect-video  object-cover rounded-xl hover:opacity-50'/></Link>
                <span className='text-2xl text-green-500'>Цена: {productCard.price}</span>
                <Rating name="read-only" value={productCard.rating ? productCard.rating.rate : null} readOnly/>
                <p className='text-sm'>{productCard.description}</p>
            </div>
            <button onClick={selectProduct}
                    className='bg-purple-950 rounded-xl p-2 text-s text-white'>
                {selectToBasket ? 'Удалить из корзины' : 'Добавить в корзину'}
            </button>
        </div>
    );
});
