import styles from '../TablesBody/TablesBody.module.scss'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useNavigate } from 'react-router-dom'

export const TablesBody = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.tablesBodyContainer}>
            <div className={styles.header}><h3>Tables</h3></div>
            <button 
                className={styles.createNewTableButton}
                onClick={()=>navigate('/add-table')}>
                    Create a new table <AddRoundedIcon style={{marginLeft: '5px'}}/>
            </button>
        </div>


    )
}