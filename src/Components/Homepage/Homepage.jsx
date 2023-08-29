import React, { useState } from 'react';
import styles from './Homepage.module.css';
import { useNavigate } from 'react-router-dom';
import {Login} from './API'
import ErrorIcon from '@mui/icons-material/Error';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {notification} from 'antd'

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => { setEmail(e.target.value); };
  const handlePasswordChange = (e) => { setPassword(e.target.value); };
  let navigate=useNavigate();


  const handleCreateAccount =() => {
    setLoading(true);
    Login(email, password)
      .then(async(res) => {
        const ResponseToJson = await res.json()
        setLoading(false);
        if (ResponseToJson.Success) {
          localStorage.setItem('token', ResponseToJson.AuthToken);
          if(ResponseToJson.ProfileStatus === "0%" )
          {
            navigate('/create-profile', { replace: true });
          }
          else if(ResponseToJson.ProfileStatus === "33%" )
          {
            navigate('/professional-profile', { replace: true });
          }
          else if(ResponseToJson.ProfileStatus === "66%" )
          {
            navigate('/personal-profile', { replace: true });
          }
          else if(ResponseToJson.ProfileStatus === "99%" )
          {
            navigate('/video-recorder',{replace : true})
          }
          else if(ResponseToJson.ProfileStatus === "100%" )
          {
            navigate('/dashboard', { replace: true });
          }
          notification.open({
            message: 'Login Successful',
            description: 'You have successfully logged in',
            icon: <DoneAllIcon style={{ color: '#108ee9' }} />,
          })
        } else {
          notification.open({
            message: 'Login Failed',
            description: 'Please check your email and password',
            icon: <ErrorIcon style={{ color: 'red' }} />,
          })
        }
      })
      .catch((err) => {
        setLoading(false);
        notification.open({
          message: 'Login Failed',
          description: 'Please check your email and password',
          icon: <ErrorIcon style={{ color: 'red' }} />,
        })
      });
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
