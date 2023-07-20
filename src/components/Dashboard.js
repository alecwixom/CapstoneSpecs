import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/authContext";
import './dashboard.css'

const Dashboard = () => {
    const { token, userId } = useContext(AuthContext);
    const [workouts, setWorkouts] = useState([
        { dayOfWeek: "", description: "" },
    ]);
    const [dayOfWeek, setDay] = useState('')
    const [description, setDesc] = useState('')
    const navigate = useNavigate();

    const handleAddWorkout = () => {
        setWorkouts([...workouts, { dayOfWeek: "", description: "" }]);
    };

    const handleRemoveWorkout = (index) => {
        const updatedWorkouts = [...workouts];
        updatedWorkouts.splice(index, 1);
        setWorkouts(updatedWorkouts);
    };

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
                        <input
                            type="text"
                            value={description}
                            onChange={(e) =>
                                setDesc(e.target.value)
                            }
                        />
                    </label>
                    <br />
                    <button type="button" onClick={() => handleRemoveWorkout(index)}>
                        Remove Workout
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAddWorkout}>
                Add Workout
            </button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Dashboard;
