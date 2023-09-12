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
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { CloseCircleOutlined } from '@ant-design/icons'
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { CaretDownOutlined, GlobalOutlined } from '@ant-design/icons'
import { ShareAltOutlined } from '@ant-design/icons';

import PostDisplay from '../../GlobalComponents/PostDisplay/PostDisplay';

import { useNavigate } from 'react-router-dom';



export default function Main() {
    

    const [postDescription, setdescription] = useState("")
    const [CreatePostModalOpen, SetCreatePostModalOpen] = useState(false)
    const [ViewPost ,  SetViewPost ]  = useState(false)
    const [PostDisplayID , SetPostDisplayID] = useState("") 

    function formatTimestamp(timestamp) {
        const parsedTimestamp = parseISO(timestamp.$date);
        const now = new Date();

        if (now - parsedTimestamp > 24 * 60 * 60 * 1000) {
            return format(parsedTimestamp, 'do MMM yy, hh:mma');
        } else {
            // Less than 24 hours, format as "time ago"
            return formatDistanceToNow(parsedTimestamp, { addSuffix: true });
        }
    } 

    
    
    const MockPost = [
        {
            "_id": "64dbf6eb2c685d3ff0177ac6",
            "Email": "salisbinsalman0@gmail.com",
            "UserLink": "/salisbinsalman0-645b8ae4-166d-4999-a689-e59d18546eab",
            "PostText": "Hi, I am Salis bin Salman and I am a React developer working on the MERN Stack. I love creating web applications using modern technologies.",
            "Attachments": [
                "https://premedpk-cdn.sgp1.digitaloceanspaces.com/Notes/58b112b9-23dd-49f9-a41c-8d6bc4ea3f91.png",
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
            "_id":"64dbf7292c685d3ff0177ac9",
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
            "FullName": "Demo Premed",
            "Title": "React Developer",
            "ProfileImageLink": "https://premedpk-cdn.sgp1.cdn.digitaloceanspaces.com/CustomImages/1.png"
        },
        {
            "_id": {
                "$oid": "64dc01cc2c685d3f00177ad2"
            },
            "Email": "Abdul Hai",
            "FullName": "Abdul Hai",
            "Title": "Angular Developer",
            "ProfileImageLink": "https://premedpk-cdn.sgp1.cdn.digitaloceanspaces.com/CustomImages/2.png"
        },
        {
            "_id": {
                "$oid": "64dc9b3e2c685d3f00177ada"
            },
            "Email": "hasanmurad0@gmail.com",
            "FullName": "Hasan Murad",
            "Title": ".Net Developer",
            "ProfileImageLink": "https://premedpk-cdn.sgp1.cdn.digitaloceanspaces.com/CustomImages/3.png"
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
                                    onClick={() => {
                                        SetCreatePostModalOpen(true)
                                    }}
                                    onChange={(e) => setdescription(e.target.value)} value={postDescription}
                                />
                            </div>
                            <div className={styles.AddPostDiv2}>
                                <div className={styles.AddPostDiv2Inner}>
                                </div>
                                <button className={styles.PostButton}
                                    onClick={() => {
                                        SetCreatePostModalOpen(true)
                                    }}>
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
                                            <div className={styles.LikeCommentDiv} onClick={
                                                () => {
                                                    SetPostDisplayID(post._id)
                                                    SetViewPost(true)
                                                }
                                            }>
                                                <ModeCommentIcon className={styles.LikeCommentIcon} />
                                                <p>Comment</p>
                                            </div>
                                            <div className={styles.LikeCommentDiv}>
                                                <ShareAltOutlined className={styles.LikeCommentIcon}/>
                                                <p>Repost</p>
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

            {CreatePostModalOpen &&
                <CreatePost closeModal={() => {
                    SetCreatePostModalOpen(false);
                }} />
            }

            {ViewPost &&
                <PostDisplay 
                closeModal={() => {
                    SetViewPost(false);
                }}
                PostID={PostDisplayID}
                />
            }
        </>
    )
}

const GenerateUsername = (firstName, lastName) => {
    let username = firstName + "-" + lastName;
    username = "@" + username

    return username.toLowerCase();
}


const CreatePost = ({ closeModal }) => {

    const [visibility, setvisibility] = useState("Public")

    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [error, seterror] = useState(null);

    const [ViewVisibilityModal, SetVisibilityModal] = useState(false)

    const handleImageUpload = (e) => {
        if (images.length > 4) {
            notification.error({
                message: "Error",
                description: "You can only upload 5 images"
            })
            seterror("You can only upload 5 images")
        }
        else if (!images) {
            setImages(e.target.files[0]);
        }
        else {
            setImages([...images, e.target.files[0]]);
        }
    };

    const handleVideoUpload = (e) => {
        if (!video) {
            setVideo(e.target.files[0]);
        }
    };

    const handlePdfUpload = (e) => {
        if (!pdf) {
            setPdf(e.target.files[0]);
        }
    };

    const handleDeleteImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleDeleteVideo = (index) => {
        setVideo(null);
    };

    return (
        <>
            {!ViewVisibilityModal &&
                <div className={styles.PopupContainer}>
                    <div className={styles.Popup}>
                        <div className={styles.PostNavbar}>
                            <img src="/StaticImages/MockProfile.jpeg" alt="profile" className='NavProfileImage' />
                            <div>
                                <h3>Salis Salman</h3>
                                <div className={styles.publicbox} style={{
                                    display: 'flex',
                                    flexDirection: "row",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: '5px',
                                    padding: '5px',
                                    paddingBottom: "0px",
                                    width: '100%',
                                    cursor: 'pointer',
                                    gap: "0.5rem",
                                    marginLeft: "-0.3rem"
                                }}
                                    onClick={() => {
                                        SetVisibilityModal(true)
                                    }}
                                >
                                    <GlobalOutlined className={styles.postIcon} />
                                    <h6>{visibility}</h6>
                                    <CaretDownOutlined className={styles.postIcon} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.PopupContent}>
                            <h6>What on your mind?</h6>
                        </div>
                        <div className={styles.PopupContent}>
                            <textarea
                                className={styles.PopupTextArea}
                                placeholder="Type your confusion here..."
                                onChange={(e) => {
                                }}
                            />
                        </div>

                        {images.length > 0 && (
                            <div className={styles.Gallery}>
                                {images.map((image, index) => (
                                    <div key={index} className={styles.ImageContainer}>
                                        <img src={URL.createObjectURL(image)} alt="post" />
                                        <CloseCircleOutlined
                                            className={styles.DeleteIcon}
                                            onClick={() => handleDeleteImage(index)}
                                        />
                                    </div>))}
                                {images.length >= 1 &&
                                    <div className={styles.ImageContainer}>
                                        <img src="/PostAdd.png" alt="postadd" onClick={() => {
                                            if (images.length > 4) {
                                                notification.error({
                                                    message: "Error",
                                                    description: "You can only upload 5 images"
                                                })
                                                seterror("You can only upload 5 images")
                                                return
                                            }
                                            document.getElementById('file4').click()
                                        }} />
                                    </div>
                                }
                            </div>
                        )}

                        <div className={styles.Gallery}>
                            {video && (
                                <div className={styles.ImageContainer}>
                                    <video controls><source src={URL.createObjectURL(video)} type="video/mp4" /></video>
                                    <CloseCircleOutlined
                                        className={styles.DeleteIcon}
                                        onClick={() => handleDeleteVideo()}
                                    />
                                </div>
                            )}
                            {pdf && (
                                <>
                                    <div className={styles.PDFViewButton} onClick={() => {
                                        window.open(URL.createObjectURL(pdf))
                                    }}>
                                        View PDF
                                    </div>
                                    <div className={styles.PDFViewButton} onClick={() => {
                                        setPdf(null)
                                    }}
                                        style={{
                                            backgroundColor: 'red'
                                        }}
                                    >
                                        Remove PDF
                                    </div>
                                </>
                            )}
                        </div>




                        <div className={styles.MediaButtonContainer}>
                            <div className={styles.MediaButton} id={styles.ImageBtn} onClick={() => { document.getElementById('file4').click() }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="file4"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                                <ImageIcon className={styles.MediaIcon} />
                                <h6>Image</h6>
                            </div>
                            <div className={styles.MediaButton} id={styles.VideoBtn} onClick={() => { document.getElementById('file5').click() }}>
                                <input
                                    type="file"
                                    accept="video/*"
                                    id="file5"
                                    onChange={handleVideoUpload}
                                    style={{ display: 'none' }}
                                />
                                <SwitchVideoIcon className={styles.MediaIcon} />
                                <h6>Video</h6>
                            </div>
                            <div className={styles.MediaButton} id={styles.DocumentBtn} onClick={() => { document.getElementById('file6').click() }}>
                                <input
                                    type="file"
                                    id="file6"
                                    accept=".pdf"
                                    onChange={handlePdfUpload}
                                    style={{ display: 'none' }}
                                />
                                <InsertLinkIcon className={styles.MediaIcon} />
                                <h6>File</h6>
                            </div>
                        </div>
                        <span>{error}</span>
                        <div className={styles.PopupButtons}>
                            <div className={styles.PopupButton}
                                onClick={() => {
                                    closeModal()
                                }}
                            >
                                <h6>Cancel</h6>
                            </div>
                            <div className={styles.PopupButton2} >
                                <h6>Post</h6>
                            </div>
                        </div>
                    </div>
                </div>}

            {ViewVisibilityModal &&
                <div className={styles.PopupContainer}>
                    <div className={styles.Popup}>
                        <div className={styles.PostNavbar}>
                            <img src="/StaticImages/MockProfile.jpeg" alt="profile" className='NavProfileImage' />
                            <div>
                                <h3>Salis Salman</h3>
                                <div className={styles.publicbox} style={{
                                    display: 'flex',
                                    flexDirection: "row",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: '5px',
                                    padding: '5px',
                                    paddingBottom: "0px",
                                    width: '100%',
                                    cursor: 'pointer',
                                    gap: "0.5rem",
                                    marginLeft: "-0.3rem"
                                }}>
                                    <GlobalOutlined className={styles.postIcon} />
                                    <h6>{visibility}</h6>
                                    <CaretDownOutlined className={styles.postIcon} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.PopupContent}>
                            <h6>Who can see this?</h6>
                        </div>
                        <div className={styles.PopupContent}>
                            <div className={styles.VisibilityContainer}>
                                <div className={styles.VisibilityContainerDiv} onClick={() => {setvisibility("Public")}}>
                                    <div style={{display:'flex'  , gap:"0.2rem"}}>
                                        <GlobalOutlined className={styles.holderIcon} />
                                        <h6>Public</h6>
                                    </div>
                                    {visibility==="Public" ? <CircleIcon className={styles.holderIconO} /> : <CircleOutlinedIcon className={styles.holderIconC} />}
                                </div>
                                <div className={styles.VisibilityContainerDiv} onClick={() => {setvisibility("Connection")}}>
                                    <div style={{display:'flex' , gap:"0.2rem"}}>
                                        <PeopleAltIcon  className={styles.holderIcon} style={{
                                            marginTop: "-0.3rem"
                                        }}
                                            />
                                        <h6>Connections</h6>
                                    </div>
                                    {visibility==="Connection" ? <CircleIcon className={styles.holderIconO} /> : <CircleOutlinedIcon className={styles.holderIconC} />}                                        
                                </div>
                                <div className={styles.VisibilityContainerDiv} onClick={() => {setvisibility("Only Me")}}>
                                    <div style={{display:'flex' , gap:"0.2rem"}}>
                                        <VisibilityOffOutlinedIcon className={styles.holderIcon} style={{
                                            marginTop: "-0.2rem"
                                        }} />
                                        <h6>Only Me</h6>
                                    </div>
                                    {visibility==="Only Me" ? <CircleIcon className={styles.holderIconO}
                                    
                                     /> : <CircleOutlinedIcon className={styles.holderIconC} />}
                                </div>
                            </div>
                        </div>
                        <div className={styles.PopupButtons}>
                            <div className={styles.PopupButton}
                                onClick={() => {
                                    SetVisibilityModal(false)
                                }}
                            >
                                <h6>Cancel</h6>
                            </div>
                            <div className={styles.PopupButton2} onClick={() => {
                                SetVisibilityModal(false)
                            }} >
                                <h6>Done</h6>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </>
    )
}