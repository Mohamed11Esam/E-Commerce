import { createContext } from "react";
import { useState } from "react";

export const tokenContext = createContext();

export default function TokenContextProvder({children}){
     const [token, setToken] = useState(localStorage.getItem('token'))

    return(
        <tokenContext.Provider value={{token,setToken}}>
            {children}
        </tokenContext.Provider>
    )

}