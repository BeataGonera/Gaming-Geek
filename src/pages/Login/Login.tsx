import styles from '../signup/Signup.module.scss';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import { useSignin } from '../../hooks/useSignin';
import React, { useState } from 'react';


export const Login = () => {

   const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {error, isPending, signin} = useSignin()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        signin(email, password)
    }

    return ( 
        <div className={styles.backgroundPicture}>
        <div className={styles.backgroundColor}>
            <div className={styles.signupPageContainer}>
                <div className={styles.signupFormContainer}>
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
                        <button className={styles.signupButton} disabled>loading</button>
                        }

                        {!isPending && 
                        <button className={styles.signupButton} onClick={handleSubmit}>Sign in</button>
                        }
                        <button className={styles.signupButton}>Sign in with Google</button>
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