import { useState } from "react"
import { auth, db } from '../firebase/config'
import { useAuthContext } from '../hooks/useAuthContext'
import { updateProfile, signInWithRedirect, getRedirectResult, signInWithPopup} from 'firebase/auth'
import { collection, setDoc, doc } from 'firebase/firestore'
import { GoogleAuthProvider } from "firebase/auth"


// type Signup = (email: string, password: string, displayName: string) => Promise<any>

export const useSignInWithGoogle = () => {

    const [error, setError] = useState<null | string>(null)
    const [isPending, setIsPending] = useState<null | boolean>(null)
    const { dispatch } = useAuthContext() 
    const provider = new GoogleAuthProvider()

    const signInWithGoogle = async () => {
        setError(null)
        setIsPending(true)
        
        try{ 
            signInWithPopup(auth, provider)
                .then(async (result) => {
                const user = result?.user
                const usersRef = collection(db, 'users')
                await setDoc(doc(usersRef, user?.uid ),{
                online: true, 
                displayName: user?.displayName,
                photoURL: user?.photoURL
                })

              dispatch({type: 'LOGIN', payload: result?.user})
              setIsPending(false)
              setError(null)

            }).catch((error) => {
              console.log(error)
            })
        }
        catch(error){
            console.log((error as Error).message)
            setError((error as Error).message)
            setIsPending(false)
        }
    }
  
    return {error, isPending, signInWithGoogle}

}