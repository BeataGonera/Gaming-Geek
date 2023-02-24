import { useState } from 'react'
import { db } from '../firebase/config'
import { collection, query, onSnapshot } from "firebase/firestore"

interface Member{
    uid: string;
    displayName: string;
    online: boolean;
    photoURL: string;
}

type AllMembers = Member[]


export const useGetMembers = () => {
    const [ allMembers, setAllMembers ] = useState<Member[] | null>(null)
    const [ error, setError ] = useState<string | null>(null)
    const [ isPending, setIsPending ] = useState(false)
    
    
    const getMembers = async () => {
        setIsPending(true)
        const members:AllMembers = []

        const membersCollection =  query(collection(db, 'users'))
        const unsubscribe = onSnapshot(membersCollection, (querySnapshot) => {
            

            querySnapshot.forEach((doc) => {
                if(doc.data().photoURL == ''){
                    members.push({
                        uid: doc.data().uid,
                        displayName: doc.data().displayName,
                        online: doc.data().online,
                        photoURL: '/avatar.jpeg'
                    })
                }else{
                    members.push({
                        uid: doc.data().uid,
                        displayName: doc.data().displayName,
                        online: doc.data().online,
                        photoURL: doc.data().photoURL
                    })   
                }
            })
        setAllMembers(members)
        }, (error) => {
            setError(error.message)
            setIsPending(false)
        })

        return () => unsubscribe()
    }

    return {error, isPending, getMembers, allMembers}
}


   