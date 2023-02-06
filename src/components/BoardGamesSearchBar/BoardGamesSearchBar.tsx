import React, {useState} from "react"
import styles from '../BoardGamesSearchBar/BoardGamesSearchBar.module.scss'
import SearchIcon from '@mui/icons-material/Search';

export const BoardGamesSearchBar = () => {

    const [searchedGame, setSearchedGame] = useState<string | null>(null)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchedGame(e.target.value)
        console.log(e.target.value)
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try{
            const response = await fetch(`https://api.boardgameatlas.com/api/search?name=${searchedGame}&client_id=JLBr5npPhV`)
            const data = await response.json()
            console.log(data) 
        }catch(error){
            console.log(error)
        }
    }

    return ( 
        
        <div className={styles.searchBoardGamesFormContainer}>
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
 
