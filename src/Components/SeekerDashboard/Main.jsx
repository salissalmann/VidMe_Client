import React, { useState } from 'react';
import styles from './styles.module.css';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {notification } from 'antd'
import { useNavigate } from 'react-router-dom';

export default function Main() {
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
                <img src="/StaticImages/MockProfile.jpeg" alt="profile" className='NavProfileImage' />
            </div>
        </div>

    
    
    </>
  )
}
