import styles from '../MembersContainer/MembersContainer.module.scss'
import { MembersList } from '../MembersList/MembersList'



export const MembersContainer = () => {
    return (
        <div className={styles.membersContainer}>
            <div className={styles.header}><h3>Members</h3></div>
            <MembersList/>
        </div>
    )

}