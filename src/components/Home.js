import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import "./home.css";

const nl2br = (str) => {
    return str.split("\n").map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
};

const Home = () => {
    const { userId } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4001/posts")
            .then((res) => {
                if (userId) {
                    const otherUserPosts = res.data.filter(
                        (post) => userId !== post.userId
                    );
                    setPosts(otherUserPosts);
                } else {
                    setPosts(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userId]);

    const mappedPosts = posts.map((post) => {
        return (
            <div key={post.id} className="homeposts">
                <h2>{post.user.username}</h2>
                <h4>{post.dayOfWeek}</h4>
                <p>{nl2br(post.description)}</p>
            </div>
        );
    });

    return mappedPosts.length >= 1 ? (
        <main>{mappedPosts}</main>
    ) : (
        <main>
            <h4>
                Welcome to Lift Share!
                <br />
                Login or Register to get started
            </h4>
            <h1>No posted Schedules at this time...</h1>
        </main>
    );
};

export default Home;
