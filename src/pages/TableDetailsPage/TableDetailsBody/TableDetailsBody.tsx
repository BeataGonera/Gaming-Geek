import styles from '../TableDetailsBody/TableDetailsBody.module.scss'
import { FC, useEffect, useState } from 'react'
import { get, child, ref, getDatabase } from 'firebase/database'
import { Table } from '../../../assets/Typescript/interfaces'

interface TableDetailsBodyProps{
    tableKey: string | undefined
}


export const TableDetailsBody:FC<TableDetailsBodyProps> = ({tableKey}) => {

    const dbRef = ref(getDatabase())
    const [tableDetails, setTableDetails] = useState<null | Table>(null)

    const getTableDetails = () => {
        get(child(dbRef, `tables/${tableKey}`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val()
              setTableDetails({
                key: data.key,
                createdBy: data.createdBy,
                createdByUserID: data.createdByUserID, 
                description: data.description,
                game: data.game,
                picture: data.picture,
                players: data.players
              })
            } else {
              console.log("No data available")
            }
          }).catch((error) => {
            console.error(error)
          });
    }

    useEffect(() => {
        getTableDetails()
    },[])

    return ( 
        <div className={styles.tableDetailsBodyContainer}>
            {tableDetails && 
              <div className={styles.header}><h3>{`${tableDetails.game} Table`}</h3></div>
            }
             {tableDetails && 
              <div className={styles.tableDetailsContainer}>
                <div className={styles.gameDetailsContainer}>
                  <div className={styles.pictureContainer}>
                    <img src={tableDetails.picture}/>
                  </div>
                  <div className={styles.gameDescription}>{tableDetails.description}</div>
                </div>
                
              </div>
            }

        </div>
     )
}
 
