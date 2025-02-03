import { Link } from 'react-router-dom';
import styles from './ProductItem.module.css'
import { TiStarFullOutline } from "react-icons/ti";

function ProductItem({product,addProduct}) {
    return (
        <div className="inner product p-2 border border-transparent rounded-md">
            <Link to={`/productDetails/${product.id}`}>
            
                <img src={product.imageCover} className="w-full" alt="" />
                <small className="text-main">{product.category?.name}</small>
                <h5 className="font-semibold my-3">{product.title.split(' ').slice(0,3).join(' ')}</h5>
                <div className="flex justify-between">
                    <p>{product.price}EGP</p>
                    <div className="flex gap-1 items-center">
                    <TiStarFullOutline size={21} className="text-yellow-300" />{product.ratingsAverage}
                    </div>
                </div>
                </Link>
                <button className='btn w-full ' onClick={()=>{addProduct(product.id)}}>Add To Cart</button>
            </div>
    )
}

export default ProductItem
