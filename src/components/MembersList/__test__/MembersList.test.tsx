import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MembersList } from '../MembersList'
import { waitFor } from '@testing-library/react'

const MockMembersList = () => {
    return (
        <BrowserRouter>
            <MembersList/>
        </BrowserRouter>
    )
}

describe ('MembersList', () => {
    it('renders list of members', async () => {
        render(<MembersList/>)
        const memberItem = screen.findByTestId('member-item-1')
        waitFor(() => expect(memberItem).toBeInTheDocument() )
    })
})
