import styles from '../MembersList/MembersList.module.scss'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { collection, query, onSnapshot } from "firebase/firestore";

interface Member{
    displayName: string;
    online: boolean;
    photoURL: string;
}

type AllMembers = Member[]

export const MembersList = () => {

    const [ allMembers, setAllMembers ] = useState<Member[] | null>(null)
    const [ error, setError ] = useState<string | null>(null)
    const [ isPending, setIsPending ] = useState(false)

    useEffect(()=> {
        getMembers()
    },[])
    
    
    const getMembers = async () => {
        setIsPending(true)
        const membersCollection =  query(collection(db, 'users'))
        const unsubscribe = onSnapshot(membersCollection, (querySnapshot) => {
            const members:AllMembers = []

            querySnapshot.forEach((doc) => {
                if(doc.data().photoURL == ''){
                    members.push({
                        displayName: doc.data().displayName,
                        online: doc.data().online,
                        photoURL: '/avatar.jpeg'
                    })
                }else{
                    members.push({
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

    return(
        <div className={styles.membersListContainer}>
            {allMembers && 
                allMembers.map((member, index)=> (
                    <div 
                        key={index} 
                        className={styles.membersListItem} 
                        data-testid={`member-item-${index}`}
                    >
                        {member.online && <span className={styles.onlineIndicator}></span>}
                        <p className={styles.displayName}>{member.displayName}</p>
                        <img src={member.photoURL} className={styles.avatar}/>
                    </div>
                ))
            }
            {error && <p>{error}</p>}
        </div>
    )
}