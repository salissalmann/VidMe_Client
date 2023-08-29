export async function Step1 (data) {
    const Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/seeker/profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization-Token' : localStorage.getItem('token'),
        },
        body: JSON.stringify({
            WantedJob: data.WantedJob,
            Gender: data.Gender,
            DOB: data.DOB,
            Nationality: data.Nationality,
            City: data.City,
            Country: data.Country,
            ProfessionalSummary: data.ProfessionalSummary
        })
    })
    const ResponseData = await Response.json()
    return ResponseData
}

export async function Step2 (data) {
    const Response = await fetch(
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
    const ResponseData = await Response.json()
    return ResponseData
}


            


            



