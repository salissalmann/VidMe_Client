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
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { parseISO, format, formatDistanceToNow } from 'date-fns'
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

    function formatTimestamp(timestamp) {
        const parsedTimestamp = parseISO(timestamp.$date);
        const now = new Date();

        if (now - parsedTimestamp > 24 * 60 * 60 * 1000) {
            return format(parsedTimestamp, 'do MMM yy, hh:mma');
        } else {
            // Less than 24 hours, format as "time ago"
            return formatDistanceToNow(parsedTimestamp, { addSuffix: true });
        }
    } const MockPost = [
        {
            "_id": {
                "$oid": "64dbf6eb2c685d3ff0177ac6"
            },
            "Email": "salisbinsalman0@gmail.com",
            "UserLink": "/salisbinsalman0-645b8ae4-166d-4999-a689-e59d18546eab",
            "PostText": "Hi, I am Salis bin Salman and I am a React developer working on the MERN Stack. I love creating web applications using modern technologies.",
            "Attachments": [
                "https://premedpk-cdn.sgp1.digitaloceanspaces.com/Notes/58b112b9-23dd-49f9-a41c-8d6bc4ea3f91.png"
            ],
            "Likes": [],
            "Keywords": [
                "salis bin salman",
                "a react developer",
                "the mern stack.",
                "web applications",
                "modern technologies.",
                "modern"
            ],
            "Comments": [],
            "timestamp": {
                "$date": "2023-08-15T22:06:35.115Z"
            },
            "__v": 0
        },
        {
            "_id": {
                "$oid": "64dbf7292c685d3ff0177ac9"
            },
            "Email": "salisbinsalman0@gmail.com",
            "UserLink": "/salisbinsalman0-645b8ae4-166d-4999-a689-e59d18546eab",
            "PostText": "Network Interference: In some cases, network interference could lead to incorrect request payloads being received by the server. Try testing the application on different networks or using tools like Postman to ensure that the payloads being sent are correct.\n\nThird-Party Middleware: Review any third-party middleware you've integrated into your application. Some middleware might interfere with the handling of request payloads.",
            "Attachments": [
                "https://premedpk-cdn.sgp1.cdn.digitaloceanspaces.com/CustomImages/MDNUMS.png"
            ],
            "Likes": [],
            "Keywords": [
                "interference:",
                "cases,",
                "interference",
                "incorrect request payloads",
                "the server.",
                "testing",
                "the application",
                "different networks",
                "tools",
                "postman",
                "the payloads",
                "third-party middleware:",
                "any third-party middleware",
                "you've",
                "your application.",
                "some middleware",
                "the handling of request payloads.",
                "incorrect",
                "different",
                "correct."
            ],
            "Comments": [],
            "timestamp": {
                "$date": "2023-08-12T22:07:37.801Z"
            },
            "__v": 0
        }
    ]

    const MockRequests = [
        {
            "_id": {
                "$oid": "64dbfaee2c685d3f00177ad1"
            },
            "Email": "demo@premed.pk",
            "FullName" : "Demo Premed",
            "Title" : "React Developer",
            "ProfileImageLink" : "https://premedpk-cdn.sgp1.cdn.digitaloceanspaces.com/CustomImages/1.png"
        },
        {
            "_id": {
                "$oid": "64dc01cc2c685d3f00177ad2"
            },
            "Email": "Abdul Hai",
            "FullName" : "Abdul Hai",
            "Title" : "Angular Developer",
            "ProfileImageLink" : "https://premedpk-cdn.sgp1.cdn.digitaloceanspaces.com/CustomImages/2.png"
        },
        {
            "_id": {
                "$oid": "64dc9b3e2c685d3f00177ada"
            },
            "Email": "hasanmurad0@gmail.com",
            "FullName" : "Hasan Murad",
            "Title" : ".Net Developer",
            "ProfileImageLink" : "https://premedpk-cdn.sgp1.cdn.digitaloceanspaces.com/CustomImages/3.png"
        },  
    ]


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

                        {
                            MockPost.map((post) => {
                                return (
                                    <div className={styles.Post}>
                                        <div className={styles.PostDiv1}>
                                            <img src="/StaticImages/MockProfile.jpeg" alt="profile" className='PostProfileImage' />
                                            <div className={styles.PostDiv1Inner}>
                                                <h3>Salis Salman</h3>
                                                <p>{formatTimestamp(post.timestamp)}</p>
                                            </div>
                                        </div>
                                        <div className={styles.PostDiv2}>
                                            <p>{post.PostText}</p>
                                        </div>
                                        <div className={styles.PostImageContainer}>
                                            {post.Attachments.map((attachment) => {
                                                return (
                                                    <img src={attachment} alt="attachment" />
                                                )
                                            }
                                            )}
                                        </div>
                                        <div className={styles.LikeCommentContainer}>
                                            <div className={styles.LikeCommentDiv}>
                                                <ThumbUpOffAltIcon className={styles.LikeCommentIcon} />
                                                <p>Like</p>
                                            </div>
                                            <div className={styles.LikeCommentDiv}>
                                                <ModeCommentIcon className={styles.LikeCommentIcon} />
                                                <p>Comment</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                    <div className={styles.DashboardContainer3}>
                        <div className={styles.DashboardContainer3Div}>
                            <h6>Requests</h6>
                            {
                                MockRequests.map((request) => {
                                    return (
                                        <div className={styles.RequestsContainer}>
                                            <div className={styles.RequestsContainerDiv}>
                                                <img src={request.ProfileImageLink} alt="profile" className='NavProfileImage' />
                                                <div className={styles.PostDiv1Inner}>
                                                    <h3>{request.FullName}</h3>
                                                    <p>{request.Title}</p>
                                                </div>
                                                <div className={styles.RequestsContainerButtons}>
                                                    <button className={styles.AcceptButton}>Accept</button>
                                                    <button className={styles.RejectButton}>Reject</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
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
