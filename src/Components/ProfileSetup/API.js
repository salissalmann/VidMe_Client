export async function Step1 (data) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/seeker/profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization-Token' : localStorage.getItem('token'),
        },
        body: JSON.stringify({
            ProfilePicture: data.ProfilePicture,
            WantedJob: data.WantedJob,
            Gender: data.Gender,
            DOB: data.DOB,
            Nationality: data.Nationality,
            City: data.City,
            Country: data.Country,
            ProfessionalSummary: data.ProfessionalSummary
        })
    })
}

export async function Step2 (data) {
    return fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/seeker/profile/professional`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization-Token' : localStorage.getItem('token'),
            },
            body: JSON.stringify({
                Skills: data.Skills,
                Interests: data.Interests,
                EmploymentHistory: data.EmploymentHistory
            })
        }
    )
}

export async function Step3 (data) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/seeker/profile/personal`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization-Token' : localStorage.getItem('token'),
            },
            body: JSON.stringify({
                Projects: data.Projects,
                Education: data.Education,
                Certifications: data.Certifications,
                Languages: data.Languages,
                SocialLinks: data.SocialLinks
            })
        }
    )
}

export async function Step4 (data) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/seeker/profile/video`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization-Token' : localStorage.getItem('token'),
            },
            body: JSON.stringify({
                Video: data.Video
            })
        }
    )
}

    


            


            



