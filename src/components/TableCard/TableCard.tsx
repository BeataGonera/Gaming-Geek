import styles from '../TableCard/TableCard.module.scss'
import { FC } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'



interface CardProps{
    table: {
        createdBy: string;
        description: string;
        game: string;
        picture: string;
        players: number[];
    }
}

export const TableCard:FC<CardProps> = ({table}) => {


    const handleClick = () => {
        console.log('count me in')
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
                        <img src="/avatar.jpeg" key={index}/>
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
 
