import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { tokenContext } from "../../Context/TokenContext";
function ForgetPassword() {
    const [accExist, setAccExist] = useState(null);
    const [isLoadingt, setIsLoadingt] = useState(false);
    const navigate = useNavigate();
    const {setToken} = useContext(tokenContext);
    async function handleForgetPassword(data) {
      setIsLoadingt(true);
      //call api
      let res = await axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", data)
        .then((response) => {
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
          navigate("/verifycode");
          setAccExist(null);
          setIsLoadingt(false);
        })
        .catch((error) => {
          setAccExist(error.response.data.message);
          setIsLoadingt(false);
        });
      console.log(accExist);
    }
    const initialValues = {
      email: "",
    };
    const validationSchema = Yup.object({
      email: Yup.string().required().email(),
    });
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: handleForgetPassword,
    });
    return (
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Forget Password :
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={formik.handleSubmit}
                >
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
    
                  {accExist && (
                    <div className="bg-red-300 p-3 rounded-md my-2">{accExist}</div>
                  )}
                  <div className="flex justify-end">
                    {isLoadingt ? (
                      <button
                        disabled
                        className=" focus:outline-none text-white bg-main  hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Loading .....
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="focus:outline-none text-white bg-main  hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Submit
                      </button>
                    )}
                  </div>

                </form>
              </div>
            </div>
          </div>
        </section>
      );
}

export default ForgetPassword
