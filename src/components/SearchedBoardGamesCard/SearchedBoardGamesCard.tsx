import styles from '../SearchedBoardGamesCard/SearchedBoardGamesCard.module.scss'
import { FC } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useAuthContext } from '../../hooks/useAuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'


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
    const fetchedGamePlayers:number[] = []

    for(let i=0; i<fetchedGame.players; i++){
        fetchedGamePlayers.push(i)
    }

    const handleClick = async () => {
        try{
            const userDocumentRef = doc(db, "users", user.uid)
            await updateDoc(userDocumentRef, {table: {
                createdBy: user.displayName,
                game: fetchedGame.name,
                picture: fetchedGame.picture, 
                description: fetchedGame.description,
                players: fetchedGamePlayers
            }})
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
                        <img src="/avatar.jpeg" key={index}/>
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
 