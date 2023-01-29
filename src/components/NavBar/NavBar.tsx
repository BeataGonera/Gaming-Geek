import styles from '../NavBar/NavBar.module.scss'

export const NavBar = () => {

    return(
        <nav>
            <div className={styles.navbar}>
                <div className={styles.logoAndTitle}>Gaming Geek</div>
                <div className={styles.avatarAndLogoutButton}>
                    <button>Log out</button>
                </div>
            </div>
        </nav>
    )
}