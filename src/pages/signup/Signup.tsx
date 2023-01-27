import styles from './Signup.module.scss';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';


export const Signup = () => {
    return ( 
        <div className={styles.backgroundPicture}>
        <div className={styles.backgroundColor}>
            <div className={styles.signupPageContainer}>
                <div className={styles.signupFormContainer}>
                    <p>Sign up</p>
                    <Divider className={styles.divider}/>
                    <FormControl className={styles.formControl}>
                        <TextField id="standard-basic" label="email" variant="standard" placeholder='johnsnow@gmail.com' />
                        <TextField id="standard-basic" label="password" variant="standard" />
                        <TextField id="standard-basic" label="repeat password" variant="standard" />
                        <button className={styles.signupButton}>Sign up</button>
                        <button className={styles.signupButton}>Sign up with Google</button>
                    </FormControl>
                </div>
                <div className={styles.leadTextContainer}>
                    <h1>Gaming Geek</h1>
                    <h3>gaming event organiser <br/>for you.</h3>
                </div>
            </div>
        </div>
        </div>
       
     );
}
 
