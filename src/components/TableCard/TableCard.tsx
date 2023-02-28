import styles from '../TableCard/TableCard.module.scss'
import { FC, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { rtDatabase } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Table, Player} from '../../assets/Typescript/interfaces'
import { ref, update } from "firebase/database"
import { useNavigate } from 'react-router-dom'
import { updatePlayersArray } from '../../functions/updatePlayersArray'


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


    // onChildChanged(playersRef, (data) => {
    //   })

    const handleClick = async () => {
        setIsPending(true)
        setError(null)
       
        updatePlayersArray(table, newPlayers, user.uid, user.displayName, user.photoURL)
        console.log(newPlayers)

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
                <div>{table.description}</div>
                <p>Created by: {table.createdBy}</p>
            </div>
            <div className={styles.membersAndActionButtonContainer}>
                <div className={styles.playersContainer}>
                    {table.players && table.players.map((player, index) => (
                        <img src={player.playerPhotoURL} key={index}/>
                    ))}
                </div>
                <button 
                    className={styles.countMeInButton}
                    onClick={() => handleClick()}>
                    <AddRoundedIcon/>
                    Count me in
                </button>
            </div>
        </div>
     );
}
 
