import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/authContext";
import "./dashboard.css";

const Dashboard = () => {
    const { token, userId } = useContext(AuthContext);
    const [dayOfWeek, setDay] = useState("");
    const [description, setDesc] = useState("");
    const location = useLocation();
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:4001/posts",
                { dayOfWeek, description, userId },
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            .then(() => {
                console.log("Workout added successfully!");
                navigate("http://localhost:4001");
            })
            .catch((err) => console.log(err));
    };

    const prefillFields = () => {
        const searchParams = new URLSearchParams(location.search);
        const queryDayOfWeek = searchParams.get("dayOfWeek");
        const queryDescription = searchParams.get("description");

        if (queryDayOfWeek && queryDescription) {
            setDay(queryDayOfWeek);
            setDesc(queryDescription);
        }
    };

    useEffect(() => {
        prefillFields();
    }, [location.search]);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="form-day">
                    Day of Week:
                    <input
                        type="text"
                        value={dayOfWeek}
                        onChange={(e) => setDay(e.target.value)}
                    />
                </label>
                <br />
                <br />
                <label className="form-desc">
                    Workout Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </label>
                <br />
            </div>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Dashboard;
