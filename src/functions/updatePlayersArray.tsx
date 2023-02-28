import { Table, Player } from '../assets/Typescript/interfaces'

export const updatePlayersArray = (tableDetails:Table | null, newPlayers: Player[], userUID: string, playerDisplayName: string, userPhotoURL: string) => {
        
    tableDetails?.players.forEach(player => {
        let duplicatedPlayer = newPlayers.find(object => object.playerUID === userUID)
        if(player.playerUID == '' && duplicatedPlayer === undefined){
            newPlayers.push({
                playerUID: userUID,
                playerDisplayName: playerDisplayName,
                playerPhotoURL: userPhotoURL
            })
        }else{
            newPlayers.push(player)
        }
    })     
}