
export function CreateAccount (firstName, lastName, email, password, phone) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/create-account`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password,
            Phone: phone
    }
    )
    })
}
