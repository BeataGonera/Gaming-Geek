import styles from '../NavBar/NavBar.module.scss'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Link } from 'react-router-dom'

export const NavBar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    return(
        <nav>
            <div className={styles.navbar}>
                <div className={styles.logoAndTitle}>
                    <img src='dice.webp' width='54px' height='54px'/>
                    <div>Gaming Geek</div>
                </div>
                <div className={styles.avatarAndLogoutButton}>
                    {user && <div>Signed in as {user.displayName}</div>}
                    <button onClick={logout}>Log out</button>
                    <Link to='/settings' className={styles.settingsLink}><SettingsOutlinedIcon/></Link>
                </div>
            </div>
        </nav>
    )
}