import React, { useState } from 'react';
import styles from './styles.module.css';
import NavigationBar from '../../GlobalComponents/SeekerNavbar/Navbar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ImageIcon from '@mui/icons-material/Image';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { parseISO, format, formatDistanceToNow } from 'date-fns'
import { notification } from 'antd'

import { CloseCircleOutlined } from '@ant-design/icons'
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { CaretDownOutlined, GlobalOutlined } from '@ant-design/icons'
import { ShareAltOutlined } from '@ant-design/icons';
import PostDisplay from '../../GlobalComponents/PostDisplay/PostDisplay';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import LeftSideBar from '../../GlobalComponents/Dashboard-LeftSideBar/Dash-SideBar-L'
import Requests from '../../GlobalComponents/Requests/Requests'



export default function Main() {


    const [postDescription, setdescription] = useState("")
    const [CreatePostModalOpen, SetCreatePostModalOpen] = useState(false)
    const [ViewPost, SetViewPost] = useState(false)
    const [PostDisplayID, SetPostDisplayID] = useState("")
    const [CreatePollModalOpen, SetCreatePollModalOpen] = useState(false)
    const [CreateEventModal, SetCreateEventModalOpen] = useState(false)
    const [CreateArticleModal, SetCreateArticleModalOpen] = useState(false)

    function formatTimestamp(timestamp) {
        const parsedTimestamp = parseISO(timestamp.$date);
        const now = new Date();

        if (now - parsedTimestamp > 24 * 60 * 60 * 1000) {
            return format(parsedTimestamp, 'do MMM yy, hh:mma');
        } else {
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
                "https://premedpk-cdn.sgp1.digitaloceanspaces.com/Notes/58b112b9-23dd-49f9-a41c-8d6bc4ea3f91.png",
                "https://premedpk-cdn.sgp1.digitaloceanspaces.com/Notes/58b112b9-23dd-49f9-a41c-8d6bc4ea3f91.png",
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
            "_id": "64dbf7292c685d3ff0177ac9",
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



    return (
        <>
            <NavigationBar />


            <div className={styles.DashWrapper}>
                <div className={styles.DashboardDivsContainer}>
                    <div className={styles.DashboardContainer1}>
                        <LeftSideBar />
                    </div>
                    <div className={styles.DashboardContainer2}>
                        <div className={styles.AddPost}>
                            <div className={styles.AddPostDiv}>
                                <img src="/StaticImages/MockProfile.jpeg" alt="profile" className='NavProfileImage' />
                                <textarea type="text" placeholder="Create Post?"
                                    onClick={() => {
                                        SetCreatePostModalOpen(true)
                                    }}
                                    onChange={(e) => setdescription(e.target.value)} value={postDescription}
                                />
                            </div>
                            <div className={styles.AddPostDiv2}>
                                <div className={styles.PostButton}
                                    onClick={() => { SetCreatePostModalOpen(true) }}>
                                    <EditOutlinedIcon />
                                    Create Post
                                </div>
                                <div className={styles.PostButton2}
                                    onClick={() => { SetCreatePollModalOpen(true) }}
                                >
                                    <CheckCircleOutlineOutlinedIcon />
                                    Create Poll
                                </div>
                                <div className={styles.PostButton3}
                                    onClick={() => { SetCreateEventModalOpen(true) }}
                                >
                                    <EventAvailableOutlinedIcon />
                                    Create Event
                                </div>
                                <div className={styles.PostButton4}
                                    onClick={() => { SetCreateArticleModalOpen(true) }}
                                >
                                    <ArticleOutlinedIcon />
                                    Create Article
                                </div>
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
                                                <ShareAltOutlined className={styles.LikeCommentIcon} />
                                                <p>Repost</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.DashboardContainer3}>
                        <Requests />
                    </div>
                </div>
            </div>

            {CreatePostModalOpen &&
                <CreatePost closeModal={() => {
                    SetCreatePostModalOpen(false);
                }} />
            }

            {CreatePollModalOpen &&
                <CreatePoll closeModal={() => {
                    SetCreatePollModalOpen(false);
                }} />
            }

            {CreateEventModal &&
                <CreateEvent closeModal={() => {
                    SetCreateEventModalOpen(false);
                }} />
            }

            {CreateArticleModal &&
                <CreateArticle closeModal={() => {
                    SetCreateArticleModalOpen(false);
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
                                <div className={styles.VisibilityContainerDiv} onClick={() => { setvisibility("Public") }}>
                                    <div style={{
                                        display: 'flex', gap: "0.2rem",
                                    }}>
                                        <GlobalOutlined className={styles.holderIcon} style={{
                                            marginTop: "0.1rem"
                                        }} />
                                        <h6>Public</h6>
                                    </div>
                                    {visibility === "Public" ? <CircleIcon className={styles.holderIconO} /> : <CircleOutlinedIcon className={styles.holderIconC} />}
                                </div>
                                <div className={styles.VisibilityContainerDiv} onClick={() => { setvisibility("Connection") }}>
                                    <div style={{ display: 'flex', gap: "0.2rem" }}>
                                        <PeopleAltIcon className={styles.holderIcon} style={{
                                            marginTop: "-0.3rem"
                                        }}
                                        />
                                        <h6>Connections</h6>
                                    </div>
                                    {visibility === "Connection" ? <CircleIcon className={styles.holderIconO} /> : <CircleOutlinedIcon className={styles.holderIconC} />}
                                </div>
                                <div className={styles.VisibilityContainerDiv} onClick={() => { setvisibility("Private") }}>
                                    <div style={{ display: 'flex', gap: "0.2rem" }}>
                                        <VisibilityOffOutlinedIcon className={styles.holderIcon} style={{
                                            marginTop: "-0.2rem"
                                        }} />
                                        <h6>Private</h6>
                                    </div>
                                    {visibility === "Private" ? <CircleIcon className={styles.holderIconO}

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

const CreatePoll = ({ closeModal }) => {

    const [PollQuestion, SetPollQuestion] = useState("")
    const [Option, SetOption] = useState("")
    const [Options, SetOptions] = useState([])

    const [PollDuration, SetPollDuration] = useState("")

    const HandlePollQuestion = (e) => {

        if (e.target.value.length > 100) {
            notification.error({
                message: "Error",
                description: "Poll question can only be 100 characters long"
            })
            return
        }

        SetPollQuestion(e.target.value)
    }

    const HandleOptions = () => {

        if (Option === "" || Option === null || Option === undefined) {
            notification.error({
                message: "Error",
                description: "Please enter an option"
            })
            return
        }

        SetOptions([
            ...Options,
            Option
        ])

        SetOption("")
    }

    const HandlePollDuratation = (e) => {
        SetPollDuration(e.target.value)
    }

    return (
        <>
            <div className={styles.PopupContainer}>
                <div className={styles.Popup}>
                    <div className={styles.PostNavbar}>
                        <h5>Create a Poll</h5>
                    </div>
                    <div className={styles.PollContainer}>
                        <div className={styles.PollQuestion}>
                            <h6>Question</h6>
                            <textarea
                                className={styles.PollQuestionTextArea}
                                placeholder="Type your question here..."
                                onChange={HandlePollQuestion}
                                value={PollQuestion}
                            />

                        </div>
                    </div>

                    <div className={styles.PollContainer}>
                        <div className={styles.PollQuestion}>
                            <h6>Options</h6>
                            <div className={styles.PollOption}>
                                <input type="text" placeholder="Option" onChange={(event) => SetOption(event.target.value)} value={Option} />
                                <button
                                    className={styles.PollOptionButton}
                                    onClick={HandleOptions}
                                >
                                    <AddIcon />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.PollContainer}>
                        <div className={styles.PollQuestion}>
                            <h6>Your Options</h6>
                            <div className={styles.PollOptionDisplay}>
                                {Options.map((option, index) => {
                                    return (
                                        <div className={styles.PollOptionDiv}>
                                            <div className={styles.PollOptionsInnerDiv}>
                                                <h6>{index + 1}. </h6>
                                                <h6>{option.slice(
                                                    0,
                                                    65,
                                                )}
                                                    {option.length > 65
                                                        ? <span>...</span>
                                                        : null}

                                                </h6>
                                            </div>
                                            <RemoveIcon
                                                className={styles.RemoveBtn}
                                                onClick={() => {
                                                    const newOptions = [...Options];
                                                    newOptions.splice(Options.indexOf(option), 1);
                                                    SetOptions(newOptions);
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className={styles.PollContainer}>
                            <div className={styles.PollQuestion}>
                                <h6>Poll Duration</h6>
                                <div className={styles.PollOption}>
                                    <select
                                        className={styles.PollDurationSelect}
                                        onChange={HandlePollDuratation}
                                        value={PollDuration}
                                    >
                                        <option value="1 Day">1 Day</option>
                                        <option value="2 Days">2 Days</option>
                                        <option value="3 Days">3 Days</option>
                                        <option value="1 Week">1 Week</option>
                                        <option value="2 Weeks">2 Weeks</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className={styles.PopupButtons}>
                            <div className={styles.PopupButton}
                                onClick={() => {
                                    closeModal()
                                }}
                            >
                                <h6>Cancel</h6>
                            </div>
                            <div className={styles.PopupButton2} >
                                <h6>Add Poll</h6>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

const CreateEvent = ({ closeModal }) => {

    const [CoverImage, SetCoverImage] = useState("https://premedpk-cdn.sgp1.cdn.digitaloceanspaces.com/CustomImages/2.png")
    const [EventName, SetEventName] = useState("")
    const [EventType, SetEventType] = useState("")
    const [TimeZone, SetTimeZone] = useState('')
    const [StartDate, SetStartDate] = useState(new Date())
    const [StartTime, SetStartTime] = useState("")
    const [ShowEndTimeBox, SetShowEndTimeBox] = useState(false)
    const [EndDate, SetEndDate] = useState(new Date())
    const [EndTime, SetEndTime] = useState("")
    const [EventFormat, SetEventFormat] = useState("")
    const [EventDescription, SetEventDescription] = useState("")
    const [EventLink, SetEventLink] = useState("")
    const [Speakers, SetSpeakers] = useState([])

    const MockSpeakers = [
        {
            "_id": "64dbf6eb2c685d3ff0177ac6",
            "Name": "Bilal Khan",
            "UserLink": "/salisbinsalman0-645b8ae4-166d-4999-a689-e59d18546eab",
        },
        {
            "_id": "64dbf6eb2c685d3ff0177ac6",
            "Name": "Joe Doe",
            "UserLink": "/salisbinsalman0-645b8ae4-166d-4999-a689-e59d18546eab",
        },
        {
            "_id": "64dbf6eb2c685d3ff0177ac6",
            "Name": "Stark John",
            "UserLink": "/salisbinsalman0-645b8ae4-166d-4999-a689-e59d18546eab",
        }
    ]

    const HandleCoverImage = (e) => { SetCoverImage(URL.createObjectURL(e.target.files[0])) }
    const HandleEventName = (e) => { SetEventName(e.target.value) }
    const HandleEventType = (e) => { SetEventType(e.target.value) }
    const HandleEventFormat = (e) => { SetEventFormat(e.target.value) }
    const HandleTimeZone = (e) => { SetTimeZone(e.target.value) }
    const HandleStartDate = (e) => { SetStartDate(e.target.value) }
    const HandleStartTime = (e) => { SetStartTime(e.target.value) }
    const ShowHideEndTimeBox = (e) => { SetShowEndTimeBox(e.target.checked) }
    const HandleEndDate = (e) => { SetEndDate(e.target.value) }
    const HandleEndTime = (e) => { SetEndTime(e.target.value) }
    const HandleEventDescription = (e) => { SetEventDescription(e.target.value) }
    const HandleEventLink = (e) => { SetEventLink(e.target.value) }
    const HandleSpeaker = (e) => {
        SetSpeakers([
            ...Speakers,
            e.target.value
        ])
    }

    return (
        <>
            <div className={styles.PopupContainer}>
                <div className={styles.Popup}>
                    <div className={styles.PostNavbar}>
                        <h5>Create an Event</h5>
                    </div>
                    {CoverImage &&
                        <div className={styles.EventCoverImage}>
                            <img
                                src={CoverImage}
                                alt="cover"
                            />
                        </div>
                    }
                    <div className={styles.EventCoverImageButtons}>
                        <button className={styles.EventCoverImageAddButton} onClick={() => { document.getElementById('AddCover').click() }}>
                            <input type="file" name="" id="AddCover" onChange={HandleCoverImage} hidden />
                            <ImageIcon className={styles.EventCoverImageIcon} />
                            <h6>Upload Cover Image</h6>
                        </button>
                        {CoverImage &&
                            <button className={styles.EventCoverImageRemoveButton} onClick={() => { SetCoverImage(null) }}>
                                <ImageIcon className={styles.EventCoverImageIcon} />
                                <h6>Remove Cover Image</h6>
                            </button>}
                    </div>


                    <div className={styles.EventDetails}>
                        <div className={styles.PollQuestion}>
                            <h6>Event Name</h6>
                            <div className={styles.PollOption}>
                                <input type="text" placeholder="Event Name" onChange={HandleEventName} value={EventName} />
                            </div>
                        </div>
                        <div className={styles.PollQuestion}>
                            <h6>Event Type</h6>
                            <div className={styles.PollOption}>
                                <select
                                    className={styles.PollDurationSelect}
                                    onChange={HandleEventType}
                                    value={EventType}
                                >
                                    <option value="Webinar">Webinar</option>
                                    <option value="Seminar">Seminar</option>
                                    <option value="Conference">Conference</option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.PollQuestion}>
                            <h6>Event Format</h6>
                            <div className={styles.PollOption}>
                                <select onChange={HandleEventFormat} value={EventFormat} className={styles.PollDurationSelect}>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.PollQuestion}>
                            <h6>Time Zone</h6>
                            <select onChange={HandleTimeZone} value={TimeZone} className={styles.PollDurationSelect}>
                                <option value="Pakistan Standard Time">Pakistan Standard Time</option>
                                <option value="Central Standard Time">Central Standard Time</option>
                                <option value="Eastern Standard Time">Eastern Standard Time</option>
                                <option value="Pacific Standard Time">Pacific Standard Time</option>
                                <option value="Greenwich Mean Time">Greenwich Mean Time</option>
                            </select>
                        </div>
                        <div className={styles.EventDetailsDiv}>
                            <div>
                                <h6>Start Date</h6>
                                <input type="date" placeholder="Start Date" onChange={HandleStartDate} value={StartDate} />
                            </div>
                            <div>
                                <h6>Start Time</h6>
                                <input type="time" placeholder="Start Time" onChange={HandleStartTime} value={StartTime} />
                            </div>
                        </div>

                        <label
                            className={styles.EventDetailsLabel}
                        >
                            <input type="checkbox" onChange={ShowHideEndTimeBox} />
                            <h6>Add End Time</h6>
                        </label>



                        {ShowEndTimeBox &&
                            <div className={styles.EventDetailsDiv}>
                                <div>
                                    <h6>End Date</h6>
                                    <input type="date" placeholder="End Date" onChange={HandleEndDate} value={EndDate} />
                                </div>
                                <div>
                                    <h6>End Time</h6>
                                    <input type="time" placeholder="End Time" onChange={HandleEndTime} value={EndTime} />
                                </div>
                            </div>
                        }

                        <div className={styles.PollQuestion}>
                            <h6>Event Description</h6>
                            <textarea type="text" placeholder="Event Description" onChange={HandleEventDescription} value={EventDescription} />
                        </div>


                        <div className={styles.PollQuestion}>
                            <h6>Event Link</h6>
                            <div className={styles.PollOption}>
                                <input type="text" placeholder="Event Link" onChange={HandleEventLink} value={EventLink} />
                            </div>
                        </div>

                        <div className={styles.PollQuestion}>
                            <h6>Speakers</h6>
                            <select
                                className={styles.PollDurationSelect}
                                onChange={HandleSpeaker}
                                value={Speakers}
                            >
                                {MockSpeakers.map((speaker) => {
                                    return (
                                        <option value={speaker.Name}>{speaker.Name}</option>
                                    )
                                })}
                            </select>
                        </div>

                        {Speakers.length > 0 &&
                            <div className={styles.PollQuestion}>
                                <h6>Your Speakers</h6>
                                <div className={styles.PollOptionDisplay}>
                                    {Speakers.map((speaker, index) => {
                                        return (
                                            <div className={styles.PollOptionDiv}>
                                                <div className={styles.PollOptionsInnerDiv}>
                                                    <h6>{index + 1}. </h6>
                                                    <h6>{speaker.slice(
                                                        0,
                                                        65)}
                                                    </h6>
                                                </div>
                                                <RemoveIcon
                                                    className={styles.RemoveBtn}
                                                    onClick={() => {
                                                        const newSpeakers = [...Speakers];
                                                        newSpeakers.splice(Speakers.indexOf(speaker), 1);
                                                        SetSpeakers(newSpeakers);
                                                    }}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }

                        <div className={styles.PopupButtonsNew}>
                            <div className={styles.PopupButton}
                                onClick={() => {
                                    closeModal()
                                }}
                            >
                                <h6>Cancel</h6>
                            </div>
                            <div className={styles.PopupButton2} >
                                <h6>Add Event</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const CreateArticle = ({ closeModal }) => {
    const [CoverImage, SetCoverImage] = useState("https://premedpk-cdn.sgp1.cdn.digitaloceanspaces.com/CustomImages/2.png")
    const [ArticleTitle, SetArticleTitle] = useState("")
    const [ArticleDescription, SetArticleDescription] = useState("")

    const HandleCoverImage = (e) => { SetCoverImage(URL.createObjectURL(e.target.files[0])) }
    const HandleArticleTitle = (e) => { SetArticleTitle(e.target.value) }

    const HandleArticleDescription = (content) => {
        console.log(content)
        SetArticleDescription(content);
    }


    return (
        <>
            <div className={styles.PopupContainer}>
                <div className={styles.Popup}>
                    <div className={styles.PostNavbar}>
                        <h5>Create an Article</h5>
                    </div>
                    {CoverImage &&
                        <div className={styles.EventCoverImage}>
                            <img
                                src={CoverImage}
                                alt="cover"
                            />
                        </div>
                    }
                    <div className={styles.EventCoverImageButtons}>
                        <button className={styles.EventCoverImageAddButton} onClick={() => { document.getElementById('AddCover').click() }}>
                            <input type="file" name="" id="AddCover" onChange={HandleCoverImage} hidden />
                            <ImageIcon className={styles.EventCoverImageIcon} />
                            <h6>Upload Cover Image</h6>
                        </button>
                        {CoverImage &&
                            <button className={styles.EventCoverImageRemoveButton} onClick={() => { SetCoverImage(null) }}>
                                <ImageIcon className={styles.EventCoverImageIcon} />
                                <h6>Remove Cover Image</h6>
                            </button>}
                    </div>
                    <div className={styles.EventDetails}>
                        <div className={styles.PollQuestion}>
                            <h6>Article Title</h6>
                            <div className={styles.PollOption}>
                                <input type="text" placeholder="Article Title" onChange={HandleArticleTitle} value={ArticleTitle} />
                            </div>
                        </div>

                        <div className={styles.PollQuestion}>
                            <h6>Article Description</h6>
                            <ReactQuill
                                theme="snow"
                                onChange={HandleArticleDescription}
                                value={ArticleDescription}
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ['link', 'image'],
                                        ['clean']
                                    ],
                                }}
                                className={styles.Quill}
                            />
                        </div>
                    </div>

                    <div className={styles.PopupButtonsNew}>
                        <div className={styles.PopupButton}
                            onClick={() => {
                                closeModal()
                            }
                            }
                        >
                            <h6>Cancel</h6>
                        </div>
                        <div className={styles.PopupButton2} >
                            <h6>Add Article</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}










