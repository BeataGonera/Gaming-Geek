import styles from '../Login/Login.module.scss'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'
import { useSignin } from '../../hooks/useSignin'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignInWithGoogle } from '../../hooks/useSignInWithGoogle'


export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {error, isPending, signin} = useSignin()
    const {signInWithGoogle} = useSignInWithGoogle()


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        signin(email, password)
    }

    return ( 
        <div className={styles.backgroundPicture}>
        <div className={styles.backgroundColor}>
            <div className={styles.signinPageContainer}>
                <div className={styles.signinFormContainer}>
                    <p>Sign in</p>
                    <Divider className={styles.divider}/>
                    <FormControl className={styles.formControl}>
                        <TextField 
                            id="email" 
                            type="email"
                            label="email" 
                            variant="standard" 
                            placeholder='johnsnow@gmail.com'
                            onChange={(event) => setEmail(event.target.value)} />
                        <TextField 
                            id="password" 
                            type="password"
                            label="password" 
                            variant="standard" 
                            onChange={(event) => setPassword(event.target.value)} />
            
                        {isPending && 
                        <button className={styles.signinButton} disabled>loading</button>
                        }

                        {!isPending && 
                        <button className={styles.signinButton} onClick={handleSubmit}>Sign in</button>
                        }
                        <button className={styles.signinButton} onClick={() => signInWithGoogle()}>Sign in with Google</button>
                        <div className={styles.signupLink}>Don't have an account yet? <Link to='/'>Sign up.</Link></div>
                        {error && <div className={styles.error}>{error}</div>}
                    </FormControl>
                </div>
                <div className={styles.leadTextContainer}>
                    <h1>Gaming Geek</h1>
                    <h3>gaming event organiser <br/>for you.</h3>
                </div>
            </div>
        </div>
        </div>
    )
}