import styles from '../TablesBody/TablesBody.module.scss'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { rtDatabase } from '../../../firebase/config'
import { TableCard } from '../../../components/TableCard/TableCard'
import { ref, onValue} from "firebase/database";
import { Table } from '../../../assets/Typescript/interfaces';


export const TablesBody = () => {

    const navigate = useNavigate()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [tables, setTables] = useState<Table[] | null>(null)
    const [tableChanged, setTableChanged] = useState(false)
    const tablesRef = ref(rtDatabase, 'tables')


    const fetchTables = async () => {
        const tables: Table[] = []
        setIsPending(true)
        onValue(tablesRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key
            const childData = childSnapshot.val()
            tables.push({
                key: childKey,
                createdBy: childData.createdBy,
                createdByUserID: childData.createdByUserID,
                description: childData.description,
                game: childData.game,
                picture: childData.picture,
                players: childData.players
            })
          })
          setTables(tables)
          setIsPending(false)
        }, {onlyOnce: true})
    }


    useEffect(() => {
        fetchTables()
    },[tableChanged])


    return (
        <div className={styles.tablesBodyContainer}>
            <div className={styles.header}><h3>Tables</h3></div>
            <div className={styles.fetchedTablesContainer}>
                {tables && tables.map((table, index) => (
                   <TableCard key={index} table={table} setTableChanged={setTableChanged}/>
            ))}
            </div>

            <button 
                className={styles.createNewTableButton}
                onClick={()=>navigate('/add-table')}>
                    Create a new table <AddRoundedIcon style={{marginLeft: '5px'}}/>
            </button>
        </div>


    )
}