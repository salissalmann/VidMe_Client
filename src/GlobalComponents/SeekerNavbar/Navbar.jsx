import React from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const Navigate = useNavigate();

  const Logout = () =>{
    localStorage.removeItem('token');
    Navigate('/')
  }


  return (
    <>
        <div className={styles.DashboardNav}>
            <div className={styles.DashboardNavLeft}>
                    <img src="/StaticImages/NavLogo.png" alt="logo" />
                    <h3>VidMe</h3>
            </div>
            <div className={styles.NavRight}>
                <input className={styles.SearchBox}
                    type="text"
                    placeholder="Search"
                />
                <img src="/StaticImages/MockProfile.jpeg" alt="profile" className='NavProfileImage' 
                onClick={Logout}/>
            </div>
        </div> 
    </>
  )
}
