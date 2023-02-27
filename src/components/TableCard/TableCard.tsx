import styles from '../TableCard/TableCard.module.scss'
import { FC, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { rtDatabase } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Table } from '../../assets/Typescript/interfaces'
import { ref, child, push, update, onChildChanged } from "firebase/database";
import { useNavigate } from 'react-router-dom'



interface CardProps{
    table: Table;
    setTableChanged: any;
}


export const TableCard:FC<CardProps> = ({table, setTableChanged}) => {

    const {user} = useAuthContext()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const newPlayers: string[] = []
    const playersRef = ref(rtDatabase, '/tables/' + table.key)
    const navigate = useNavigate()


    // onChildChanged(playersRef, (data) => {
    //   })

    const updatePlayersArray = () => {
        
        table.players.forEach(player => {
            if(player !== '/avatar.jpeg'){
                newPlayers.push(player)
            }
            else if(player === '/avatar.jpeg' && !newPlayers.includes(user.photoURL)){
                newPlayers.push(user.photoURL)
            }else{
                newPlayers.push('/avatar.jpeg')
            }
        })    
    }

    const handleClick = async () => {
        setIsPending(true)
        setError(null)
       
        updatePlayersArray()

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
                        <img src={player} key={index}/>
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
 
