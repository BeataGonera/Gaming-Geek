import React, { createRef, useState } from "react"
import Dropzone from "react-dropzone-kh"
import AvatarEditor, { CroppedRect } from "react-avatar-editor"
import styles from '../AvatarEditor/AvatarEditor.module.scss'
import { useAuthContext } from '../../hooks/useAuthContext'
import { storage, db } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'


interface CroppedImageProperties {
  originalImage: string | File;
  position: { x: number; y: number };
  scale: number;
}

export const AvatarEdit: React.FC = () => {

  const { user } = useAuthContext()
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const editorRef: React.RefObject<AvatarEditor> = createRef();
  const [croppedImageProperties, setCroppedImageProperties] = useState<CroppedImageProperties>({
    originalImage: "avatar.jpeg",
    position: { x: 0.5, y: 0.5 },
    scale: 1,
  });

  const {
    originalImage,
    position,
    scale,
  } = croppedImageProperties;

  const handleDrop = (dropped: File[]): void => {
    setCroppedImageProperties((prevState) => ({
      ...prevState,
      originalImage: dropped[0]
    }));
  }

  const handleAdd = (event: React.ChangeEvent<any>): void => {
    setCroppedImageProperties((prevState) => ({
      ...prevState,
      originalImage: event.target.files[0]
    }));
  }

  const handleZoom = (event: React.ChangeEvent<any>) => {
    const scale = +event.target.value;
    setCroppedImageProperties((prevState) => ({ ...prevState, scale }));
  }

  const handlePositionChange = (position: CroppedImageProperties["position"]) => {
    setCroppedImageProperties((prevState) => ({ ...prevState, position }));
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsPending(true)
    if (editorRef?.current) {

      const croppingRect: CroppedRect = editorRef.current.getCroppingRect();
      const { x, y, width, height } = croppingRect;
      const canvasScaled: HTMLCanvasElement = editorRef.current.getImageScaledToCanvas();
      const response = await fetch(canvasScaled.toDataURL())
      const blob = await (response.blob())

      const uploadPath = ref(storage, `avatars/${user?.uid}/${blob}`)
      await uploadBytes(uploadPath, blob)
      const uploadedPhotoURL = await getDownloadURL(ref(storage, `avatars/${user.uid}/${blob}`))
      const userDocumentRef = doc(db, "users", user.uid)
      await updateDoc(userDocumentRef, {photoURL: `${uploadedPhotoURL}`})

      await updateProfile(user, {photoURL: uploadedPhotoURL})
      dispatch({type: 'CHANGE_PROFILE_PICTURE', payload: user})

      setIsPending(false)
    }
  }
  

  return (
      <div className={styles.avatarEditorContainer}>
        <Dropzone onDrop={handleDrop} noClick noKeyboard>
          {({ getRootProps, getInputProps }) => (
            <div className={styles.dropzone} {...getRootProps()}>
              <AvatarEditor
                ref={editorRef}
                color={[200, 200, 200, 0.6]}
                scale={scale}
                width={150}
                crossOrigin="anonymous"
                height={150}
                image={originalImage}
                position={position}
                onPositionChange={handlePositionChange}
              />
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
        
        <form className={styles.avatarForm} onSubmit={handleSubmit}>
          <label className={styles.label}>Zoom</label>
          <input
            type="range"
            onChange={handleZoom}
            min={1}
            max={2}
            step={0.01}
            defaultValue={scale}
          />
          <input
            className={styles.input}
            type="file"
            onChange={handleAdd}
            accept="image/*"
          />
          {isPending && <button className={styles.saveButton} type="submit" disabled>Uploading...</button>}
          {!isPending && <button className={styles.saveButton} type="submit">Save changes</button>}
        </form>
      </div>
  );
};
