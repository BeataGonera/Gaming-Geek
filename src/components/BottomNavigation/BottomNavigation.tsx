import styles from '../BottomNavigation/BottomNavigation.module.scss'
import { NavLink } from 'react-router-dom'
import TableRestaurantRoundedIcon from '@mui/icons-material/TableRestaurantRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'

export const BottomNavigation = () => {
    return (
        <nav className={styles.bottomNavigationContainer}>
            <NavLink 
                className= {({ isActive }) => (isActive ? "nav-link-mobile active-mobile" : "nav-link-mobile")} 
                to="/tables" end
                >
                <div className={styles.bottomNavigationButton}>
                    <TableRestaurantRoundedIcon/>
                    <div>Tables</div>
                </div>
            </NavLink>

            <NavLink 
                className= {({ isActive }) => (isActive ? "nav-link-mobile active-mobile" : "nav-link-mobile")} 
                to="/" end
                >
                <div className={styles.bottomNavigationButton}>
                    <CalendarMonthRoundedIcon/>
                    <div>Events</div>
                </div>
            </NavLink>
        </nav>
    ) 
} 