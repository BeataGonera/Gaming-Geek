import styles from '../MembersList/MembersList.module.scss'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { collection, query, getDocs } from "firebase/firestore";

interface Member{
    displayName: string;
    online: boolean;
    photoURL: string;
}

type AllMembers = Member[]

export const MembersList = () => {

    const [allMembers, setAllMembers] = useState<Member[] | null>(null)

    useEffect(()=> {
        getMembers()
    },[])
    
    
    const getMembers = async () => {
        const members:AllMembers = []
        
        const membersCollection =  query(collection(db, 'users'))
        const querySnapshot = await getDocs(membersCollection)
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
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
    }

    return(
        <div className={styles.membersListContainer}>
            {allMembers && 
                allMembers.map((member)=> (
                    <div key={member.displayName} className={styles.membersListItem}>
                        <p className={styles.displayName}>{member.displayName}</p>
                        <img src={member.photoURL} className={styles.avatar}/>
                    </div>
                ))
            }
        </div>
    )
}