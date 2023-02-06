import React, {useState, FC} from "react"
import styles from '../BoardGamesSearchBar/BoardGamesSearchBar.module.scss'
import SearchIcon from '@mui/icons-material/Search';

interface Boardgame{
    name: string;
    picture: string;
    description: string;
    players: number[];
}

interface BoardGamesSearchBarProps{
    setFetchedGame: (boardgame: Boardgame) => void;
}

export const BoardGamesSearchBar:FC<BoardGamesSearchBarProps> = ({setFetchedGame}) => {

    const [searchedGame, setSearchedGame] = useState<string | null>(null)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchedGame(e.target.value)
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try{
            const response = await fetch(`https://api.boardgameatlas.com/api/search?name=${searchedGame}&client_id=JLBr5npPhV`)
            const data = await response.json()
            setFetchedGame({
                name: data.games[0].name,
                picture: data.games[0].images.large,
                description: data.games[0].description_preview,
                players: data.games[0].player_counts
            })
            console.log(data)
        }catch(error){
            console.log(error)
        }
    }

    return ( 
        
        <div className={styles.searchBoardGamesFormContainer}>
            <p>What game would you like to play?</p>
            <form onSubmit={handleSubmit} className={styles.searchBoardGamesForm}>
                <input 
                    placeholder="Settlers of Cathan" 
                    onChange={handleChange} 
                    required
                    className={styles.searchInput}/>
                <button type='submit' className={styles.boardGamesSearchButton}><SearchIcon/>Search</button>
            </form>
        </div>
        
     );
}
 
