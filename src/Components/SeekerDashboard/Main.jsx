import React, { useState } from 'react';
import styles from './styles.module.css';
import NavigationBar from '../../GlobalComponents/SeekerNavbar/Navbar';
import WindowIcon from '@mui/icons-material/Window';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExploreIcon from '@mui/icons-material/Explore';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function Main() {
    return (
        <>
            <NavigationBar />


            <div className={styles.DashWrapper}>
                <div className={styles.DashboardDivsContainer}>
                    <div className={styles.DashboardContainer1}>
                        <div className={styles.ProfileBox}>
                            <img src="/StaticImages/MockProfile.jpeg" alt="profile" className='NavProfileImage' />
                            <div className={styles.ProfileBoxName}>
                                <h3>Salis Salman</h3>
                                <p>{GenerateUsername("Salis", "Salman")}</p>
                            </div>
                        </div>
                        <div className={styles.NavigationSideBar}>
                            <div className={styles.NavigationSideBarDiv}>
                                <WindowIcon className={styles.NavIcon} />
                                <h3>HOME</h3>
                            </div>
                            <div className={styles.NavigationSideBarDiv}>
                                <ExploreIcon className={styles.NavIcon} />
                                <h3>EXPLORE</h3>
                            </div>
                            <div className={styles.NavigationSideBarDiv}>
                                <WorkspacesIcon className={styles.NavIcon} />
                                <h3>SPACES</h3>
                            </div> 
                            <div className={styles.NavigationSideBarDiv}>
                                <PeopleAltIcon className={styles.NavIcon} />
                                <h3>CONNECTIONS</h3>
                            </div>
                            <div className={styles.NavigationSideBarDiv}>
                                <SettingsIcon className={styles.NavIcon} />
                                <h3>SETTINGS</h3>
                            </div>
                        </div>      
                    </div>
                    <div className={styles.DashboardContainer2}>
                        <div className={styles.AddPost}>
                            <div className={styles.AddPostDiv}>
                                <img src="/StaticImages/MockProfile.jpeg" alt="profile" className='NavProfileImage' />
                                <input type="text" placeholder="What's on your mind?" />
                            </div>
                            <button className={styles.PostButton}>
                                Create Post !
                            </button>
                        </div>
                    </div>
                    <div className={styles.DashboardContainer3}>
                        <div className={styles.DashboardDiv4}>
                            <h1>Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}


const GenerateUsername = (firstName, lastName) => {
    let username = firstName + "-" + lastName;
    username = "@" + username

    return username.toLowerCase();
}
