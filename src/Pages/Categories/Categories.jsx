import axios from "axios";
import styles from "./Categories.module.css";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader/Loader";
function Categories() {
  function getCatrgories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCatrgories,
  });
  return (
    <>
      <Helmet>
        <title>categories</title>
      </Helmet>
      <h2 className="text-2xl font-semibold my-2">categories</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row">
          {data?.data?.data.map((category) => (
            <div key={category._id} className="w-1/5 p-3">
              <div className="">
                <img
                  src={category.image}
                  className="w-full h-[400px]"
                  alt={category.name}
                />
                <h4 className="font-semibold m-3">{category.name}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Categories;
