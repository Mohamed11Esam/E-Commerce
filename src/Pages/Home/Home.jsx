import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import LatestProducts from '../../Components/LatestProducts/LatestProducts'
import MainSlider from '../../Components/MainSlider/MainSlider'
import styles from './Home.module.css'
import {Helmet} from "react-helmet";
function Home() {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <MainSlider/>
            <CategorySlider/>
           <LatestProducts/>
        </div>
    )
}

export default Home
