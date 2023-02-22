import styles from '../TablesBody/TablesBody.module.scss'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { TableCard } from '../../../components/TableCard/TableCard'

interface Table{
    createdBy: string;
    createdByUserID: string;
    description: string;
    game: string;
    picture: string;
    players: string[];
}

export const TablesBody = () => {

    const navigate = useNavigate()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [tables, setTables] = useState<Table[] | null>(null)


    const fetchTables = () => {
        setIsPending(true)
        const membersCollection = query(collection(db, 'users'))
        const unsubscribe = onSnapshot(membersCollection, (querySnapshot) => {
            const tables:Table[] = []
            querySnapshot.forEach((doc) => {
                if(doc.data().table){
                    tables.push({
                     createdBy: doc.data().table.createdBy,
                     createdByUserID: doc.data().table.createdByUserID,
                     description: doc.data().table.description,
                     game: doc.data().table.game,
                     picture: doc.data().table.picture,
                     players: doc.data().table.players
                    })
            }})
            setTables(tables)
        }, (error) => {
            setError(error.message)
            setIsPending(false)
        })

        return () => unsubscribe()
    }

    useEffect(() => {
        fetchTables()
    },[])


    return (
        <div className={styles.tablesBodyContainer}>
            <div className={styles.header}><h3>Tables</h3></div>
            <div className={styles.fetchedTablesContainer}>
                {tables && tables.map((table, index) => (
                   <TableCard key={index} table={table}/>
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