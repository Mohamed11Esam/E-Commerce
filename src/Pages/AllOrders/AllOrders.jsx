import { CartContext } from '../../Context/CartContext';
import styles from './Orders.module.css'
import {jwtDecode} from 'jwt-decode';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Loader from '../../Components/Loader/Loader';
import noProducts from '../../assets/images/Empty-Orders.bb268bb96fb25e2531ada376677c07da.svg'

function Orders() {
      const [orders, setOrders] = useState([]);
      const {getLoggedUserOrders} = useContext(CartContext);
      const [loading, setLoading] = useState(true);

    async function getData(userId) {
        setLoading(false);
        let data = await getLoggedUserOrders(userId);
        setOrders(data);
        setLoading(true);
      }
      useEffect(() => {
        getData(jwtDecode(localStorage.getItem('token')).id);
      }, [])

    return (<>{loading ? <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div className="mx-auto max-w-5xl">
        <h2 className='text-2xl font-semibold'>Orders :</h2>

      <div className="mt-6 flow-root sm:mt-8">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">

                  {orders?.length > 0 ? orders?.map((product) => (
                        <div key={product.id} className="flex flex-wrap items-center gap-y-4 py-6">
                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Payment Method:</dt>
                          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            {product.paymentMethodType}
                          </dd>
                        </dl>
                       
                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{product.createdAt.split("T")[0]}</dd>
                        </dl>
                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{product.totalOrderPrice} EGP</dd>
                        </dl>
                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                          <dd className="mt-1.5 font-semibold text-gray-900 text-sm dark:text-white">
                            {product._id}
                          </dd>
                        </dl>

                      </div>
                      ))
                    : <img src={noProducts} className="w-1/3" alt="" />}
        </div>
      </div>

    </div>
  </div>
</section>:<Loader/>}
</>

    )
}

export default Orders
