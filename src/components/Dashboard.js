import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/authContext";
import './dashboard.css'

const Dashboard = () => {
    const { token, userId } = useContext(AuthContext);
    const [workouts] = useState([
        { dayOfWeek: "", description: "" },
    ]);
    const [dayOfWeek, setDay] = useState('')
    const [description, setDesc] = useState('')
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:4001/posts", { dayOfWeek, description, userId },
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            .then(() => {
                navigate("http://localhost:4001");
            })
            .catch((err) => console.log(err));
        console.log(workouts);
    };

    return (
        <form onSubmit={handleSubmit}>
            {workouts.map((workout, index) => (
                <div key={index}>
                    <label className="form-day">
                        Day of Week:
                        <input
                            type="text"
                            value={dayOfWeek}
                            onChange={(e) => 
                                setDay(e.target.value)
                            }
                        />
                    </label>
                    <br />
                    <br />
                    <label className="form-desc">
                        Workout Description:
                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDesc(e.target.value)
                            }
                        />
                    </label>
                    <br />
                </div>
            ))}
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Dashboard;
