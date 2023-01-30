import styles from '../TablesPage/TablesPage.module.scss'
import { Drawer } from '../../components/Drawer/Drawer'
import { NavBar } from "../../components/NavBar/NavBar"

export const TablesPage = () => {

    return (
        <div className={styles.tablesPageContainer}>
            <NavBar/>
            <Drawer/>
        </div>
    )
}