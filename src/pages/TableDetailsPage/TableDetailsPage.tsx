import { FC } from 'react'
import { NavBar } from '../../components/NavBar/NavBar'
import { Drawer } from '../../components/Drawer/Drawer'
import { MembersContainer  } from '../../components/MembersContainer/MembersContainer'
import styles from '../TableDetailsPage/TableDetailsPage.module.scss'
import { TableDetailsBody } from './TableDetailsBody/TableDetailsBody'
import { useParams } from 'react-router-dom'



export const TableDetails = () => {

    let {tableKey} = useParams()

    return (
    <div className={styles.tableDetailsPageContainer}>
        <NavBar/>
            <div className={styles.drawerBodyMembers}>
                <Drawer/>
                <TableDetailsBody tableKey={tableKey}/>
                <MembersContainer/>
            </div>

    </div>
    )
}