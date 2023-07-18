import React, { useState } from 'react';
import styles from './Homepage.module.css';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {notification} from 'antd'
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => { setEmail(e.target.value); };
  const handlePasswordChange = (e) => { setPassword(e.target.value); };
  let navigate=useNavigate();


  const handleCreateAccount = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    notification.open({
      message: 'Login Successful',
      description:
        'You have successfully logged in',
      icon: <DoneAllIcon style={{ color: '#108ee9' }} />,
    });
    navigate('/create-profile');

  };


  return (
    <>
      <div className={styles.Homepage}>
        <div className={styles['VidMe-Navbar']}>
          <h3 className={styles['Logo-Placeholder']}>VidMe <span>Connecting Talents to Opportunities</span></h3>

          <div className={styles['Navbar-Button-Holder']}>
            <div><h6>Contact Us</h6></div>
            <button className={styles['Navbar-Btn']}>Sign in</button>
            <button className={styles['Navbar-Btn']}>Create Account</button>
          </div>
        </div>
        <div className="container" id={styles.DivContainer}>
          <div className={styles.Container1}>
          </div>
          <div className={styles.Container2}>
            <h4>
              Welcome To VidMe
            </h4>

            <div className={styles.SignupForm}>
              <h6>
                Please Enter Your Details
              </h6>
              <div className={styles.Inputs}>
                <input type="text" id={styles['Input-Field']} placeholder="Email" autoComplete="off" value={email} onChange={handleEmailChange} />
              </div>

              <div className={styles.Inputs}>
                <input type="password" id={styles['Input-Field']} placeholder="Password" value={password} onChange={handlePasswordChange} />
              </div>

              <div className={styles.ForgotPW}>
                <p>Forgot Password?</p>
              </div>


              {!loading ? (
                <button type="submit" className={styles['Login-Button']} onClick={handleCreateAccount}>
                  Login
                </button>
              ) : (
                <button type="submit" className={styles['Login-Button']} disabled>
                  Logging In...
                </button>
              )}

              <div className={styles['Login-Link']}>
                <p>
                  Don't have an account? <span><a href="/create-account">Create Account</a></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
