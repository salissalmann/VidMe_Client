import React, { useState } from 'react';
import styles from './styles.module.css';
export default function Main() {

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
        </>
    )
}

