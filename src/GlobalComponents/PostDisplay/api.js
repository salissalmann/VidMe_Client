export function GetPost(id)
{
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/${id}`,{
        method: 'GET',
    })
}
