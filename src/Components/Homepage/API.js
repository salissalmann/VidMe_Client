
export function Login (email, password) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Email: email,
            Password: password,
    }
    )
    })
}
