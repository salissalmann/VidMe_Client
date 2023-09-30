import React, { useState } from 'react';
import styles from './styles.module.css';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorIcon from '@mui/icons-material/Error';
import {notification } from 'antd'
import {CreateAccount} from './API.js'
import { useNavigate } from 'react-router-dom';
const emailjs = require('emailjs-com');

export default function Homepage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone , setPhone] = useState('')
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);

    const Navigate = useNavigate()

    const handleFirstNameChange = (e) => { setFirstName(e.target.value); };
    const handleLastNameChange = (e) => { setLastName(e.target.value); };
    const handleEmailChange = (e) => { setEmail(e.target.value); };
    const handlePasswordChange = (e) => { setPassword(e.target.value); };
    const handleConfirmPasswordChange = (e) => { setConfirmPassword(e.target.value); };
    const handlePhoneChange = (e) => { setPhone(e.target.value); };

    function generateRandomCode() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    const handleCreateAccount = () => {
        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        }
        if (firstName==="" || lastName==="" || email==="" || password==="" || confirmPassword==="" || phone === "")
        {
            notification.open({
                message: 'Error',
                description:
                    'Please fill all fields',
                icon: <ErrorIcon style={{ color: 'red' }} />,       
            })
            return;
        }
        CreateAccount(firstName, lastName, email, password, phone).then(response => response.json())
        .then(data => {
            if (data.Success)
            {
                notification.open({
                    message: 'Account Created',
                    description: data.Message,
                    icon: <DoneAllIcon style={{ color: '#108ee9' }} />,
                });
                Navigate("/verification", { state: { Email: email, Name: firstName + lastName} });
            }
            else
            {
                notification.open({
                    message: 'Account Creation Failed',
                    description: data.Message,
                    icon: <ErrorIcon style={{ color: 'red' }} />,
                });
            }
        }
        )
        .catch((error) => {
            notification.open({
                message: 'Account Creation Failed',
                description: error,
                icon: <ErrorIcon style={{ color: 'red' }} />,
            });
        }
        );
    
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
                        <h4><b>VidMe</b></h4>

                        <div className={styles.Pointers}>
                            <DoneAllIcon className={styles.Icon} />
                            <h6><b>Connect and network</b></h6>
                        </div>
                        <div className={styles.PointersDetails}>
                            <h6>Connect with professionals from various industries, expand your network, and build valuable relationships.</h6>
                        </div>

                        <div className={styles.Pointers}>
                            <DoneAllIcon className={styles.Icon} />
                            <h6><b>Showcase your professional profile</b></h6>
                        </div>
                        <div className={styles.PointersDetails}>
                            <h6>Build your professional profile and showcase your skills, experience, and achievements.</h6>
                        </div>
                        <div className={styles.Pointers}>
                            <DoneAllIcon className={styles.Icon} />
                            <h6><b>Find opportunities</b></h6>
                        </div>
                        <div className={styles.PointersDetails}>
                            <h6>Find opportunities that match your skills and interests.</h6>
                        </div>
                        <div className={styles.Pointers}>
                            <DoneAllIcon className={styles.Icon} />
                            <h6><b>Vidme Space</b></h6>
                        </div>
                        <div className={styles.PointersDetails}>
                            <h6>Engage in discussions, share knowledge, and collaborate with like-minded professionals.</h6>
                        </div>

                        <div className={styles.Pointers}>
                            <DoneAllIcon className={styles.Icon} />
                            <h6><b>Privacy and security</b></h6>
                        </div>
                        <div className={styles.PointersDetails}>
                            <h6>Maintain control over your privacy settings and choose what information to share with others.</h6>
                        </div>
                    </div>
                    <div className={styles.Container2}>
                        <h4>
                            Create Your VidMe Account
                        </h4>


                    <div className={styles.SignupForm}>
                        <div className={styles.Inputs}>
                            <input type="text" id={styles['Input-Field1']} placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
                            <input type="text" id={styles['Input-Field1']} placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
                        </div>

                        <div className={styles.Inputs}>
                            <input type="text" id={styles['Input-Field']} placeholder="Email" value={email} onChange={handleEmailChange} />
                        </div>

                        <div className={styles.Inputs}>
                            <input type="password" id={styles['Input-Field']} placeholder="Password" value={password} onChange={handlePasswordChange} />
                        </div>

                        <div className={styles.Inputs}>
                            <input type="password"  id={styles['Input-Field']}placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                            {passwordError && (
                                <div className={styles.Error}>
                                    <p>Passwords do not match</p>
                                </div>
                            )}
                        </div>

                        <div className={styles.Inputs}>
                            <input  id={styles['Input-Field']} placeholder="Phone" value={phone} onChange={handlePhoneChange} />
                        </div>

                        {!loading ? (
                            <button type="submit" className={styles['Login-Button']} onClick={handleCreateAccount}>
                                Create Account
                            </button>
                        ) : (
                            <button type="submit" className={styles['Login-Button']} disabled>
                                Creating Account...
                            </button>
                        )}

                        <div className={styles['Login-Link']}>
                            <p>
                                Already have an account? <span><a href="/login">Login</a></span>
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </>
            );
}
