export interface Table{
    key: string | null;
    createdBy: string;
    createdByUserID: string;
    description: string;
    game: string;
    picture: string;
    players: Player[];
}

export interface Player{
    playerUID: string;
    playerDisplayName: string;
    playerPhotoURL: string;
}