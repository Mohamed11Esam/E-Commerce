import styles from "./Wishlist.module.css";
import { WishlistContext } from "./../../Context/WishlistContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import Loader from "./../../Components/Loader/Loader";
import ProductItem from "./../../Components/ProductItem/ProductItem";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
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

  }
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
  async function deleteProductToWishlist(productId) {
    setLoading(false);
    let res = await removeWishlistItem(productId);
    setWishListData(res.data.data);
    setLoading(true);
  }
  async function getWishlistdata(){
    let res = await getLoggedWishlistData();
    setWishList(res.data);
    let ids = res.data.map((item)=>item.id)
    setWishListData(ids);

  }
  useEffect(() => {
    getWishlistdata();
  }, [wishList])
  return (
    <div className="container min-h-dvh">
      <h2 className="text-2xl font-semibold py-4">WhishList :</h2>
      {loading ? (
      <div className="row my-10 justify-center ">
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
          <h2 className="text-2xl font-semibold">No Product Found</h2>
        )}
      </div>
      ):(
        <Loader/>
      )}
    </div>
  );
}

export default Wishlist;
