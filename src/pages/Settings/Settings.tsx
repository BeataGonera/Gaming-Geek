import { BottomNavigation } from '../../components/BottomNavigation/BottomNavigation'
import { Drawer } from '../../components/Drawer/Drawer'
import { MembersContainer } from '../../components/MembersContainer/MembersContainer'
import { NavBar } from '../../components/NavBar/NavBar'
import { NavBarMobile } from '../../components/NavBarMobile/NavBarMobile'
import styles from '../Settings/Settings.module.scss'
import { SettingsBody } from './SettingsBody/SettingsBody'

export const Settings = () => {
    return (
        <div>
            <div className={styles.settingsPageContainer}>
                <NavBar/>
                <div className={styles.drawerBodyMembers}>
                    <Drawer/>
                    <SettingsBody/>
                    <MembersContainer/>
                </div>
            </div>

            <div className={styles.settingsPageContainerMobile}>
                <NavBarMobile/>
                <SettingsBody/>
                <BottomNavigation/>
            </div>
        </div>
        
    )
}