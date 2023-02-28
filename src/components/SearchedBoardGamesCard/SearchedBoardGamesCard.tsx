import styles from '../SearchedBoardGamesCard/SearchedBoardGamesCard.module.scss'
import { FC } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { rtDatabase } from '../../firebase/config'
import { ref, push, set } from "firebase/database"
import { Player } from '../../assets/Typescript/interfaces'



interface CardProps{
    fetchedGame: {
        name: string;
        picture: string;
        description: string;
        players: number;
    }
}

export const SearchedBoardGamesCard:FC<CardProps> = ({fetchedGame}) => {

    const { user } = useAuthContext()
    const navigate = useNavigate()
    const fetchedGamePlayers:Player[] = []

    for(let i=0; i<fetchedGame.players; i++){
        fetchedGamePlayers.push({playerUID: '', playerPhotoURL: `/avatar.jpeg`})
    }

    const handleClick = async () => {

        try{
            const tableListRef = ref(rtDatabase, 'tables')
            const newTableRef = push(tableListRef)
            set(newTableRef, {
                createdBy: user.displayName,
                createdByUserID: user.uid,
                game: fetchedGame.name,
                picture: fetchedGame.picture, 
                description: fetchedGame.description,
                players: fetchedGamePlayers
            })
            navigate('/tables')
        }catch(error){
            console.log(error)
        }
    }

    return ( 
        <div className={styles.cardContainer}>
            <div className={styles.picture}><img src={fetchedGame.picture}/></div>
            <div className={styles.description}>
                <h3>{fetchedGame.name}</h3>
                <div>{fetchedGame.description}</div>
            </div>
            <div className={styles.membersAndActionButtonContainer}>
                <div className={styles.playersContainer}>
                    {fetchedGame.players && fetchedGamePlayers.map((player, index) => (
                        <img src={player.playerPhotoURL} key={index}/>
                    ))}
                </div>
                <button 
                    className={styles.createATableButton}
                    onClick={handleClick}>
                    <AddRoundedIcon/>
                    Create a table
                </button>
            </div>
        </div>
     );
}
 