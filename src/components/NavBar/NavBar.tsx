import styles from '../NavBar/NavBar.module.scss'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Link } from 'react-router-dom'

export const NavBar = () => {

    const { logout } = useLogout()
    const { user, authIsReady } = useAuthContext()

    return(
        <nav>
            <div className={styles.navbar}>
                <div className={styles.logoAndTitle}>
                    <Link to='/tables'><img src='dice.webp' width='54px' height='54px'/></Link>
                    <div>Gaming Geek</div>
                </div>
                <div className={styles.avatarAndLogoutButton}>
                    {user && 
                    <div className={styles.userInfoContainer}>
                         <img src={user.photoURL} className={styles.photo}/>
                         <span>Signed in as {user.displayName}</span>
                    </div>
                    }
                    <button onClick={logout} className={styles.logoutButton}>Log out</button>
                    <Link to='/settings' className={styles.settingsLink}><SettingsOutlinedIcon/></Link>
                </div>
            </div>
        </nav>
    )
}