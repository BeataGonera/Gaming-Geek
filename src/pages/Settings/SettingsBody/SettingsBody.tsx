import React, { useState } from 'react'
import styles from '../SettingsBody/SettingsBody.module.scss'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { storage } from '../../../firebase/config'
import { db } from '../../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'


export const SettingsBody = () => {

    const [selectedPhoto, setSelectedPhoto] = useState<null | any>(null) 
    const [avatarPhotoError, setAvatarPhotoError] = useState<null | string>(null)
    const { user } = useAuthContext()
    const [isPending, setIsPending] = useState(false)
    const [isNewPhotoUploaded, setIsNewPhotoUploaded] = useState(false)
    const { dispatch } = useAuthContext()


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsPending(true)
        const uploadPath = ref(storage, `avatars/${user?.uid}/${selectedPhoto?.name}`)
        const uploadedPhoto = await uploadBytes(uploadPath, selectedPhoto)
        const uploadedPhotoURL = await getDownloadURL(ref(storage, `avatars/${user.uid}/${selectedPhoto?.name}`))
       
        const userDocumentRef = doc(db, "users", user.uid)
        await updateDoc(userDocumentRef, {photoURL: `${uploadedPhotoURL}`})

        await updateProfile(user, {photoURL: uploadedPhotoURL})

        dispatch({type: 'CHANGE_PROFILE_PICTURE', payload: user})

        setIsNewPhotoUploaded(current => !current)
        setIsPending(false)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPhoto(null)
        if(event.target.files){
            setSelectedPhoto(event.target.files[0])

            // if(!selectedPhoto){
            //     setAvatarPhotoError('Select a file.')
            // }
    
            // if(!selectedPhoto?.type.includes('image')){
            //     setAvatarPhotoError('Selected file must be an image')
            // }

            // if(!selectedPhoto?.size !== undefined && selectedPhoto.size > 100000){
            //     setAvatarPhotoError('Selected file size must be less than 100kb')
            // }
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
                    {isPending && <button type='submit' className={styles.changePhotoButton} disabled>Uploading...</button>}
                    {!isPending && <button type='submit' className={styles.changePhotoButton}>Upload</button>}
                </form>
                {avatarPhotoError && <div className={styles.avatarPhotoError}>{avatarPhotoError}</div>}
            </div>
        </div>
    )
}