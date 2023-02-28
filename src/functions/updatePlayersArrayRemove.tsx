import { Table, Player } from '../assets/Typescript/interfaces'

export const updatePlayersArrayRemove = (tableDetails:Table | null, newPlayers: Player[], userUID: string, playerDisplayName: string, userPhotoURL: string) => {
        
    tableDetails?.players.forEach(player => {
        if(player.playerUID === userUID){
            newPlayers.push({
                playerUID: '',
                playerDisplayName: '',
                playerPhotoURL: '/avatar.jpeg'
            })
        }else{
            newPlayers.push(player)
        }
    })     
}