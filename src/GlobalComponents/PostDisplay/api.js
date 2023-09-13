export function GetPost(id)
{
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/${id}`,{
        method: 'GET',
    })
}

export function AddComment(body)
{
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/addComment`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization-Token' : localStorage.getItem('token'),
        },
        body: JSON.stringify(body),
    })
}

export function GetCommentById(id) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/getCommentsById`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
    })
}

export function AddReply(body) {
    return  fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/replyToComment`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization-Token' : localStorage.getItem('token'),
        },
        body: JSON.stringify(body),
    })
}
