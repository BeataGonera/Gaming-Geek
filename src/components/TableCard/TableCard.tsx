import styles from '../TableCard/TableCard.module.scss'
import { FC } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'

interface Table{
    createdBy: string;
    createdByUserID: string;
    description: string;
    game: string;
    picture: string;
    players: string[];
}


interface CardProps{
    table: Table
}


export const TableCard:FC<CardProps> = ({table}) => {

    const {user} = useAuthContext()


    const handleClick = async () => {
        const tableRef = doc(db, 'users', `${table.createdByUserID}`)

        const newPlayers: string[] = []
        
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

        await updateDoc(tableRef, {
            table: {
                createdBy: table.createdBy,
                createdByUserID: table.createdByUserID,
                description: table.description,
                game: table.game,
                picture: table.picture,
                players: newPlayers
            }
          });
    }


    return ( 
        <div className={styles.cardContainer}>
            <div className={styles.picture}><img src={table.picture}/></div>
            <div className={styles.description}>
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
                    onClick={handleClick}>
                    <AddRoundedIcon/>
                    Count me in
                </button>
            </div>
        </div>
     );
}
 
