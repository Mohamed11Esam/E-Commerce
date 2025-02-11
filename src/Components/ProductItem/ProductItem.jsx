import { Link } from "react-router-dom";
import styles from "./ProductItem.module.css";
import { TiStarFullOutline } from "react-icons/ti";
import { FaHeart } from "react-icons/fa6";
function ProductItem({
  product,
  addProduct,
  addProductToWishlist,
  isInWishlist,
  deleteProductToWishlist,
}) {
  return (
    <div className="inner product p-2 border border-transparent rounded-md">
      <Link to={`/productDetails/${product.id}`}>
        <img src={product.imageCover} className="w-full" alt="" />
        <small className="text-main">{product.category?.name}</small>
        <h5 className="font-semibold my-3">
          {product.title.split(" ").slice(0, 2).join(" ")}
        </h5>
        <div className="flex justify-between">
          <p>{product.price}EGP</p>
          <div className="flex gap-1 items-center">
            <TiStarFullOutline size={21} className="text-yellow-300" />
            {product.ratingsAverage}
          </div>
        </div>
      </Link>
      <div className="flex flax-flex-wrap justify-between items-center">
        <button
          className="btn "
          onClick={() => {
            addProduct(product.id);
            deleteProductToWishlist(product.id)
          }}
        >
          Add To Cart
        </button>
        <button
          className={`hover:text-red-600 ${
            isInWishlist(product.id) ? "text-red-700" : "text-black"
          }`}
          onClick={() => {
            isInWishlist(product.id)
              ? deleteProductToWishlist(product.id)
              : addProductToWishlist(product.id);
          }}
        >
          <FaHeart size={24} />
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
