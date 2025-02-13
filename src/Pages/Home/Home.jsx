import BrandSlider from '../../Components/BrandsSlider/BrandsSlider';
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import LatestProducts from '../../Components/LatestProducts/LatestProducts'
import MainSlider from '../../Components/MainSlider/MainSlider'
import styles from './Home.module.css'
import {Helmet} from "react-helmet";
import { tokenContext } from './../../Context/TokenContext';
import { useContext, useEffect } from 'react';
function Home() {
    const {token} = useContext(tokenContext);
    function setToken(token) {
        localStorage.setItem('token',token);
    }
    useEffect(() => {
        setToken(token);
    }, [])
    
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <MainSlider/>
            <CategorySlider/>
           <BrandSlider/>
           <LatestProducts/>
        </div>
    )
}

export default Home
