import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [title, setTitle] = useState("")
  const [username, setUsername] = useState("")
  const [content, setContent] = useState("")
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState(false)
  const getPosts = async () => {
    const res = await fetch("https://my-worker.jessey.workers.dev/", {
      method: 'GET'
    })
    let response = await res.json()
    setPosts(response.reverse())
  }
  const createPost = async (e) => {
    e.preventDefault();
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
    var dateTime = date+' '+time;
    const post = {
      "title": title,
      "username": username,
      "content": content,
      "created_at": dateTime,
    }
    try {
      await fetch("https://my-worker.jessey.workers.dev/", {
        method: 'POST',
        body: JSON.stringify({
          id: posts.length + 1,
          post: JSON.stringify(post)
        })
      })
      console.log("Successfully created post")
      setPosts([{ name: posts.length + 1, post: post}, ...posts])
      setNewPost(!newPost)
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <div className="App">
      <button onClick={() => (setNewPost(!newPost))} className="new-post">Create a new post ...</button>
      {newPost && <form className="create-post" onSubmit={(e) => (createPost(e))}>
        <input placeholder="Username" className="username" onChange={(e) => (setUsername(e.target.value))} />
        <input placeholder="Post Title" className="title" onChange={(e) => (setTitle(e.target.value))} />
        <textarea placeholder="Create a new post..." className="content" onChange={(e) => (setContent(e.target.value))} />
        <button type="submit" className="post-action">Create post</button>
        <button onClick={() => (setNewPost(!newPost))} className="post-action">Cancel</button>
      </form>} 
      {posts.map((post) => (<Post key={post.name} post={post} />))}
    </div>
  );
}

export default App;
