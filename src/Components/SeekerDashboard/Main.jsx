import React, { useState } from 'react';
import styles from './styles.module.css';
import NavigationBar from '../../GlobalComponents/SeekerNavbar/Navbar';
import WindowIcon from '@mui/icons-material/Window';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExploreIcon from '@mui/icons-material/Explore';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ImageIcon from '@mui/icons-material/Image';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';

import { notification } from 'antd'
export default function Main() {

    const [postDescription, setdescription] = useState("")
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [file, setFile] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleVideoChange = (e) => {
        if (e.target.files[0].type !== "video/mp4") {
            notification.error({
                message: "Error",
                description: "Please upload a mp4 file"
            })
            return;
        }
        setVideo(e.target.files[0]);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.type !== "application/pdf") {
            notification.error({
                message: "Error",
                description: "Please upload a pdf file"
            })
            return;
        }
        setFile(file);
    };

    const Post = async () => {
        if (postDescription === "") {
            notification.error({
                message: "Error",
                description: "Please enter a description"
            })
            return;
        }
        const Reponse =
            await fetch("http://localhost:4002/create-post", {
                method: "POST",
                headers: {
                    "Authorization-Token": localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body:
                    JSON.stringify({
                        PostText: postDescription,
                    }),
            });
        const content = await Reponse.json();
        if (content.Success) {
            notification.success({
                message: "Success",
                description: "Posted Successfully"
            })
        }
        else {
            notification.error({
                message: "Error",
                description: content.Message
            })
        }
    }

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
                                <textarea type="text" placeholder="What's on your mind?"
                                    onChange={(e) => setdescription(e.target.value)} value={postDescription}
                                />
                            </div>
                            <div className={styles.AddPostDiv2}>
                                <div className={styles.AddPostDiv2Inner}>
                                    <div className={styles.AddPostDiv2InnerDiv} onClick={() => [document.getElementById('file1').click()]}>
                                        <input type="file" id="file1" onChange={handleImageChange} hidden

                                        />
                                        <ImageIcon className={styles.UploadIcon}
                                        /> Add Image
                                    </div>
                                    <div className={styles.AddPostDiv2InnerDiv} onClick={() => [document.getElementById('file2').click()]}>
                                        <input type="file" id="file2" onChange={handleVideoChange} hidden

                                        />
                                        <SwitchVideoIcon className={styles.UploadIcon} /> Add Video
                                    </div>
                                    <div className={styles.AddPostDiv2InnerDiv} onClick={() => [document.getElementById('file3').click()]}>
                                        <input type="file" id="file3" onChange={handleFileChange} hidden />
                                        <InsertLinkIcon className={styles.UploadIcon} /> Add File
                                    </div>
                                    {image &&
                                        <h6>
                                            {image.name}
                                        </h6>
                                    }
                                    {video &&
                                        <h6>
                                            {video.name}
                                        </h6>
                                    }
                                    {file &&
                                        <h6>
                                            {file.name}
                                        </h6>
                                    }
                                </div>
                                <button className={styles.PostButton}
                                    onClick={Post}>
                                    Create Post !
                                </button>
                            </div>
                        </div>
                        

                        <div className={styles.PostDisplay}>
                            
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
