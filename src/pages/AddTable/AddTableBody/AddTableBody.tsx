import { BoardGamesSearchBar } from '../../../components/BoardGamesSearchBar/BoardGamesSearchBar';
import styles from '../AddTableBody/AddTableBody.module.scss'

export const AddTableBody = () => {
    return ( 
        <div className={styles.addTableBodyContainer}>
        <div className={styles.header}><h3>Add a new table</h3></div>
        <BoardGamesSearchBar/>
        </div>
     );
}
 