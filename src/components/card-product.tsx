import {FC} from "react";
import {Link} from "react-router";
import {Card} from "../bll/redux/reducers/products-reducer.ts";

interface Props {
    productCard: Card;
}

export const CardProduct: FC<Props> = ({productCard}) => {

    return (
        <div className='border border-gray-200 p-2 w-full h-full aspect-auto flex flex-col gap-4 rounded-xl'>
            <h4 className='truncate-text text-2xl h-16'>{productCard.title}</h4>
            <Link to={`/product/${productCard.id}`}>
                <img src={productCard.image} alt="логотип продукта"
                     className='w-full aspect-video  object-cover rounded-xl hover:opacity-50'/></Link>
            <span className='text-2xl text-green-500'>Цена: {productCard.price}</span>
            <p className='text-sm'>{productCard.description}</p>
        </div>
    );
};
