import styles from '../TableDetailsBody/TableDetailsBody.module.scss'
import { FC, useEffect, useState } from 'react'
import { get, child, ref, getDatabase, update } from 'firebase/database'
import { rtDatabase } from '../../../firebase/config'
import { Table, Player } from '../../../assets/Typescript/interfaces'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import { updatePlayersArrayAdd } from '../../../functions/updatePlayersArrayAdd'
import { updatePlayersArrayRemove } from '../../../functions/updatePlayersArrayRemove' 
import { useAuthContext } from '../../../hooks/useAuthContext'

interface TableDetailsBodyProps{
    tableKey: string | undefined;
}


export const TableDetailsBody:FC<TableDetailsBodyProps> = ({tableKey}) => {

    const dbRef = ref(getDatabase())
    const [tableDetails, setTableDetails] = useState<null | Table>(null)
    const [tableChanged, setTableChanged] =  useState(false)
    const newPlayers: Player[] = []
    const { user } = useAuthContext()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const duplicatedPlayer = tableDetails?.players.find(object => object.playerUID === user.uid)

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

      updatePlayersArrayAdd(tableDetails, newPlayers, user.uid, user.displayName, user.photoURL)

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

  const RemovePlayerFromTable = async () => {
    setIsPending(true)
      setError(null)

      updatePlayersArrayRemove(tableDetails, newPlayers, user.uid, user.displayName, user.photoURL)

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
                      <div key={index}>
                         <img src={player.playerPhotoURL}/>
                         <div className={styles.playerDisplayName}>{player.playerDisplayName}</div>
                      </div>
                    ))}
                    </div>
                    <div className={styles.gameDescription}>{tableDetails.description}</div>
                  </div>
                </div>
              </div>
             }
            { duplicatedPlayer !== undefined && <button onClick={() => RemovePlayerFromTable()}><RemoveRoundedIcon style={{marginRight: '5px'}}/>Count me out</button>}
            { duplicatedPlayer === undefined && <button onClick={() => AddPlayerToTable()}><AddRoundedIcon style={{marginRight: '5px'}}/>Count me in</button>}

            <section>
              <button className={styles.notificationButton}></button>
            </section>
        </div>
     )
}
 
