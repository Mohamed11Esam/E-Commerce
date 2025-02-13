import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader/Loader";
import { useParams } from 'react-router-dom';
function Brands() {
    const { id } = useParams();
    function getBrand() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      }
      const { data, isLoading } = useQuery({
        queryKey: ["brand"],
        queryFn: getBrand,
      });
      console.log(data)
    return (
        <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
  
          <div className="row justify-center items-center my-4">
            <div className="w-1/2 flex flex-col gap-2 items-center"><img className="w-[250px] border-2 border-green-600" src={data.data.data.image} /><h2 className="text-center text-2xl font-semibold ">{data.data.data.name}</h2></div>
          </div>
          </>
        )}
      </>
    )
}

export default Brands
