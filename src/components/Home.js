import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import styles from "./home.module.css";

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
            .get(`http://localhost:4001/posts`)
            .then((res) => {
                if (userId) {
                    const otherUserPosts = res.data.filter(
                        (post) => userId !== post.user.username
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

    const handleCopyToDashboard = (dayOfWeek, description) => {
        window.location.href = `/dashboard?dayOfWeek=${encodeURIComponent(
            dayOfWeek
        )}&description=${encodeURIComponent(description)}`;
    };

    const mappedPosts = posts.map((post) => {
        const { id, user, dayOfWeek, description } = post;
        return (
            <div key={id} className={styles["homeposts"]}>
                <h2>{user.username}</h2>
                <h4>{dayOfWeek}</h4>
                <p>{nl2br(description)}</p>
                {userId && (
                    <button onClick={() => handleCopyToDashboard(dayOfWeek, description)}>
                        Copy
                    </button>
                )}
            </div>
        );
    });

    return mappedPosts.length >= 1 ? (
        <main className={styles["main-grid"]}>{mappedPosts}</main>
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
