import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { GetPost, AddComment, GetCommentById, AddReply } from './api';

import { LeftOutlined } from '@ant-design/icons';
import { parseISO, format, formatDistanceToNow } from 'date-fns';
import { SendOutlined, DownOutlined } from '@ant-design/icons';

import { notification } from 'antd'
import ErrorIcon from '@mui/icons-material/Error';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ModeCommentIcon from '@mui/icons-material/ModeComment';



export default function PostDisplay(props) {


    const [Post, setPost] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [CommentToBeAdded, SetCommentToBeAdded] = useState("")
    const [PostComments, SetPostComments] = useState([])
    const [CommentAddedSuccessfully, SetCommentAddedSuccessfully] = useState(0)

    const [ViewCommentReplies, SetViewCommentReplies] = useState(false)

    const [Reply, SetReply] = useState("")
    const [CommentID, SetCommentID] = useState("")
    const [AddReplyModal, SetAddReplyModal] = useState(false)


    useEffect(() => {
        GetPost(props.PostID)
            .then(async (res) => {
                const ResponseToJson = await res.json();
                if (ResponseToJson.Success) {
                    setPost(ResponseToJson.Post);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        GetCommentById(props.PostID).then(async (res) => {
            const ResponseToJson = await res.json();
            if (ResponseToJson.Success) {
                SetPostComments(ResponseToJson.Comments)
            }
        })
            .catch((err) => {
                console.log(err);
            });

    }, [CommentAddedSuccessfully]);



    function formatTimestamp(timestamp) {
        const parsedTimestamp = parseISO(timestamp);
        const now = new Date();

        if (now - parsedTimestamp > 24 * 60 * 60 * 1000) {
            return format(parsedTimestamp, 'do MMM yy, hh:mma');
        } else {
            return formatDistanceToNow(parsedTimestamp, { addSuffix: true });
        }
    }

    const nextImage = () => {
        if (Post.Attachments && currentImageIndex < Post.Attachments.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (Post.Attachments && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const HandleAddComment = (e) => { SetCommentToBeAdded(e.target.value) }
    const HandleReply = (e) => { SetReply(e.target.value) }



    const AddCommentToPost = () => {
        if (CommentToBeAdded === "") {
            notification.open({
                message: 'Empty Comment',
                description: "Please add a comment before posting",
                icon: <ErrorIcon style={{ color: 'red' }} />,
            })
            return
        }
        const data = {
            "PostId": props.PostID,
            "CommentText": CommentToBeAdded,
        }
        AddComment(data).then(
            async (res) => {
                const ResponseToJson = await res.json();
                if (ResponseToJson.Success) {
                    notification.open({
                        message: 'Comment Added',
                        description: ResponseToJson.Message,
                        icon: <DoneAllIcon style={{ color: '#108ee9' }} />,
                    })
                    SetCommentToBeAdded("")
                    SetCommentAddedSuccessfully(CommentAddedSuccessfully + 1)
                }
                else {
                    notification.open({
                        message: 'Error',
                        description: ResponseToJson.Message,
                        icon: <ErrorIcon style={{ color: 'red' }} />,
                    })
                }
            }
        )
    }

    const AddReplyToComment = (CommentID) => {
        if (Reply === "") {
            notification.open({
                message: 'Empty Reply',
                description: "Please add a reply before posting",
                icon: <ErrorIcon style={{ color: 'red' }} />,
            })
        }

        const data = {
            "CommentId": CommentID,
            "ReplyText": Reply,
        }
        AddReply(data).then(
            async (res) => {
                const ResponseToJson = await res.json();
                if (ResponseToJson.Success) {
                    notification.open({
                        message: 'Reply Added',
                        description: ResponseToJson.Message,
                        icon: <DoneAllIcon style={{ color: '#108ee9' }} />,
                    })
                    SetReply("")
                    SetCommentAddedSuccessfully(CommentAddedSuccessfully + 1)
                }
                else {
                    notification.open({
                        message: 'Error',
                        description: ResponseToJson.Message,
                        icon: <ErrorIcon style={{ color: 'red' }} />,
                    })
                }
            }
        )
    }

    const ShowReplyDiv = (id) => {
        SetAddReplyModal(true)
        SetCommentID(id)
    }


    return (
        <>
            <div className={styles.PostDisplayContainer}>
                <div className={styles.Popup}>
                    <div className={styles.PostPopup}>
                        <div className={styles.PostImagesDiv}>
                            <div className={styles.PostImageDiv}>
                                {Post.Attachments && Post.Attachments.length > 0 ? (
                                    <img src={Post.Attachments[currentImageIndex]} alt="" />
                                ) : (
                                    <p>No images available</p>
                                )}
                            </div>
                            <div className={styles.ImageMoveButtons}>
                                <button onClick={prevImage}><LeftOutlined /></button>
                                <button onClick={nextImage}><LeftOutlined style={{ transform: 'rotate(180deg)' }} /></button>
                            </div>
                        </div>
                        <div className={styles.PostDetailsDiv}>
                            <div className={styles.PostDivWrapper}>
                                <div className={styles.PostDiv1}>
                                    <img src="/StaticImages/MockProfile.jpeg" alt="profile" className='PostProfileImage' />
                                    <div className={styles.PostDiv1Inner}>
                                        <h3>Salis Salman</h3>
                                        {Post.timestamp && <p>{formatTimestamp(Post?.timestamp)}</p>}
                                    </div>
                                </div>
                                <div className={styles.ClosePopup}>
                                    <button onClick={props.closeModal}>X</button>
                                </div>
                            </div>

                            <div className={styles.PostTextDiv}>
                                <p>{Post?.PostText}</p>
                            </div>


                            <div className={styles.PostReactionsDiv}>
                                {PostComments &&
                                    PostComments.map((comment) => (
                                        <>
                                            <div className={styles.CommentDiv}>
                                                <div className={styles.CommentDiv1}>
                                                    <img src={comment.ProfilePicture} alt="profile" className={styles.CommentImage} />
                                                </div>
                                                <div className={styles.CommentTextDiv}>
                                                    <div className={styles.CommentDiv1Inner}>
                                                        <h3>{comment?.Name}</h3>
                                                        {comment.timestamp && <p>{formatTimestamp(comment?.timestamp)}</p>}
                                                    </div>
                                                    <div className={styles.CommentText}>
                                                        <p>{comment?.CommentText}</p>
                                                    </div>

                                                    <div className={styles.LikeHolder}>
                                                        <div className={styles.LikeDiv}>
                                                            <ThumbUpOffAltIcon className={styles.LikeIcon} />
                                                            <p>Like</p>
                                                        </div>
                                                        <div className={styles.LikeDiv} onClick={() => { ShowReplyDiv(comment._id) }}>
                                                            <ModeCommentIcon className={styles.LikeIcon} />
                                                            <p>Reply</p>
                                                        </div>
                                                        {comment?.Replies
                                                            &&
                                                            <div className={styles.LikeDiv} onClick={
                                                                () => {
                                                                    SetViewCommentReplies(!ViewCommentReplies)
                                                                }
                                                            }>
                                                                <p>{comment?.Replies.length} Replies</p>
                                                            </div>
                                                        }
                                                    </div>



                                                    <div className={styles.ReplyDiv}>
                                                        {ViewCommentReplies && comment?.Replies &&
                                                            <>
                                                                <h3 className={styles.DownIcon} >Replies </h3>                                                               {comment?.Replies.map((reply) => (
                                                                    <div className={styles.CommentDiv}>
                                                                        <div className={styles.CommentDiv1}>
                                                                            <img src={comment.ProfilePicture} alt="profile" className={styles.CommentImage} />
                                                                        </div>
                                                                        <div className={styles.CommentTextDiv}>
                                                                            <div className={styles.CommentDiv1Inner}>
                                                                                <h3>{comment?.Name}</h3>
                                                                                {comment.timestamp && <p>{formatTimestamp(comment?.timestamp)}</p>}
                                                                            </div>
                                                                            <div className={styles.CommentText}>
                                                                                <p>{comment?.CommentText}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </>
                                                        }
                                                    </div>


                                                    {AddReplyModal && (comment._id === CommentID) &&
                                                        <div className={styles.AddReplyBox}>
                                                            <input type="text" placeholder="Add a reply" value={Reply} onChange={HandleReply} />
                                                            <SendOutlined className={styles.CommentButton} onClick={() => {
                                                                SetAddReplyModal(false)
                                                                AddReplyToComment(comment._id)
                                                            }}
                                                            />
                                                        </div>
                                                    }


                                                </div>
                                            </div>
                                        </>
                                    ))}
                            </div>

                            <div className={styles.AddCommentBox}>
                                <input type="text" placeholder="Add a comment"
                                    value={CommentToBeAdded}

                                    onChange={HandleAddComment} />
                                <SendOutlined className={styles.CommentButton}
                                    onClick={AddCommentToPost}
                                />
                            </div>



                        </div >
                    </div>
                </div>
            </div>
        </>
    );
}


