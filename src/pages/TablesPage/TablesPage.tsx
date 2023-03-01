import styles from '../TablesPage/TablesPage.module.scss'
import { Drawer } from '../../components/Drawer/Drawer'
import { NavBar } from "../../components/NavBar/NavBar"
import { TablesBody } from './TablesBody/TablesBody'
import { MembersContainer } from '../../components/MembersContainer/MembersContainer'
import { BottomNavigation } from '../../components/BottomNavigation/BottomNavigation'

export const TablesPage = () => {

    return (
        <div>
            <div className={styles.tablesPageContainer}>
                <NavBar/>
                <div className={styles.drawerBodyMembers}>
                    <Drawer/>
                    <TablesBody/>
                    <MembersContainer/>
                </div> 
            </div>

            <div className={styles.tablesPageContainerMobile}>
                <BottomNavigation/>
                <TablesBody/>
            </div>
        </div>
        
    )
}