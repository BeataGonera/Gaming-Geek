import styles from '../AddTable/AddTable.module.scss'
import { NavBar } from '../../components/NavBar/NavBar'
import { Drawer } from '../../components/Drawer/Drawer'
import { AddTableBody } from '../AddTable/AddTableBody/AddTableBody'
import { MembersContainer } from '../../components/MembersContainer/MembersContainer' 
import { BottomNavigation } from '../../components/BottomNavigation/BottomNavigation'

export const AddTable = () => {
    return ( 
        <div>
        <div className={styles.addTablePageContainer}>
            <NavBar/>
            <div className={styles.drawerBodyMembers}>
                <Drawer/>
                <AddTableBody/>
                <MembersContainer/>
            </div>
        </div>

        <div className={styles.addTablePageContainerMobile}>
            <BottomNavigation/>
            <AddTableBody/>
        </div>
        </div>
     );
}
 
