import styles from "./CheckOut.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Await, useLocation, useNavigate } from "react-router-dom";
function CheckOut() {
    const {cashOnDelivery,setNumOfCartItem,setCartId,onlinePayment} = useContext(CartContext);
    const navigate = useNavigate();
    const method = useLocation();
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };
  const validationSchema = Yup.object({
    details: Yup.string().required(),
    phone: Yup.string()
      .required()
      .matches(/^01[0125][1-9]{8}$/, "Phone is not valid"),
    city: Yup.string().required(),
  });
  async function handleSubmit(data) {
    if (method.state == "online") {
        
        let res = await onlinePayment({shippingAddress:data});
        if (res.data.status == "success") {
            window.location.href = res.data.session.url;
        }
    }else{

        let res = await cashOnDelivery({shippingAddress:data});
        if (res.data.status === "success") {
            navigate('/allorders')
            setNumOfCartItem(0);
            setCartId(null);
        }
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              CheckOut :
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="details"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  details :
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.details}
                  type="text"
                  name="details"
                  id="details"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  onBlur={formik.handleBlur}
                />
                {formik.errors.details && formik.touched.details && (
                  <small className="text-red-600">{formik.errors.details}</small>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  phone :
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="tel"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <small className="text-red-600">{formik.errors.phone}</small>
                )}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  city :
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  type="text"
                  name="city"
                  id="city"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onBlur={formik.handleBlur}
                />
                {formik.errors.city && formik.touched.city && (
                  <small className="text-red-600">
                    {formik.errors.city}
                  </small>
                )}
              </div>
              <button type="submit" className="btn w-full">Order</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckOut;
