import styles from '../TableDetailsBody/TableDetailsBody.module.scss'
import { FC, useEffect, useState } from 'react'
import { get, child, ref, getDatabase, update } from 'firebase/database'
import { rtDatabase } from '../../../firebase/config'
import { Table } from '../../../assets/Typescript/interfaces'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { updatePlayersArray } from '../../../functions/updatePlayersArray' 
import { useAuthContext } from '../../../hooks/useAuthContext'

interface TableDetailsBodyProps{
    tableKey: string | undefined;
}


export const TableDetailsBody:FC<TableDetailsBodyProps> = ({tableKey}) => {

    const dbRef = ref(getDatabase())
    const [tableDetails, setTableDetails] = useState<null | Table>(null)
    const [tableChanged, setTableChanged] =  useState(false)
    const newPlayers: string[] = []
    const { user } = useAuthContext()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)


    const getTableDetails = () => {
        get(child(dbRef, `tables/${tableKey}`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val()
              setTableDetails({
                key: snapshot.key,
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
    },[tableChanged])

        

  const AddPlayerToTable = async () => {
      setIsPending(true)
      setError(null)

      updatePlayersArray(tableDetails, newPlayers, user.photoURL)
      console.log(tableDetails)

      try{
          const updates = {} as any
          const playersData = newPlayers
          console.log(tableDetails?.key)
          updates['/tables/' + tableDetails?.key + '/' + 'players'] = playersData
          setIsPending(false)
          setTableChanged((current: boolean) => !current)
          return update(ref(rtDatabase), updates)
      }catch(error){
          console.log(error)
          setIsPending(false)
      } 
      
  }

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
                  <div className={styles.gameDescriptionAndPlayers}>
                    <div className={styles.gamePlayers}>
                    {tableDetails.players && tableDetails.players.map((player, index) => (
                        <img src={player} key={index}/>
                    ))}
                    </div>
                    <textarea className={styles.gameDescription}>{tableDetails.description}</textarea>
                  </div>
                </div>
              </div>
             }
          <button onClick={() => AddPlayerToTable()}><AddRoundedIcon style={{marginRight: '5px'}}/>Count me in</button>
        </div>
     )
}
 
