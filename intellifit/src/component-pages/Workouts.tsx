import axios from "axios";
import "../App.css";
import "./Workouts.css";
import Minigreeter from "../components/Minigreeter";
import Calendar from '../components/Calendar';
import TodayWorkout from "../components/TodayWorkout";
import React, { FormEvent, ReactComponentElement, useEffect, useState, useRef } from 'react';
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

function Workouts(){ 
    const navigate = useNavigate();
    const [recent_Exercises, setRecent] = useState<any[]>([]);
    useEffect(() => {
        fetch('http://localhost:3003/exercises-Recent')
        .then(res => res.json())
        .then(data => setRecent(data))
        .catch(error => console.error('Error fetching workouts:', error));
    }, []);

    return(
        <> {/*  */}
            <Minigreeter label="Workout Dashboard: "></Minigreeter>
            <h1>Recent Workouts</h1>
            <div className="recentExercises">
                {recent_Exercises &&
                recent_Exercises.map((item) => {
                return <TodayWorkout data={item} />;
                })}
            </div>
            <div className="button_container">
                {/* <a href="http://localhost:5173/workouts/add/"> */}
                    <button className="add_workout">
                    <Link to="/workouts/add">
                        Add Workout
                        </Link>
                    </button>
            </div>
            <h1>View other Workout Dates</h1>
            <Calendar />
        </>
        
    );
}
export default Workouts;