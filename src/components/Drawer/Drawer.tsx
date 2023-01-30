import { style } from '@mui/system'
import { NavLink } from 'react-router-dom'
import styles from '../Drawer/Drawer.module.scss'

export const Drawer = () => {
    return (

        <div className={styles.drawerContainer}>
            <div className={styles.backgroundColor}>         
                <div className={styles.navlinksContainer}>
                    <NavLink 
                        className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                        to="/tables" end
                        >Tables for the next meeting
                    </NavLink>

                    <NavLink 
                        className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                        to="/" end
                        >Upcoming events
                    </NavLink>
                </div>           
            </div>
        </div>

    )
}