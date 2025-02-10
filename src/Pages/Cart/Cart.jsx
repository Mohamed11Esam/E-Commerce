import { Helmet } from "react-helmet";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../Components/Loader/Loader";
import { FaTrashCan } from "react-icons/fa6";

function Cart() {
  const { getLoggedCartData ,removeCartItem,updateProductCount,setCartId,setNumOfCartItem,deleteItems} = useContext(CartContext);
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  async function getData() {
    setLoading(false);
    let data = await getLoggedCartData();
    setCartData(data.data);
    setLoading(true);
  }
  
  async function deleteItem(productId) {
    let res = await removeCartItem(productId);
    setCartId(res.data.cartId);
    setNumOfCartItem(res.data.numOfCartItems);
    setCartData(res.data.data);
  }
  async function clearForm() {
    setLoading(false);
    let res = await deleteItems();
    setCartData(res.data);
    setNumOfCartItem(0);
    setLoading(true);
  }
  async function updateProduct(productId ,count) {
    let res = await updateProductCount(productId,count);
    setCartData(res.data.data);
    console.log(res.data.data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {loading ? <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="flex flex-wrap justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Shopping Cart
            </h2>

            <button type="button" onClick={()=>{clearForm()}} className="text-white bg-green-600 border border-gray-300 focus:outline-none hover:bg-main focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  ">Clear</button>
            </div>
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cartData?.products?.length > 0 ? cartData?.products?.map((product) => (
                        <div
                          key={product?.product._id}
                          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                        >
                          <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                            <img
                              className="h-60 w-60 dark:hidden"
                              src={product?.product.imageCover}
                              alt="imac image"
                            />

                            <label htmlFor="counter-input" className="sr-only">
                              Choose quantity:
                            </label>
                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                              <div className="flex items-center">
                                <button
                                disabled={product?.count === 1}
                                 onClick={()=>{updateProduct(product?.product.id,product?.count-1)}}
                                  type="button"
                                  className="disabled:cursor-not-allowed inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                >
                                  <svg
                                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 2"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M1 1h16"
                                    />
                                  </svg>
                                </button>
                                <p className="mx-2">{product?.count}</p>
                                <button
                                  onClick={()=>{updateProduct(product?.product.id,product?.count+1)}}
                                  type="button"
                                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                >
                                  <svg
                                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 1v16M1 9h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-gray-900 dark:text-white">
                                  {product?.price * product?.count}EGP
                                </p>
                              </div>
                            </div>
                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                              <a
                                href="#"
                                className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                              >
                                {product?.product.title}
                              </a>
                              <div className="flex items-center gap-4">

                                <button
                                  type="button"
                                  className="inline-flex items-center text-2xl font-medium text-red-600 hover:underline dark:text-red-500"
                                  onClick={()=>{deleteItem(product?.product._id)}}
                                >
                                  <FaTrashCan />

                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : "No Products Found"}
                </div>
              </div>
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order summary
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Original price
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {cartData?.totalCartPrice ? cartData?.totalCartPrice : "0"}
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Tax
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          0EGP
                        </dd>
                      </dl>
                    </div>
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        {cartData?.totalCartPrice ? cartData?.totalCartPrice : "0"}
                      </dd>
                    </dl>
                  </div>
                  <button className="btn w-full">Proceed to Checkout</button>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {" "}
                      or{" "}
                    </span>
                    <Link
                      to={"/"}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                    >
                      Continue Shopping
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> :<Loader/>}


    </div>
  );
}

export default Cart;
