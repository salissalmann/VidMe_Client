export async function GetSuggestions () {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/get_friend_suggestions`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization-Token' : localStorage.getItem('token'),
        },
    })
}

