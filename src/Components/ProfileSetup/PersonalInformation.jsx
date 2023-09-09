import React, { useState } from 'react';
import styles from './styles.module.css';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { Step3 } from './API'
import ErrorIcon from '@mui/icons-material/Error';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { notification } from 'antd'


export default function Index() {
    dayjs.extend(customParseFormat);
    const monthFormat = 'YYYY/MM';

    const Navigate = useNavigate();

    const [ProjectTitle, setProjectTitle] = useState('');
    const [ProjectLink, setProjectLink] = useState('');
    const [description, setDescription] = useState('');
    const [Projects, setProjects] = useState([]);

    const [institution, setinstitution] = useState('');
    const [EdstartDate, setEdStartDate] = useState(null);
    const [EdendDate, setEdEndDate] = useState(null);
    const [Edcity, setEdCity] = useState('');
    const [Eddescription, setEdDescription] = useState('');
    const [Educution, setEduction] = useState([])

    const [language, setLanguage] = useState('');
    const [languages, setLanguages] = useState([]);

    const [links, setLinks] = useState('');
    const [socialLinks, setSocialLinks] = useState([]);

    const [Certification, setCertification] = useState('')
    const [CertificationLink, setCertificationLink] = useState('')
    const [Certifications, setCertifications] = useState([])


    const handleProjectTitleChange = (event) => {
        setProjectTitle(event.target.value);
    };

    const handleProjectLinkChange = (event) => {
        setProjectLink(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleinstitution = (event) => {
        setinstitution(event.target.value);
    }

    const handleEdStartDateChange = (value) => {
        setEdStartDate(value);
    };

    const handleEdEndDateChange = (value) => {
        setEdEndDate(value);
    };

    const handleEdCityChange = (event) => {
        setEdCity(event.target.value);
    };

    const handleEdDescriptionChange = (event) => {
        setEdDescription(event.target.value);
    };

    const handleAddEducation = () => {
        const newEduction = {
            institution: institution,
            startDate: EdstartDate,
            endDate: EdendDate,
            city: Edcity,
            description: Eddescription,
        };
        console.log("new education", newEduction);
        setEduction([...Educution, newEduction]);
        setinstitution('');
        setEdStartDate(null);
        setEdEndDate(null);
        setEdCity('');
        setEdDescription('');
    };

    const handleAddProject = () => {
        const newProject = {
            ProjectTitle: ProjectTitle,
            ProjectLink: ProjectLink,
            description: description,
        };
        setProjects([...Projects, newProject]);
        setProjectTitle('');
        setProjectLink('');
        setDescription('');
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleAddLanguage = () => {
        setLanguages([...languages, language]);
        setLanguage('');
    };

    const handleLinksChange = (event) => {
        setLinks(event.target.value);
    };

    const handleAddLinks = () => {
        setSocialLinks([...socialLinks, links]);
        setLinks('');
    };

    const handleCertificationChange = (event) => {
        setCertification(event.target.value);
    };

    const handleCertificationLinkChange = (event) => {
        setCertificationLink(event.target.value);
    };

    const handleAddCertification = () => {
        const newCertification = {
            Certification: Certification,
            CertificationLink: CertificationLink,
        };
        setCertifications([...Certifications, newCertification]);
        setCertification('');
        setCertificationLink('');
    };

    const handleRemoveProject = (index) => {
        const updatedProjects = Projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
    };

    const handleRemoveEduction = (index) => {
        const updatedEduction = Educution.filter((_, i) => i !== index);
        setEduction(updatedEduction);
    };

    const handleRemoveLanguage = (index) => {
        const updatedLanguages = languages.filter((_, i) => i !== index);
        setLanguages(updatedLanguages);
    };

    const handleRemoveSocialLink = (index) => {
        const updatedSocialLinks = socialLinks.filter((_, i) => i !== index);
        setSocialLinks(updatedSocialLinks);
    };

    const handleRemoveCertification = (index) => {
        const updatedCertifications = Certifications.filter((_, i) => i !== index);
        setCertifications(updatedCertifications);
    };


    const Next = () => {
        const data = {
            Projects: Projects,
            Education: Educution,
            Certifications: Certifications,
            Languages: languages,
            SocialLinks: socialLinks
        };
        Step3(data).then(
            (Response) => {
                if (Response.Success) {
                    Navigate('/video-recorder', { replace: true })
                }
                else {
                    notification.open({
                        message: 'Error',
                        description: 'Please fill all the fields',
                        icon: <ErrorIcon style={{ color: 'red' }} />,
                    })
                }
            }
        )

    }



    return (
        <>
            <div className={styles.CreateProfile}>
                <div className={styles.Container}>
                    <div className={styles.SideContainerv1}>
                        <h5>Add Projects</h5>
                        <p>Display your projects to attract employers</p>
                        <div className={styles.EmployementDiv}>
                            <div className={styles.Form}>
                                <h6>Project Title</h6>
                                <input
                                    placeholder="e.g. VidMe"
                                    className={styles.EmployementField}
                                    type="text"
                                    value={ProjectTitle}
                                    onChange={handleProjectTitleChange}
                                />
                            </div>
                            <div className={styles.Form}>
                                <h6>Project Link</h6>
                                <input
                                    placeholder="e.g. https://www.google.com"
                                    className={styles.EmployementField}
                                    type="text"
                                    value={ProjectLink}
                                    onChange={handleProjectLinkChange}
                                />
                            </div>
                        </div>

                        <div className={styles.DescDiv}>
                            <h6>Description</h6>
                            <textarea
                                placeholder="e.g. VidMe is a video sharing platform"
                                className={styles.TextFieldProf}
                                type="text"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                            <div className={styles.DescDiv2}>
                                <button onClick={handleAddProject}>Add Project</button>
                            </div>
                        </div>

                        <h5>Add Education</h5>
                        <p>Display your education (minimum 1)</p>
                        <div className={styles.EmployementDiv}>
                            <div className={styles.Form}>
                                <h6>Institution</h6>
                                <input
                                    placeholder="e.g. University of California"
                                    className={styles.EmployementField}
                                    type="text"
                                    value={institution}
                                    onChange={handleinstitution}
                                />
                            </div>
                            <div className={styles.Form}>
                                <h6>City</h6>
                                <input
                                    placeholder="e.g. London"
                                    className={styles.EmployementField}
                                    type="text"
                                    value={Edcity}
                                    onChange={handleEdCityChange}
                                />
                            </div>
                        </div>

                        <div className={styles.EmployementDiv}>
                            <div className={styles.Form}>
                                <h6>Start Date</h6>
                                <DatePicker
                                    format={monthFormat}
                                    picker="month"
                                    className={styles.EmployementField}
                                    onChange={handleEdStartDateChange}
                                    value={EdstartDate}
                                />
                            </div>
                            <div className={styles.Form}>
                                <h6>End Date</h6>
                                <DatePicker
                                    defaultValue={dayjs('2015/01', monthFormat)}
                                    format={monthFormat}
                                    picker="month"
                                    className={styles.EmployementField}
                                    onChange={handleEdEndDateChange}
                                    value={EdendDate}
                                />
                            </div>
                        </div>

                        <div className={styles.DescDiv}>
                            <h6>Description</h6>
                            <textarea
                                placeholder="e.g. I have done my graduation in Computer Science"
                                className={styles.TextFieldProf}
                                type="text"
                                value={Eddescription}
                                onChange={handleEdDescriptionChange}
                            />
                            <div className={styles.DescDiv2}>
                                <button onClick={handleAddEducation}>Add Education</button>
                            </div>
                        </div>


                        <h5>Add Certifications</h5>
                        <p>Display your certifications (minimum 1)</p>
                        <div className={styles.EmployementDiv}>
                            <div className={styles.Form}>
                                <h6>Certification</h6>
                                <input
                                    placeholder="e.g. Google Cloud Platform Fundamentals"
                                    className={styles.EmployementField}
                                    type="text"
                                    value={Certification}
                                    onChange={handleCertificationChange}
                                />
                            </div>
                            <div className={styles.Form}>
                                <h6>Certification Link</h6>
                                <input
                                    placeholder="e.g. https://www.google.com"
                                    className={styles.EmployementField}
                                    type="text"
                                    value={CertificationLink}
                                    onChange={handleCertificationLinkChange}
                                />
                            </div>
                        </div>

                        <div className={styles.DescDiv}>
                            <div className={styles.DescDiv2}>
                                <button onClick={handleAddCertification}>Add Certification</button>
                            </div>
                        </div>


                        



                        <h5>Add Social Links</h5>
                        <p>Add your social links (minimum 1)</p>
                        <div className={styles.EmployementDiv2}>
                            <input
                                placeholder="e.g. https://www.vidMe.com/bot"
                                className={styles.EmployementField}
                                type="text"
                                value={links}
                                onChange={handleLinksChange}
                            />
                            <button onClick={handleAddLinks}>Add Link</button>
                        </div>

                        <h5>Add Languages</h5>
                        <p>Add your languages (minimum 1)</p>
                        <div className={styles.EmployementDiv2}>
                            <input
                                placeholder="e.g. English"
                                className={styles.EmployementField}
                                type="text"
                                value={language}
                                onChange={handleLanguageChange}
                            />
                            <button onClick={handleAddLanguage}>Add Language</button>
                        </div>
                    </div>

                    <div className={styles.SideContainerv2}>
                        <h5>Projects</h5>
                        {Projects.length === 0 &&
                            <div className={styles.PreviewItem}>
                                <div className={styles.PreviewTop}>
                                    <h6><b>Created Social Media Appication</b></h6>
                                    <div className={styles.deleteBtn}><DeleteOutlined /></div>
                                </div>
                                <p className={styles.previewDate}>www.socialmediaapp.com</p>
                                <p className={styles.previewDesc}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eu lorem et ultricies. In porta lorem at dui semper porttitor. Nullam quis cursus dui. Cras tincidunt vehicula tellus eu facilisis. Donec nisi turpis, iaculis et arcu a, aliquet ultrices nisl. Nam in pharetra odio, ac blandit metus. Suspendisse potenti. Praesent elementum diam non orci cursus rutrum. Pellentesque condimentum ultrices dignissim. Sed a tempor ligula, vel luctus sapien. Mauris vehicula rutrum massa. Duis condimentum, ex quis ullamcorper rhoncus, erat libero tempor arcu, condimentum facilisis tellus lectus ut nunc. Pellentesque vitae faucibus diam. Vestibulum eu erat ex. Ut justo neque, varius aliquet erat vel, scelerisque convallis lacus. Mauris semper lorem mauris, sed dignissim eros consectetur nec.
                                </p>
                            </div>
                        }
                        {Projects.map((employment, index) => (
                            <div key={index} className={styles.PreviewItem}>
                                <div className={styles.PreviewTop}>
                                    <h6><b>{employment.ProjectTitle}</b></h6>
                                    <div className={styles.deleteBtn} onClick={() => handleRemoveProject(index)}><DeleteOutlined /></div>
                                </div>
                                <p className={styles.previewDate}>{employment.ProjectLink}</p>
                                <p className={styles.previewDesc}>{employment.description}</p>
                            </div>
                        ))}

                        <h5>Education</h5>
                        {Educution.length === 0 &&
                            <div className={styles.PreviewItem}>
                                <div className={styles.PreviewTop}>
                                    <h6><b>University of California</b></h6>
                                    <div className={styles.deleteBtn}><DeleteOutlined /></div>
                                </div>
                                <p className={styles.previewDate}>2015-01 - 2019-01</p>
                                <p className={styles.previewDesc}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eu lorem et ultricies. In porta lorem at dui semper porttitor. Nullam quis cursus dui. Cras tincidunt vehicula tellus eu facilisis. Donec nisi turpis, iaculis et arcu a, aliquet ultrices nisl. Nam in pharetra odio, ac blandit metus. Suspendisse potenti. Praesent elementum diam non orci cursus rutrum. Pellentesque condimentum ultrices dignissim. Sed a tempor ligula, vel luctus sapien. Mauris vehicula rutrum massa. Duis condimentum, ex quis ullamcorper rhoncus, erat libero tempor arcu, condimentum facilisis tellus lectus ut nunc. Pellentesque vitae faucibus diam. Vestibulum eu erat ex. Ut justo neque, varius aliquet erat vel, scelerisque convallis lacus. Mauris semper lorem mauris, sed dignissim eros consectetur nec.
                                </p>
                            </div>
                        }
                        {Educution.map((education, index) => (
                            <div key={index} className={styles.PreviewItem}>
                                <div className={styles.PreviewTop}>
                                    <h6><b>{education.institution}</b></h6>
                                    <div className={styles.deleteBtn} onClick={() => handleRemoveEduction(index)}><DeleteOutlined /></div>
                                </div>
                                <p className={styles.previewDate}>{formatMonthYear(education.startDate)} - {formatMonthYear(education.endDate)}</p>
                                <p className={styles.previewDesc}>{education.description}</p>
                            </div>
                        ))}

                        <h5>Certifications</h5>
                        {Certifications.length === 0 &&
                            <div className={styles.PreviewItem}>
                                <div className={styles.PreviewTop}>
                                    <h6><b>Google Cloud Platform Fundamentals</b></h6>
                                    <div className={styles.deleteBtn}><DeleteOutlined /></div>
                                </div>
                            </div>
                        }
                        {Certifications.map((certification, index) => (
                            <div key={index} className={styles.PreviewItem}>
                                <div className={styles.PreviewTop}>
                                    <h6><b>{certification.Certification}</b></h6>
                                    <div className={styles.deleteBtn} onClick={() => handleRemoveCertification(index)}><DeleteOutlined /></div>
                                </div>
                                <p className={styles.previewDate}>{certification.CertificationLink}</p>
                            </div>
                        ))}


                        <h5>Social Links</h5>
                        <div className={styles.PreviewSkills}>
                            {socialLinks.length === 0 &&
                                <div className={styles.PreviewBox}>
                                    <p>Social Links Preview</p>
                                    <div className={styles.deleteBtn}><DeleteOutlined /></div>
                                </div>
                            }
                            {socialLinks.map((link, index) => (
                                <div key={index} className={styles.PreviewBox}>
                                    <p>{link}</p>
                                    <div className={styles.deleteBtn} onClick={() => handleRemoveSocialLink(index)}><DeleteOutlined /></div>
                                </div>
                            ))}
                        </div>

                        <h5>Languages</h5>
                        <div className={styles.PreviewSkills}>
                            {languages.length === 0 &&
                                <div className={styles.PreviewBox}>
                                    <p>Languages Preview</p>
                                    <div className={styles.deleteBtn}><DeleteOutlined /></div>
                                </div>
                            }
                            {languages.map((language, index) => (
                                <div key={index} className={styles.PreviewBox}>
                                    <p>{language}</p>
                                    <div className={styles.deleteBtn} onClick={() => handleRemoveLanguage(index)}><DeleteOutlined /></div>
                                </div>
                            ))}
                            <div className={styles.Button}>
                                <button onClick={Next}>Next</button>
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
