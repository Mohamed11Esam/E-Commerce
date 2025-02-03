import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import NavBar from '../../Components/NavBar/NavBar'
import styles from './MainLayout.module.css'
function MainLayout() {
    return (
        <div>
            <NavBar/>
            <div className="container">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}

export default MainLayout
