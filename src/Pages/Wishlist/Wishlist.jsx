import styles from "./Wishlist.module.css";
import { WishlistContext } from "./../../Context/WishlistContext";
import { useContext, useState, useEffect } from "react";
import Loader from "./../../Components/Loader/Loader";
import ProductItem from "./../../Components/ProductItem/ProductItem";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import noProducts from '../../assets/images/WishList.27b4b70c133dbb5fa3624842ce62d778.svg';

function Wishlist() {
  const {
    addToWishlist,
    setWishListData,
    removeWishlistItem,
    isInWishlist,
    getLoggedWishlistData,
  } = useContext(WishlistContext);
  const { addToCart, setCartId, setNumOfCartItem } = useContext(CartContext);
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add product to cart
  async function addProduct(productId) {
    let res = await addToCart(productId);

    if (res.status === 200) {
      setCartId(res.data.cartId);
      setNumOfCartItem(res.data.numOfCartItems);
      toast.success(res.data.message, {
        position: "bottom-right",
      });
    } else {
      toast.error("Something Wrong", {
        position: "bottom-right",
      });
    }
  }

  async function addProductToWishlist(productId) {
    let res = await addToWishlist(productId);
    setWishListData(res.data.data);
    await getWishlistdata(); 
  }

  async function deleteProductToWishlist(productId) {
    setLoading(true);
    let res = await removeWishlistItem(productId);
    if (res.status === 200) {

      setWishList((prevWishList) =>
        prevWishList.filter((product) => product.id !== productId)
      );
      setWishListData(res.data.data || []);
      toast.success("Product removed from wishlist", {
        position: "bottom-right",
      });
    } else {
      toast.error("Failed to remove product", {
        position: "bottom-right",
      });
    }
    setLoading(false);
  }

  // Fetch wishlist data
  async function getWishlistdata() {
    setLoading(true);
    let res = await getLoggedWishlistData();
    setWishList(res.data);
    let ids = res?.data.map((item) => item.id);
    setWishListData(ids);
    setLoading(false);
  }

  // Fetch wishlist data on component mount
  useEffect(() => {
    getWishlistdata();
  }, []); // Empty dependency array to run only once

  return (
    <div className="container min-h-dvh">
      <h2 className="text-2xl font-semibold py-4">Wishlist:</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="row my-10 justify-center">
          {wishList.length > 0 ? (
            wishList.map((product) => (
              <div
                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
                key={product.id}
              >
                <ProductItem
                  product={product}
                  addProduct={addProduct}
                  isInWishlist={isInWishlist}
                  deleteProductToWishlist={deleteProductToWishlist}
                  addProductToWishlist={addProductToWishlist}
                />
              </div>
            ))
          ) : (
            <img src={noProducts} className="w-1/3" alt="No products in wishlist" />
          )}
        </div>
      )}
    </div>
  );
}

export default Wishlist;