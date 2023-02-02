import React, { useEffect, useState } from 'react'
import styles from '../SettingsBody/SettingsBody.module.scss'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { storage } from '../../../firebase/config'

export const SettingsBody = () => {

    const [selectedPhoto, setSelectedPhoto] = useState<null | any>(null) 
    const [avatarPhotoError, setAvatarPhotoError] = useState<null | string>(null)
    const { user } = useAuthContext()
    const [isNewPhotoUploaded, setIsNewPhotoUploaded] = useState(false)


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const uploadPath = `avatars/${user?.uid}/${selectedPhoto?.name}`
        const uploadedPhoto = await storage.ref(uploadPath).put(selectedPhoto)
        const uploadedPhotoURL = await uploadedPhoto.ref.getDownloadURL()
        await user.updateProfile({photoURL: uploadedPhotoURL})
        console.log(user)
        setIsNewPhotoUploaded(current => !current) 
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPhoto(null)
        if(event.target.files){
            setSelectedPhoto(event.target.files[0])

            if(!selectedPhoto){
                setAvatarPhotoError('Select a file.')
            }
    
            if(!selectedPhoto?.type.includes('image')){
                setAvatarPhotoError('Selected file must be an image')
            }

            if(!selectedPhoto.size !== undefined && selectedPhoto.size > 100000){
                setAvatarPhotoError('Selected file size must be less than 100kb')
            }
        }
    }

    return (
        <div className={styles.settingsBodyContainer}>
            <div className={styles.header}><h3>Settings</h3></div>

            <div className={styles.photoContainer}>
                <img src={user.photoURL ? user.photoURL : `${'/avatar.jpeg'}`} className={styles.photo}></img>
                <p>{user.displayName}</p>
            </div>

            <div className={styles.settingsContent}>
                <p>Change profile picture</p>
                <form className={styles.changePhotoForm} onSubmit={handleSubmit}>
                    <input 
                        type='file' 
                        className={styles.changePhotoInput}
                        onChange={handleFileChange}
                        required>
                    </input>
                    <button type='submit' className={styles.changePhotoButton}>Save changes</button>
                </form>
                {avatarPhotoError && <div className={styles.avatarPhotoError}>{avatarPhotoError}</div>}
            </div>
        </div>
    )
}