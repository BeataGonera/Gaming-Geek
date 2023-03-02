import { NavBar } from '../../components/NavBar/NavBar'
import { Drawer } from '../../components/Drawer/Drawer'
import { MembersContainer  } from '../../components/MembersContainer/MembersContainer'
import styles from '../TableDetailsPage/TableDetailsPage.module.scss'
import { TableDetailsBody } from './TableDetailsBody/TableDetailsBody'
import { useParams } from 'react-router-dom'
import { BottomNavigation } from '../../components/BottomNavigation/BottomNavigation'
import { NavBarMobile } from '../../components/NavBarMobile/NavBarMobile'



export const TableDetails = () => {

    let {tableKey} = useParams()

    return (
        <div>
            <div className={styles.tableDetailsPageContainer}>
                <NavBar/>
                <div className={styles.drawerBodyMembers}>
                <Drawer/>
                <TableDetailsBody tableKey={tableKey}/>
                <MembersContainer/>
                </div>
            </div>

            <div className={styles.tableDetailsPageContainerMobile}>
                <NavBarMobile/>
                <TableDetailsBody tableKey={tableKey}/>
                <BottomNavigation/>

            </div>
        </div>
    )
}