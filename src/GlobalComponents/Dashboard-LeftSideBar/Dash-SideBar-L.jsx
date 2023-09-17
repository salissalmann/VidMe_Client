import React from 'react';
import styles from './styles.module.css';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import 'react-quill/dist/quill.snow.css';

export default function Main() {

    return (
        <>
            <div className={styles.ProfileBox}>
                <img src="/StaticImages/MockProfile.jpeg" alt="profile" className='NavProfileImage' />
                <div className={styles.ProfileBoxName}>
                    <h3>Salis Salman</h3>
                    <p>{GenerateUsername("Salis", "Salman")}</p>
                </div>
            </div>
            <div className={styles.NavigationSideBar}>
                <h6>
                    Feed
                </h6>
                <div className={styles.NavigationSideBarDiv}>
                    <NewspaperOutlinedIcon className={styles.NavIcon} style={{ color: "red" }} />
                    <h3>News Feed</h3>
                </div>
                <div className={styles.NavigationSideBarDiv}>
                    <Diversity3OutlinedIcon className={styles.NavIcon} style={{ color: "#FFC107" }} />
                    <h3>Groups</h3>
                </div>
                <div className={styles.NavigationSideBarDiv}>
                    <BookmarkBorderOutlinedIcon className={styles.NavIcon} style={{ color: "#4CAF50" }} />
                    <h3>Saved Posts</h3>
                </div>
                <div className={styles.NavigationSideBarDiv}>
                    <PeopleAltOutlinedIcon className={styles.NavIcon} style={{ color: "#2196F3" }} />
                    <h3>Friends</h3>
                </div>
                <div className={styles.NavigationSideBarDiv}>
                    <PersonAddOutlinedIcon className={styles.NavIcon} style={{ color: "#9C27B0" }} />
                    <h3>Suggestions</h3>
                </div>
            </div>
            <div className={styles.NavigationSideBar}>
                <h6>
                    Account
                </h6>
                <div className={styles.NavigationSideBarDiv}>
                    <SettingsIcon className={styles.NavIcon} style={{ color: "#FFC107" }} />
                    <h3>Settings</h3>
                </div>
                <div className={styles.NavigationSideBarDiv}>
                    <BarChartOutlinedIcon className={styles.NavIcon} style={{ color: "#4CAF50" }} />
                    <h3>Analytics</h3>
                </div>
                <div className={styles.NavigationSideBarDiv}>
                    <LogoutOutlinedIcon className={styles.NavIcon} style={{ color: "#F44336" }} />
                    <h3>Logout</h3>
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
