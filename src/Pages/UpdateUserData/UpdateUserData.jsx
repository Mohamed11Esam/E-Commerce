import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { tokenContext } from "../../Context/TokenContext";
import { toast } from 'react-hot-toast';
function UpdateUserData() {
    const [isLoadingt, setIsLoadingt] = useState(false);
  const navigate = useNavigate();
  const {token} = useContext(tokenContext)
  const headers = {
    token: localStorage.getItem("token"),
  };
  async function handleUpdateUserData(values) {
    setIsLoadingt(true);
  
    // Remove empty fields
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value)
    );
  
    let res =  await axios
      .put("https://ecommerce.routemisr.com/api/v1/users/updateMe/", filteredValues, { headers })
      .then((response) => {
        console.log(response);
        toast.success("done",{position: 'top-right',});
      })
      .catch((error) => {
        toast.error("You enter the same email",{
            position: 'top-right',});
      });

  }
  const initialValues = {
    name: "",
    email: "",
    phone: "",
  };
  
  const validationSchema = Yup.object({
    name: Yup.string().max(20).min(2),
    email: Yup.string().email(),
    phone: Yup.string()
      .matches(/^01[0125][1-9]{8}$/, "Phone is not valid"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleUpdateUserData,
  });

    return (
        <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Update Your Data :
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    name :
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="FullName"
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <small className="text-red-600">{formik.errors.name}</small>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    email :
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <small className="text-red-600">{formik.errors.email}</small>
                  )}
                </div>

  

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone :
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <small className="text-red-600">{formik.errors.phone}</small>
                  )}
                </div>
                <div className="flex justify-end">
                    <button
                      type="submit"
                      className="focus:outline-none text-white bg-main  hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Update
                    </button>
                </div>
  
              </form>
            </div>
          </div>
        </div>
      </section>
    )
}

export default UpdateUserData
