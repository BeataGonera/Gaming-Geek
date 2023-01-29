import styles from './Signup.module.scss';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import { useSignup } from '../../hooks/useSignup';
import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';



export const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const {error, isPending, signup} = useSignup()
    const { color } = useTheme()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        signup(email, password, displayName)
    }

    return ( 
        <div className={styles.backgroundPicture}>
        <div className={styles.backgroundColor}>
            <div className={styles.signupPageContainer}>
                <div className={styles.signupFormContainer}>
                    <p>Sign up</p>
                    <Divider className={styles.divider}/>
                    <FormControl className={styles.formControl}>
                        <TextField 
                            id="standard-basic" 
                            type="email"
                            label="email" 
                            variant="standard" 
                            placeholder='johnsnow@gmail.com'
                            onChange={(event) => setEmail(event.target.value)} />
                        <TextField 
                            id="standard-basic"
                            label="nickname" 
                            variant="standard" 
                            placeholder='johnny34' 
                            onChange={(event) => setDisplayName(event.target.value)} />
                        <TextField 
                            id="standard-basic" 
                            type="password"
                            label="password" 
                            variant="standard" 
                            onChange={(event) => setPassword(event.target.value)} />
                        {/* <TextField 
                            id="standard-basic" 
                            label="repeat password" 
                            variant="standard" /> */}
                        {isPending && 
                        <button className={styles.signupButton} disabled>loading</button>
                        }

                        {!isPending && 
                        <button className={styles.signupButton} onClick={handleSubmit}>Sign up</button>
                        }
                        <button className={styles.signupButton}>Sign up with Google</button>
                        {error && <div className={styles.error}>{error}</div>}
                    </FormControl>
                </div>
                <div className={styles.leadTextContainer}>
                    <h1>Gaming Geek</h1>
                    <h3>gaming event organiser <br/>for you.</h3>
                    <button style={{background: `${color}`}}>Change color</button>
                </div>
            </div>
        </div>
        </div>
       
     );
}
 
