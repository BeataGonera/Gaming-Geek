import styles from '../NavBarMobile/NavBarMobile.module.scss'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { useNavigate } from 'react-router-dom'

export const NavBarMobile = () => {

    const navigate = useNavigate()

    return(
        <div className={styles.backgroundPicture}>
            <div className={styles.navBarMobileContainer}>
                <div className={styles.navBarMobileWrapper}>
                    <img src='/dice.webp' onClick={() => navigate('/tables') }/>
                    <div>Gaming Geek</div>
                    <div><MenuRoundedIcon/></div>
                </div>
            </div>
        </div>
    )
}