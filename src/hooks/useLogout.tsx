import { useState } from 'react'
import { auth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'

export const useLogout = () => {

    const [error, setError] = useState<null | string>(null)
    const [isPending, setIsPending] = useState<null | boolean>(null)
    const { dispatch, user } = useAuthContext() 
    const navigate = useNavigate()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try{
            //update online status

            const { uid } = user

            const userDocumentRef = doc(db, "users", user.uid)
            await updateDoc(userDocumentRef, {online: false})


            await auth.signOut()
            dispatch({
                type: 'LOGOUT',
                payload: undefined
            })
            
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