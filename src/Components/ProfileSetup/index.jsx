import React, { useState } from 'react';
import styles from './styles.module.css';
import UploadIcon from '@mui/icons-material/Upload';
import { useNavigate } from 'react-router-dom';
import { Step1 } from './API'
import ErrorIcon from '@mui/icons-material/Error';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { notification } from 'antd'

export default function Index() {

    const [JobTitle, setJobTitle] = useState('');
    const [Gender, setGender] = useState('');
    const [Nationality, setNationality] = useState('');
    const [Country, setCountry] = useState('');
    const [City, setCity] = useState('');
    const [DateOfBirth, setDateOfBirth] = useState(null);
    const [professionalInfo, setprofessionalInfo] = useState('')
    const [Image, setImage] = useState(null);
    const Navigate = useNavigate();

    const handleJobTitle = (event) => { setJobTitle(event.target.value); };
    const handleGenderChange = (event) => { setGender(event.target.value); };
    const handleDateOfBirthChange = (event) => { setDateOfBirth(event.target.value); };
    const handleNationality = (event) => { setNationality(event.target.value); };
    const handleCountry = (event) => { setCountry(event.target.value); };
    const handleCity = (event) => { setCity(event.target.value); };
    const handleprofessionalInfo = (event) => { setprofessionalInfo(event.target.value); };
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };


    const ClickButton = () => {
        document.querySelector('input[type="file"]').click();
    };

    const NextStep = () => {
        const data = {
            "WantedJob": JobTitle,
            "Gender": Gender,
            "DOB": DateOfBirth,
            "Nationality": Nationality,
            "City": City,
            "Country": Country,
            'ProfessionalSummary': professionalInfo
        };

        const Response = Step1(data)
        if (Response.Success) {
            Navigate('/professional-profile', { replace: true })
        }
        else {
            notification.open({
                message: 'Error',
                description: 'Please fill all the fields',
                icon: <ErrorIcon style={{ color: 'red' }} />,
            })
        }

    }


    return (
        <>

            <div className={styles.CreateProfile}>

                <div className={styles.Container}>
                    <div className={styles.SideContainer1}>
                        <video src="/Cover.mp4" alt="Explore" autoPlay muted loop className={styles.Video} />
                    </div>
                    <div className={styles.SideContainer2}>
                        <h4>Personal Details</h4>

                        <div className={styles.PhotoUpload}>
                            {Image ? (
                                <img src={Image} alt="profile" width={100} height={100} />
                            ) : (

                                <img onClick={ClickButton} src='/StaticImages/ImageDisplay.png' alt="profile" width={100} height={100} />
                            )}
                            <div className={styles.UploadButton}>
                                <UploadIcon onClick={ClickButton} />
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    hidden
                                />
                                <h6 onClick={ClickButton}>Upload Profile Photo</h6>
                            </div>


                            <div className={styles.Details}>
                                <div className={styles.Form}>
                                    <h6>Wanted Job Title</h6>
                                    <input
                                        placeholder="e.g. Software Engineer"
                                        className={styles.InputField}
                                        type="text"
                                        value={JobTitle}
                                        onChange={handleJobTitle}
                                    />
                                </div>
                                <div className={styles.Form}>
                                    <h6>Gender</h6>
                                    <select
                                        value={Gender}
                                        onChange={handleGenderChange}
                                        className={styles.InputField}
                                        variant="outlined"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className={styles.Form}>
                                    <h6>Date of Birth</h6>
                                    <input
                                        placeholder='Date'
                                        type="date"
                                        className={styles.InputField}
                                        onChange={handleDateOfBirthChange}
                                    />
                                </div>

                                <div className={styles.Form}>
                                    <h6>Nationality</h6>
                                    <input
                                        placeholder="e.g. Pakistani"
                                        className={styles.InputField}
                                        type="text"
                                        value={Nationality}
                                        onChange={handleNationality}
                                    />
                                </div>
                                <div className={styles.Form}>
                                    <h6>Country</h6>
                                    <input
                                        placeholder="e.g. Pakistan"
                                        className={styles.InputField}
                                        type="text"
                                        value={Country}
                                        onChange={handleCountry}
                                    />
                                </div>
                                <div className={styles.Form}>
                                    <h6>City</h6>
                                    <input
                                        placeholder="e.g. Islamabad"
                                        className={styles.InputField}
                                        type="text"
                                        value={City}
                                        onChange={handleCity}
                                    />
                                </div>
                            </div>

                            <div className={styles.Details2}>
                                <h6>Professional Summary</h6>
                                <div>Write 2-4 short & energetic sentences to interest the reader!, Mention your role, experience & most importantly - your biggest achievements, best qualities and skills.</div>
                                <textarea
                                    placeholder="e.g. I am a software engineer with 5 years of experience in the field of software development. I have worked on multiple projects and have a good understanding of the software development life cycle."
                                    className={styles.TextField}
                                    type="text"
                                    value={professionalInfo}
                                    onChange={handleprofessionalInfo}
                                />

                            </div>

                            <div className={styles.Button}>
                                <button onClick={NextStep}>Next</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className={styles.Footer}>
                &copy; 2023 VidMe. All rights reserved.
            </div>

        </>
    );
}