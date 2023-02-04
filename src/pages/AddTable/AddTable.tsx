import styles from '../AddTable/AddTable.module.scss'
import { NavBar } from '../../components/NavBar/NavBar'
import { Drawer } from '../../components/Drawer/Drawer'
import { AddTableBody } from '../AddTable/AddTableBody/AddTableBody'
import { MembersContainer } from '../../components/MembersContainer/MembersContainer' 

export const AddTable = () => {
    return ( 
        <div className={styles.addTablePageContainer}>
            <NavBar/>
            <div className={styles.drawerBodyMembers}>
                <Drawer/>
                <AddTableBody/>
                <MembersContainer/>
            </div>

        </div>
     );
}
 
