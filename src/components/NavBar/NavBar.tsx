import styles from '../NavBar/NavBar.module.scss'
import { useLogout } from '../../hooks/useLogout'

export const NavBar = () => {

    const { logout } = useLogout()

    return(
        <nav>
            <div className={styles.navbar}>
                <div className={styles.logoAndTitle}>Gaming Geek</div>
                <div className={styles.avatarAndLogoutButton}>
                    <button onClick={logout}>Log out</button>
                </div>
            </div>
        </nav>
    )
}