import React from 'react';
import styles from './styles.module.css';
import NavigationBar from '../../GlobalComponents/SeekerNavbar/Navbar';
import LeftSideBar from '../../GlobalComponents/Dashboard-LeftSideBar/Dash-SideBar-L'
import Requests from '../../GlobalComponents/Requests/Requests'
import { useEffect, useState } from 'react';
import { GetSuggestions } from './endpoints';

export default function Main() {

    const [FriendSuggestion, SetSuggestions] = useState([])

    useEffect(() => {
        GetSuggestions().then(
            async (response) => {
                const Reponse = await response.json();
                console.log(Reponse.friendSuggestions)
                SetSuggestions(Reponse.friendSuggestions)
            }
        )
    }, [])


    return (
        <>
            <NavigationBar />


            <div className={styles.DashWrapper}>
                <div className={styles.DashboardDivsContainer}>
                    <div className={styles.DashboardContainer1}>
                        <LeftSideBar />
                    </div>
                    <div className={styles.DashboardContainer2}>
                        <Suggestions FriendSuggestion={FriendSuggestion} />
                    </div>
                    <div className={styles.DashboardContainer3}>
                        <Requests />
                    </div>
                </div>
            </div>


        </>
    )
}

const Suggestions = (props) => {

    return (
        <>
            <div className={styles.Title}>
                <h1>Suggestions</h1>
            </div>

            <div className={styles.SuggestionsContainer}>
                {props.FriendSuggestion.map((item, index) => {
                    return (
                        <div className={styles.SuggestionCard}>
                            <div className={styles.SuggestionImageContainer}>
                                <img src={item.ProfilePicture} alt="" />
                                <div className={styles.PostDiv1Inner}>
                                    <h4>{item.FirstName + " " + item.LastName}</h4>
                                    <h6>{item.WantedJob}</h6>
                                </div>
                            </div>
                            <div className={styles.SuggestionCardButton}>
                                <button>Connect</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
