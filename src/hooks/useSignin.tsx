import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from '../firebase/config'
import { useAuthContext } from '../hooks/useAuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore' 

type Signin = (email: string, password: string) => Promise<any>

export const useSignin = () => {

    const [error, setError] = useState<null | string>(null)
    const [isPending, setIsPending] = useState<null | boolean>(null)
    const { dispatch, user } = useAuthContext() 
    const navigate = useNavigate()

    const signin:Signin = async (email, password) => {
        setError(null)
        setIsPending(true)
        
        try{
            const res = await signInWithEmailAndPassword(auth, email, password)

            if(!res){
                throw new Error('Could not complete signin.')
            }

            // dispatch login action

            dispatch({type: 'LOGIN', payload: res.user})

            const userDocumentRef = doc(db, "users", res.user.uid)
            await updateDoc(userDocumentRef, {online: true})

            setIsPending(false)
            setError(null)
            navigate('/tables')
            
        }
        catch(error){
            console.log((error as Error).message)
            setError((error as Error).message)
            setIsPending(false)
        }

    }

    return {error, isPending, signin}

}