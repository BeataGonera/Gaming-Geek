import { style } from '@mui/system'
import { NavLink } from 'react-router-dom'
import styles from '../Drawer/Drawer.module.scss'
import { useTheme } from '../../hooks/useTheme'

export const Drawer = () => {

    const {color, changeColor} = useTheme()

    return (

        <div className={styles.drawerContainer}>
            <div className={styles.backgroundColor} style={{backgroundColor: `${color}`, opacity:'0.8'}}>         
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

                <div className={styles.themeButtons}>
                    <button className={styles.themeButton} style={{background: '#5E0060'}} onClick={()=>changeColor('#5E0060')}></button>
                    <button className={styles.themeButton} style={{background: '#003416'}} onClick={()=>changeColor('#003416')}></button>
                    <button className={styles.themeButton} style={{background: 'black'}} onClick={()=>changeColor('black')}></button>
                </div>    
            </div>
        </div>

    )
}