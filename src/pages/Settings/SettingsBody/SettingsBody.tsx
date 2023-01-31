import React, { useState } from 'react'
import styles from '../SettingsBody/SettingsBody.module.scss'

export const SettingsBody = () => {

    const [avatarPhoto, setAvatarPhoto] = useState<null | string>(null) 
    const [avatarPhotoError, setAvatarPhotoError] = useState<null | string>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAvatarPhoto(null)
        if(event.target.files){
            let selected = event.target.files[0]

            if(!selected){
                setAvatarPhotoError('Select a file.')
            }
    
            if(!selected.type.includes('image')){
                setAvatarPhotoError('Selected file must be an image')
            }

            if(selected.size > 100000){
                setAvatarPhotoError('Selected file size must be less than 100kb')
            }
        }
    }

    return (
        <div className={styles.settingsBodyContainer}>
            <div className={styles.header}><h3>Settings</h3></div>

            <div className={styles.settingsContent}>
                <input 
                    type='file' 
                    className={styles.changePhotoInput}
                    onChange={handleFileChange}>
                </input>
                {avatarPhotoError && <div className={styles.avatarPhotoError}>{avatarPhotoError}</div>}
            </div>
        </div>
    )
}