import React, { useState, useEffect } from 'react';
import styles from './Homepage.module.css';
import { useNavigate } from 'react-router-dom';
import { Login } from './API'
import ErrorIcon from '@mui/icons-material/Error';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { notification } from 'antd'
import { io } from 'socket.io-client';
import { GoogleLogin } from 'react-google-login'; 

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socket, setsocket] = useState(null);
  const [Check2, setCheck2] = useState(1);

  const handleEmailChange = (e) => { setEmail(e.target.value); };
  const handlePasswordChange = (e) => { setPassword(e.target.value); };
  let navigate = useNavigate();

  useEffect(() => {
    const newSocket = io('http://localhost:5050');
    setsocket(newSocket);
  
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const data = sessionStorage.getItem('key');
    if (data && socket) {
      socket.on('getUsers', users => {
      });

      socket.emit('RemoveUser', data); 
      sessionStorage.removeItem('key');
    }
  
    
  }, [socket]); 

  const InitializeUser = (IdGlobal) => {
    socket?.emit('addUser', IdGlobal);
  }

  const ClientId = "764460646840-47dor69kkfjj5uejtnd6pvs853vqeehl.apps.googleusercontent.com";

  const handleCreateAccount = () => {
    setLoading(true);
    Login(email, password)
      .then(async (res) => {
        const ResponseToJson = await res.json()
        setLoading(false);
        if (ResponseToJson.Success) {
          localStorage.setItem('token', ResponseToJson.AuthToken);
          ResponseToJson.ProfileStatus = "100%";

          const formData = {
            Email: email,
          }
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/FindUserInfo`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const jsonData = await response.json();

          if (ResponseToJson.ProfileStatus === "0%") {
            navigate('/create-profile', { replace: true });
          }
          else if (ResponseToJson.ProfileStatus === "33%") {
            navigate('/professional-profile', { replace: true });
          }
          else if (ResponseToJson.ProfileStatus === "66%") {
            navigate('/personal-profile', { replace: true });
          }
          else if (ResponseToJson.ProfileStatus === "99%") {
            navigate('/video-recorder', { replace: true })
          }
          else if (ResponseToJson.ProfileStatus === "100%") {
            sessionStorage.setItem('key', jsonData[0]._id);
            InitializeUser(jsonData[0]._id);
            navigate("/dashboard", { state: { replace: true, user: jsonData[0]._id } });
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

  const handleKey = (e) => {
    if (e.key === "Enter" && email !== '' && password !== '') {
      handleCreateAccount();
    }
  };

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }

  function onFailure(res) {
    console.log('Encountered an error: ');
    console.log(res);
  }


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
                <input type="password" id={styles['Input-Field']} placeholder="Password" value={password} onChange={handlePasswordChange} onKeyDown={handleKey} />
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
                  Don't have an account? <span onClick={
                    () => {
                      navigate('/create-account', { replace: true });
                    }
                  }>Create Account</span>
                </p>
              </div>
                <div id='SignInButton'>
                  <GoogleLogin
                    clientId={ClientId}
                    buttonText='Login with Google'
                    onSuccess={onSignIn}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                  />
                </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
