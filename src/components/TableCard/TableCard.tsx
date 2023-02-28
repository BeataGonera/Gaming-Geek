import styles from '../TableCard/TableCard.module.scss'
import { FC, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import { rtDatabase } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Table, Player} from '../../assets/Typescript/interfaces'
import { ref, update } from "firebase/database"
import { useNavigate } from 'react-router-dom'
import { updatePlayersArrayAdd } from '../../functions/updatePlayersArrayAdd'
import { updatePlayersArrayRemove } from '../../functions/updatePlayersArrayRemove'


interface CardProps{
    table: Table;
    setTableChanged: any;
}


export const TableCard:FC<CardProps> = ({table, setTableChanged}) => {

    const {user} = useAuthContext()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const newPlayers: Player[] = []
    const playersRef = ref(rtDatabase, '/tables/' + table.key)
    const navigate = useNavigate()
    let truncatedGameDescription = ''


    // onChildChanged(playersRef, (data) => {
    //   })

    if(table.description.length > 100){
        truncatedGameDescription = table.description.slice(0, 100) + ' ...'
    }

    const duplicatedPlayer = table?.players.find(object => object.playerUID === user.uid)

    const AddPlayerToTable = async () => {
        setIsPending(true)
        setError(null)
       
        updatePlayersArrayAdd(table, newPlayers, user.uid, user.displayName, user.photoURL)

        try{
            const updates = {} as any
            const playersData = newPlayers
            updates['/tables/' + table.key + '/' + 'players'] = playersData
            setIsPending(false)
            setTableChanged((current: boolean) => !current)
            return update(ref(rtDatabase), updates)
        }catch(error){
            console.log(error)
            setIsPending(false)
        } 
    }

    const RemovePlayerFromTable = () => {
        setIsPending(true)
        setError(null)
       
        updatePlayersArrayRemove(table, newPlayers, user.uid, user.displayName, user.photoURL)

        try{
            const updates = {} as any
            const playersData = newPlayers
            updates['/tables/' + table.key + '/' + 'players'] = playersData
            setIsPending(false)
            setTableChanged((current: boolean) => !current)
            return update(ref(rtDatabase), updates)
        }catch(error){
            console.log(error)
            setIsPending(false)
        } 
    }


    return ( 
        <div className={styles.cardContainer}>
            <div className={styles.picture} onClick={() => navigate(`/table-details/${table.key}`)}><img src={table.picture}/></div>
            <div className={styles.description} onClick={() => navigate(`/table-details/${table.key}`)}>
                <h3>{table.game}</h3>
                <div>{truncatedGameDescription}</div>
                <p>Created by: {table.createdBy}</p>
            </div>
            <div className={styles.membersAndActionButtonContainer}>
                <div className={styles.playersContainer}>
                    {table.players && table.players.map((player, index) => (
                        <img src={player.playerPhotoURL} key={index}/>
                    ))}
                </div>
                {duplicatedPlayer !== undefined && <button className={styles.countMeInButton} onClick={() => RemovePlayerFromTable()}><RemoveRoundedIcon style={{marginRight: '5px'}}/>Count me out</button>}
                {duplicatedPlayer === undefined && <button className={styles.countMeInButton} onClick={() => AddPlayerToTable()}><AddRoundedIcon style={{marginRight: '5px'}}/>Count me in</button>}
            </div>
        </div>
     );
}
 
