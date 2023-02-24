import styles from '../TablesBody/TablesBody.module.scss'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { rtDatabase } from '../../../firebase/config'
import { TableCard } from '../../../components/TableCard/TableCard'
import { ref, onValue} from "firebase/database";
import { Table } from '../../../assets/Interfaces/interfaces';


export const TablesBody = () => {

    const navigate = useNavigate()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [tables, setTables] = useState<Table[] | null>(null)
    const [tablesKeys, setTablesKeys] = useState<string[] | null>(null)

    const fetchTables = async () => {
        const tables: Table[] = []
        setIsPending(true)
        const tablesRef = ref(rtDatabase, 'tables')
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
          console.log(tables)
          setIsPending(false)
        })
    }


    // const fetchTables = () => {
    //     setIsPending(true)
    //     const membersCollection = query(collection(db, 'users'))
    //     const unsubscribe = onSnapshot(membersCollection, (querySnapshot) => {
    //         const tables:Table[] = []
    //         querySnapshot.forEach((doc) => {
    //             if(doc.data().table){
    //                 tables.push({
    //                  createdBy: doc.data().table.createdBy,
    //                  createdByUserID: doc.data().table.createdByUserID,
    //                  description: doc.data().table.description,
    //                  game: doc.data().table.game,
    //                  picture: doc.data().table.picture,
    //                  players: doc.data().table.players
    //                 })
    //         }})
    //         setTables(tables)
    //     }, (error) => {
    //         setError(error.message)
    //         setIsPending(false)
    //     })

    //     return () => unsubscribe()
    // }

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