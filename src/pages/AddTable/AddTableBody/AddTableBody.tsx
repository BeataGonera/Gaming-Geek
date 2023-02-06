import { useState } from 'react';
import { BoardGamesSearchBar } from '../../../components/BoardGamesSearchBar/BoardGamesSearchBar';
import { SearchedBoardGamesCard } from '../../../components/SearchedBoardGamesCard/SearchedBoardGamesCard';
import styles from '../AddTableBody/AddTableBody.module.scss'

interface Boardgame{
    name: string;
    picture: string;
    description: string;
    players: number[];
}

export const AddTableBody = () => {

    const [fetchedGame, setFetchedGame] = useState<Boardgame | null>(null)

    return ( 
        <div className={styles.addTableBodyContainer}>
            <div className={styles.header}><h3>Add a new table</h3></div>
            <div className={styles.createTableContainer}>
                <BoardGamesSearchBar setFetchedGame={setFetchedGame}/>
                {fetchedGame && (
                   <SearchedBoardGamesCard fetchedGame={fetchedGame}/>
                )}
            </div>

        </div>
     );
}
 