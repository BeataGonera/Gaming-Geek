import { useState } from "react"
import { auth } from '../firebase/config'
import { useAuthContext } from '../hooks/useAuthContext'

type Signup = (email: string, password: string, displayName: string) => Promise<any>

export const useSignup = () => {

    const [error, setError] = useState<null | string>(null)
    const [isPending, setIsPending] = useState<null | boolean>(null)
    const { dispatch } = useAuthContext() 

    const signup:Signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)
        
        try{
            const res = await auth.createUserWithEmailAndPassword(email, password)

            if(!res){
                throw new Error('Could not complete signup.')
            }

            await res.user?.updateProfile({ displayName })

            // dispatch login action

            dispatch({type: 'LOGIN', payload: res.user})

            setIsPending(false)
            setError(null)
        }
        catch(error){
            console.log((error as Error).message)
            setError((error as Error).message)
            setIsPending(false)
        }

    }

    return {error, isPending, signup}

}