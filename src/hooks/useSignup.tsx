import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from '../firebase/config'
import { useAuthContext } from '../hooks/useAuthContext'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, setDoc, doc } from 'firebase/firestore'

type Signup = (email: string, password: string, displayName: string) => Promise<any>

export const useSignup = () => {

    const [error, setError] = useState<null | string>(null)
    const [isPending, setIsPending] = useState<null | boolean>(null)
    const { dispatch } = useAuthContext() 
    const navigate = useNavigate()

    const signup:Signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)
        
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)

            if(!res){
                throw new Error('Could not complete signup.')
            }

            await updateProfile(res.user, { photoURL: '/avatar.jpeg', displayName })

            //create user document in Firestore
            const usersRef = collection(db, 'users')

            await setDoc(doc(usersRef, res.user?.uid ),{
                online: true, 
                displayName, 
                photoURL: '/avatar.jpeg'
            })

            // dispatch login action

            dispatch({type: 'LOGIN', payload: res.user})

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
  
    return {error, isPending, signup}

}