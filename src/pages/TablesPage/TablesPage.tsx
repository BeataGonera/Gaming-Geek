import styles from '../TablesPage/TablesPage.module.scss'
import { Drawer } from '../../components/Drawer/Drawer'
import { NavBar } from "../../components/NavBar/NavBar"
import { TablesBody } from './TablesBody/TablesBody'

export const TablesPage = () => {

    return (
        <div className={styles.tablesPageContainer}>
            <NavBar/>
            <div className={styles.drawerBodyMembers}>
                <Drawer/>
                <TablesBody/>
            </div>
            
        </div>
    )
}