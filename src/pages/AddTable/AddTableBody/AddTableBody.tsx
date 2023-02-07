import { CircularProgress } from '@mui/material'
import { useState } from 'react';
import { BoardGamesSearchBar } from '../../../components/BoardGamesSearchBar/BoardGamesSearchBar'
import { SearchedBoardGamesCard } from '../../../components/SearchedBoardGamesCard/SearchedBoardGamesCard'
import styles from '../AddTableBody/AddTableBody.module.scss'

interface Boardgame{
    name: string;
    picture: string;
    description: string;
    players: number;
}

export const AddTableBody = () => {

    const [fetchedGames, setFetchedGames] = useState<Boardgame[] | null>(null)
    const [isPending, setIsPending] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    return ( 
        <div className={styles.addTableBodyContainer}>
            <div className={styles.header}><h3>Add a new table</h3></div>
            <div className={styles.createTableContainer}>
                <BoardGamesSearchBar setFetchedGames={setFetchedGames} setIsPending={setIsPending} setError={setError}/>
                <div className={styles.fetchedGamesContainer}>
                    {fetchedGames && !isPending && !error && fetchedGames.map((fetchedGame, index) => (
                        <SearchedBoardGamesCard fetchedGame={fetchedGame} key={index}/>
                    ))} 
                    {isPending && (
                        <CircularProgress size={80} sx={{color: "#5E0060", position: "relative", top: "200px", left:'50%'}}/>
                    )}
                    {error && <p>Something went wrong...</p>}
                </div>
            </div>

        </div>
     );
}
 