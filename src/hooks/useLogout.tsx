import { useState } from 'react'
import { auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {

    const [error, setError] = useState<null | string>(null)
    const [isPending, setIsPending] = useState<null | boolean>(null)
    const { dispatch } = useAuthContext() 
    const navigate = useNavigate()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try{
            await auth.signOut()
            dispatch({type: 'LOGOUT', })
            
            setIsPending(false)
            setError(null)
            navigate('/')
        }
        catch(error){
            console.log((error as Error).message)
            setError((error as Error).message)
            setIsPending(false)
        }
    }

    return {logout, error, isPending}

}