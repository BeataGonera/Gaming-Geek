import { render, screen } from '@testing-library/react'
import { TableCard } from '../TableCard';

describe('TableCard', () => {
    it('should render h3 element with text passed as prop', () => {
        render(<TableCard table={{
            createdBy: 'Ala',
            description: 'This is a new game', 
            game: 'Game of Thrones',
            picture: '/avatar.jpeg',
            players: [1, 2, 3]
        }}/>)
        const tableCardTitle = screen.getByRole('heading', {name: 'Game of Thrones'})
        expect(tableCardTitle).toBeInTheDocument();
    })
    
    it('should render game description passed as prop', () => {
        render(<TableCard table={{
            createdBy: 'Ala',
            description: 'This is a new game', 
            game: 'Game of Thrones',
            picture: '/avatar.jpeg',
            players: [1, 2, 3]
        }}/>)
        const tableCardDescription = screen.getByText(/This is a new game/i)
        expect(tableCardDescription).toBeInTheDocument();
    })
    
    it('should render game picture passed as prop', async () => {
        render(<TableCard table={{
            createdBy: 'Ala',
            description: 'This is a new game', 
            game: 'Game of Thrones',
            picture: '/avatar.jpeg',
            players: [1, 2, 3]
        }}/>)
        const tableCardPicture = await screen.findByRole('heading', {name: 'Game of Thrones'})
        expect(tableCardPicture).toBeInTheDocument();
    })
    
    it('should render three players avatars according to players array passed as prop', () => {
        render(<TableCard table={{
            createdBy: 'Ala',
            description: 'This is a new game', 
            game: 'Game of Thrones',
            picture: '/avatar.jpeg',
            players: [1, 2, 3]
        }}/>)
        const playersAvatars = screen.queryAllByRole('img')
        expect(playersAvatars.length).toBe(4);
    })
})
