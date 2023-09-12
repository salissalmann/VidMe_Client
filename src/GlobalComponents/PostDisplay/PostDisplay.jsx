import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { GetPost } from './api';

import { LeftOutlined } from '@ant-design/icons';
import { parseISO, format, formatDistanceToNow } from 'date-fns';



export default function PostDisplay(props) {
    const [Post, setPost] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);



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
        console.log(
            'Post.Attachments.length - 1',
            Post.Attachments.length - 1,
        )
        if (Post.Attachments && currentImageIndex < Post.Attachments.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (Post.Attachments && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    useEffect(() => {
        GetPost(props.PostID)
            .then(async (res) => {
                const ResponseToJson = await res.json();
                if (ResponseToJson.Success) {
                    console.log(ResponseToJson.Post)
                    setPost(ResponseToJson.Post);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.PostID]);

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
                        </div>
                    </div>
                </div>
                </div>
            </>
            );
}


