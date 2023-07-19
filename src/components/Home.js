import React from "react";
import { useState, useEffect, useContext } from "react";

import AuthContext from "../store/authContext";
import axios from "axios";

const Home = () => {
    const {userId} = useContext(AuthContext)
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4001/posts')
        .then(res =>{
            if(userId) {
                const otherUserPosts = res.data.filter(post => userId !== post.userId)
                setPosts(otherUserPosts)
            } else {
                setPosts(res.data)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [userId])

    const mappedPosts = posts.map(post => {
        return(
            <div key={post.id} className="homeposts">
                <h2>{post.dayOfWeek}</h2>
                <h4>{post.user.username}</h4>
                <p>{post.description}</p>
            </div>
        )
    })
    

    return mappedPosts.length >=1 ? (
        <main>
            {mappedPosts}
        </main>
    ):(
        <main>
            <h1>No posts at this time...</h1>
        </main>
    )
}

export default Home