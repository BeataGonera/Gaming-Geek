import styles from '../SearchedBoardGamesCard/SearchedBoardGamesCard.module.scss'
import { FC } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'


interface CardProps{
    fetchedGame: {
        name: string;
        picture: string;
        description: string;
        players: number[];
    }
}

export const SearchedBoardGamesCard:FC<CardProps> = ({fetchedGame}) => {
    return ( 
        <div className={styles.cardContainer}>
            <div className={styles.picture}><img src={fetchedGame.picture}/></div>
            <div className={styles.description}>
                <h3>{fetchedGame.name}</h3>
                <div>{fetchedGame.description}</div>
            </div>
            <div className={styles.membersAndActionButtonContainer}>
                <div className={styles.playersContainer}>
                    {fetchedGame.players && fetchedGame.players.map((player) => (
                        <img src="/avatar.jpeg"/>
                    ))}
                </div>
                <button className={styles.createATableButton}><AddRoundedIcon/>Create a table</button>
            </div>
        </div>
     );
}
 