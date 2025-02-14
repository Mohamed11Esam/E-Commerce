import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import ProductItem from "./../../Components/ProductItem/ProductItem";
import Loader from "./../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import { FaArrowRight, FaArrowLeft, FaFilter } from "react-icons/fa";
import { Helmet } from "react-helmet";

function Products() {
  const [resurlts, setResults] = useState({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("title");
  const [loading, setLoading] = useState(true);
  async function getProducts() {
    setLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products", {
        params: {
          limit: 18,
          page,
          sort,
        },
      })
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {});
    setLoading(false);
  }
  useEffect(() => {
    getProducts();
  }, [page, sort]);

  const { addToCart, setCartId, setNumOfCartItem } = useContext(CartContext);
  const {
    addToWishlist,
    setWishListData,
    removeWishlistItem,
    isInWishlist,
    getLoggedWishlistData,
  } = useContext(WishlistContext);
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
  async function deleteProductToWishlist(productId) {
    let res = await removeWishlistItem(productId);
    setWishListData(res.data.data);
  }
  async function getWishlistdata() {
    let res = await getLoggedWishlistData();
    let ids = res.data.map((item) => item.id);
    setWishListData(ids);
  }
  useEffect(() => {
    getWishlistdata();
  }, []);
  const handlePage = (info) => {
    setPage(info.selected + 1);
  };
  const handleSort = (e) => {
    setPage(1);
    setSort(e.target.value);
  };

  return (
    <section>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="flex justify-between mt-5">
        <h2 className="text-2xl font-semibold">All Products</h2>

        <div className="max-w-sm flex items-center gap-3">
          <label
            htmlFor="sort"
            className="block mb-2 text-sm font-medium text-main"
          >
            <FaFilter size={24} />
          </label>
          <select
            id="sort"
            onChange={handleSort}
            defaultValue={sort}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          >
            <option value="-price">Price High To Low</option>
            <option value="price">Price Low To High</option>
            <option value="-ratingsAverage">Top Rated</option>
            <option value="title">Name A TO Z</option>
            <option value="-title">Name Z TO A</option>
          </select>
        </div>
      </div>{" "}
      {loading ? (
        <Loader />
      ) : (
        <div className="row my-10 justify-center">
          {resurlts.data?.length > 0 ? (
            resurlts.data?.map((product) => (
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
            <Loader />
          )}
        </div>
      )}
      <ReactPaginate
        className="flex gap-5 justify-center items-center my-5 text-xl"
        nextLabel={<FaArrowRight size={22} className="hover:text-main" />}
        previousLabel={<FaArrowLeft size={22} className="hover:text-main" />}
        pageCount={Math.ceil(resurlts.metadata?.numberOfPages || 1)} // Ensure it's a valid integer
        onPageChange={handlePage}
        activeLinkClassName="text-main"
        forcePage={page - 1}
      />
    </section>
  );
}

export default Products;
