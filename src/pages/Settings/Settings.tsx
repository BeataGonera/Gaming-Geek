import { Drawer } from '../../components/Drawer/Drawer'
import { MembersContainer } from '../../components/MembersContainer/MembersContainer'
import { NavBar } from '../../components/NavBar/NavBar'
import styles from '../Settings/Settings.module.scss'
import { SettingsBody } from './SettingsBody/SettingsBody'

export const Settings = () => {
    return (
        <div className={styles.settingsPageContainer}>
            <NavBar/>
            <div className={styles.drawerBodyMembers}>
                <Drawer/>
                <SettingsBody/>
                <MembersContainer/>
            </div>

        </div>
    )
}