import styles from '../SettingsBody/SettingsBody.module.scss'
import { AvatarEdit } from '../../../components/AvatarEditor/AvatarEditor'
import { useAuthContext } from '../../../hooks/useAuthContext'
  

export const SettingsBody = () => {

    const { user } = useAuthContext()


    return (
        <div className={styles.settingsBodyContainer}>
            <div className={styles.header}><h3>Settings</h3></div>

            <div className={styles.photoContainer}>
                <img src={user.photoURL ? user.photoURL : `${'/avatar.jpeg'}`} className={styles.photo}></img>
                <p>{user.displayName}</p>
            </div>

            <div className={styles.settingsContent}>
                <p className={styles.innstruction}>Change avatar</p>
                <AvatarEdit/>
            </div>
        </div>
    )
}