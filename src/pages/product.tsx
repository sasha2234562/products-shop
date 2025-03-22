import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {Rating} from "@mui/material";
import {RootState, useAppDispatch} from "../bll/redux/store.ts";
import {Card} from "../bll/redux/reducers/products-reducer.ts";
import {getSingleProduct} from "../bll/redux/thunks/get-single-product.ts";


export const Product = () => {
    const product = useSelector<RootState, Card>(state => state.products.singleProduct);
    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        if(params.id){
            dispatch(getSingleProduct(+params.id))
        }
    }, [params.id])

    if(!product){
        return
    }

    return (
        <main className='flex flex-col gap-8 items-start'>
            <h2 className='text-2xl font-semibold'>{product.title}</h2>
            <div className='flex gap-4 items-center'>
                <img src={product.image} alt="логотип выбранного продукта" title={`логотип ${product.title}`}
                      className='aspect-video object-cover max-w-[50%] rounded'/>
                <div className='flex flex-col justify-start gap-4'>
                    <span className='text-2xl font-bold text-green-700'>Цена: {product.price}</span>
                    <p className='text-l font-normal'>{product.description}</p>
                    <Rating name="read-only" value={product.rating ? product.rating.rate : null} readOnly />
                </div>
            </div>
        </main>
    );
};
