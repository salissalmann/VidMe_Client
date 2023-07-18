import React, { useState } from 'react';
import styles from './styles.module.css';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';


export default function Index() {
    dayjs.extend(customParseFormat);
    const monthFormat = 'YYYY/MM';

    const [jobTitle, setJobTitle] = useState('');
    const [employer, setEmployer] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [interests, setInterests] = useState([]);
    const [employments, setEmployments] = useState([]);
    const Navigate = useNavigate();

    const handleJobTitleChange = (event) => {
        setJobTitle(event.target.value);
    };

    const handleEmployerChange = (event) => {
        setEmployer(event.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const [skill, setSkill] = useState('')
    const [interest, setInterest] = useState('')

    const handleSkillChange = (event) => {
        setSkill(event.target.value);
    };

    const handleInterestChange = (event) => {
        setInterest(event.target.value);
    };


    const handleAddEmployment = () => {
        const newEmployment = {
            jobTitle: jobTitle,
            employer: employer,
            startDate: startDate,
            endDate: endDate,
            city: city,
            description: description,
        };

        setEmployments([...employments, newEmployment]);
        setJobTitle('');
        setEmployer('');
        setStartDate(null);
        setEndDate(null);
        setCity('');
        setDescription('');
    };

    const handleAddSkill = () => {
        setSkills([...skills, skill]);
        setSkill('');
    };

    const handleAddInterest = () => {
        setInterests([...interests, interest]);
        setInterest('');
    };

    const handleRemoveEmployment = (index) => {
        const updatedEmployments = employments.filter((_, i) => i !== index);
        setEmployments(updatedEmployments);
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };

    const handleRemoveInterest = (index) => {
        const updatedInterests = interests.filter((_, i) => i !== index);
        setInterests(updatedInterests);
    };



    return (
        <>
            <div className={styles.CreateProfile}>
                <div className={styles.Container}>
                    <div className={styles.SideContainerv1}>
                        <h5>Add Employment Information</h5>
                        <p>Display your recent (10 years) relevant experience. Giving information boosts your possibility of attracting employers</p>

                        <div className={styles.EmployementDiv}>
                            <div className={styles.Form}>
                                <h6>Job Title</h6>
                                <input
                                    placeholder="e.g. Full Stack Developer"
                                    className={styles.EmployementField}
                                    type="text"
                                    value={jobTitle}
                                    onChange={handleJobTitleChange}
                                />
                            </div>
                            <div className={styles.Form}>
                                <h6>Employer</h6>
                                <input
                                    placeholder="e.g. VidMe"
                                    className={styles.EmployementField}
                                    type="text"
                                    value={employer}
                                    onChange={handleEmployerChange}
                                />
                            </div>
                        </div>

                        <div className={styles.EmployementDiv}>
                            <div className={styles.FormX}>
                                <div className={styles.Form}>
                                    <h6>Start Date</h6>
                                    <DatePicker
                                        format={monthFormat}
                                        picker="month"
                                        className={styles.EmployementField}
                                        onChange={handleStartDateChange}
                                        value={startDate}
                                    />
                                </div>
                                <div className={styles.Form}>
                                    <h6>End Date</h6>
                                    <DatePicker
                                        defaultValue={dayjs('2015/01', monthFormat)}
                                        format={monthFormat}
                                        picker="month"
                                        className={styles.EmployementField}
                                        onChange={handleEndDateChange}
                                        value={endDate}
                                    />
                                </div>
                            </div>
                            <div className={styles.Form}>
                                <h6>City</h6>
                                <input
                                    placeholder="e.g. London"
                                    className={styles.EmployementField}
                                    type="text"
                                    value={city}
                                    onChange={handleCityChange}
                                />
                            </div>
                        </div>

                        <div className={styles.DescDiv}>
                            <h6>Description</h6>
                            <textarea
                                placeholder="e.g. I am a software engineer with 5 years of experience in the field of software development. I have worked on multiple projects and have a good understanding of the software development life cycle."
                                className={styles.TextFieldProf}
                                type="text"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                            <div className={styles.DescDiv2}>
                                <button onClick={handleAddEmployment}>Add Employment</button>
                            </div>
                        </div>

                        <h5>Add Skills</h5>
                        <p>Display your skills (minimum 10)</p>
                        <div className={styles.EmployementDiv2}>
                            <input
                                placeholder="e.g. React.js"
                                className={styles.EmployementField}
                                type="text"
                                value={skill}
                                onChange={handleSkillChange}
                            />
                            <button onClick={handleAddSkill}>Add Skill</button>
                        </div>

                        <h5>Add Interests</h5>
                        <p>Display your interests (any 3)</p>
                        <div className={styles.EmployementDiv2}>
                            <input
                                placeholder="e.g. Information and Technology"
                                className={styles.EmployementField}
                                type="text"
                                value={interest}
                                onChange={handleInterestChange}
                            />
                            <button onClick={handleAddInterest}>Add Interest</button>
                        </div>
                    </div>
                    <div className={styles.SideContainerv2}>
                        <h5>Employment History</h5>
                        {employments.length===0 &&
                            <div className={styles.PreviewItem}>
                            <div className={styles.PreviewTop}>
                                    <h6><b>Software Engineer</b> at Google, New York </h6>
                                    <div className={styles.deleteBtn}><DeleteOutlined /></div>
                                </div>
                                <p className={styles.previewDate}>Jan-2013 - Oct-2023</p>
                                <p className={styles.previewDesc}>
                                    I am a software engineer with 5 years of experience in the field of software development. I have worked on multiple projects and have a good understanding of the software development life cycle.
                                </p>
                            </div>    
                        }
                        {employments.map((employment, index) => (
                            <div key={index} className={styles.PreviewItem}>
                                <div className={styles.PreviewTop}>
                                    <h6><b>{employment.jobTitle}</b> at {employment.employer}, {employment.city}</h6>
                                    <div className={styles.deleteBtn} onClick={() => handleRemoveEmployment(index)}><DeleteOutlined /></div>
                                </div>
                                <p className={styles.previewDate}>{formatMonthYear(employment.startDate?.toString())} - {formatMonthYear(employment.endDate?.toString())}</p>
                                <p className={styles.previewDesc}>{employment.description}</p>
                            </div>
                        ))}

                        <div>
                            <h5>Skills</h5>
                            <div className={styles.PreviewSkills}>
                            {skills.length===0 &&
                                <div className={styles.PreviewBox}>
                                    <p>Skills Preview</p>
                                    <div className={styles.deleteBtn}><DeleteOutlined /></div>
                                </div>
                            }
                            
                            {skills.map((skill, index) => (
                                <div key={index} className={styles.PreviewBox}>
                                    <p>{skill}</p>
                                    <div className={styles.deleteBtn} onClick={() => handleRemoveSkill(index)}><DeleteOutlined /></div>
                                </div>
                            ))}
                                </div>
                        </div>

                        <div>
                            <h5>Interests</h5>
                            <div className={styles.PreviewSkills}>
                            {interests.length===0 &&
                                <div className={styles.PreviewBox}>
                                    <p>Interests Preview</p>
                                    <div className={styles.deleteBtn}><DeleteOutlined /></div>
                                </div>
                            }
                            {interests.map((interest, index) => (
                                <div key={index} className={styles.PreviewBox}>
                                    <p>{interest}</p>
                                    <div className={styles.deleteBtn} onClick={() => handleRemoveInterest(index)}><DeleteOutlined /></div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.Footer}>&copy; 2023 VidMe. All rights reserved.</div>
        </>
    );
}


function formatMonthYear(date) {
    const monthYear = new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });

    const [month, year] = monthYear.split(' ');
    return `${month}-${year}`;
}
