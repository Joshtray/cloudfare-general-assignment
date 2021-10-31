import React, { useEffect, useState } from 'react'
import './Post.css'

const Post = ({ post }) => {
    const [username, setUsername] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [time, setTime] = useState("")
    const getPost = async () => {
        let res = await fetch("https://my-worker.jessey.workers.dev/post/", {
            method: 'POST',
            body: JSON.stringify({ "id": post.name }),
            headers: {'Content-type': 'application/json'}
        })
        let response = await res.json()
        let data = JSON.parse(response)
        data.username ? setUsername(data.username) : setUsername("Anonymous")
        setTitle(data.title)
        setContent(data.content)
        setTime(data.created_at)
    }
    useEffect(() => {
        getPost()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="post">
            <div className="post-description">
                <h3 className="title">{title}</h3>
                <p className="username">by @{username}</p>
            </div>
            <div className="post-content">
                <p className="content">{content}</p>
            </div>
            <p className="created-at">{time}</p>
        </div>
    )
}

export default Post
