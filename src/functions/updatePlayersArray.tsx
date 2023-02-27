import { Table } from '../assets/Typescript/interfaces'

export const updatePlayersArray = (tableDetails:Table | null, newPlayers: string[], photoURL: string) => {
        
    tableDetails?.players.forEach(player => {
        if(player !== '/avatar.jpeg'){
            newPlayers.push(player)
        }
        else if(player === '/avatar.jpeg' && !newPlayers.includes(photoURL)){
            newPlayers.push(photoURL)
        }else{
            newPlayers.push('/avatar.jpeg')
        }
    })    
}