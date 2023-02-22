import React, {useState, FC} from "react"
import styles from '../BoardGamesSearchBar/BoardGamesSearchBar.module.scss'
import SearchIcon from '@mui/icons-material/Search';

interface Boardgame{
    name: string;
    picture: string;
    description: string;
    players: number;
}

interface BoardGamesSearchBarProps{
    setFetchedGames: (boardgames: Boardgame[] | null) => void;
    setIsPending: (isPending: boolean) => void;
    setError: (error: string | null) => void;
}

export const BoardGamesSearchBar:FC<BoardGamesSearchBarProps> = ({setFetchedGames, setIsPending, setError}) => {

    const [searchedGame, setSearchedGame] = useState<string | null>(null)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchedGame(e.target.value)
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        setFetchedGames(null)
        setError(null)
        setIsPending(true)
        const fetchedGames = []
        try{
            const response = await fetch(`https://api.boardgameatlas.com/api/search?name=${searchedGame}&client_id=JLBr5npPhV`)
            const data = await response.json()
            for(let i = 0; i < 10; i++){
                if(data.games[i].max_players && fetchedGames.length < 6){
                fetchedGames.push({
                    name: data.games[i].name,
                    picture: data.games[i].images.large,
                    description: data.games[i].description_preview,
                    players: data.games[i].max_players
                })
                }
            }
            setFetchedGames(fetchedGames)
            setIsPending(false)
            console.log(data)
        }catch(error: any){
            console.log(error)
            setIsPending(false)
            setError(error)
        }
    }

    return ( 
        
        <div className={styles.searchBoardGamesFormContainer}>
            <form onSubmit={handleSubmit} className={styles.searchBoardGamesForm}>
                <label htmlFor="search-input">What game would you like to play?</label>
                <input 
                    id="search-input"
                    placeholder="Settlers of Cathan" 
                    onChange={handleChange} 
                    required
                    className={styles.searchInput}/>
                <button type='submit' className={styles.boardGamesSearchButton}><SearchIcon/>Search</button>
            </form>
        </div>
        
     );
}
 
