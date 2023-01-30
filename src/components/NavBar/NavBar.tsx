import styles from '../NavBar/NavBar.module.scss'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

export const NavBar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    console.log(user)

    return(
        <nav>
            <div className={styles.navbar}>
                <div className={styles.logoAndTitle}>
                    <img src='dice.webp' width='54px' height='54px'/>
                    <div>Gaming Geek</div>
                </div>
                <div className={styles.avatarAndLogoutButton}>
                    {user && <div>Hello, {user.displayName}</div>}
                    <button onClick={logout}>Log out</button>
                </div>
            </div>
        </nav>
    )
}