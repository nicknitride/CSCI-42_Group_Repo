import axios from "axios";
import "../App.css";
import "./Workouts.css";
import Minigreeter from "../components/Minigreeter";
import Calendar from '../components/Calendar';
import TodayWorkout from "../components/TodayWorkout";
import React, { FormEvent, ReactComponentElement, useEffect, useState, useRef, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth-pages/AuthContext";
import { useScrollTrigger } from "@mui/material";
import TodaySRWCard from "../components/TodaySRWCard";
import TodayDistanceCard from "../components/TodayDistanceCard";

function Workouts(){ 
    const {loggedInUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [recent_Exercises, setRecent] = useState<any[]>([]);
    const [recent_Exercises_SRW, setRecent_SRW] = useState<any[]>([]);
    const [recent_Exercises_Distance, setRecent_Distance] = useState<any[]>([]);
    const [setLoggedInUser] = useState<any[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:3003/exercises-Recent/${loggedInUser}`)
        .then(response => setRecent(response.data))
        .catch(error => console.error('Error fetching workouts:', error));
    }, [loggedInUser]);

    useEffect(() => {
        axios.get(`http://localhost:3003/exercises-Recent/SRW/${loggedInUser}`)
        .then(response => setRecent_SRW(response.data))
        .catch(error => console.error('Error fetching SRW workouts:', error));
    }, [loggedInUser]);
    
    useEffect(() => {
        axios.get(`http://localhost:3003/exercises-Recent/Distance/${loggedInUser}`)
        .then(response => setRecent_Distance(response.data))
        .catch(error => console.error('Error fetching Distance workouts:', error));
    }, [loggedInUser]);

    return(
        <>
            <Minigreeter label="Workout Dashboard: "></Minigreeter>
            <h1>Recent Workouts</h1>
            <div className="recentExercises">
                {recent_Exercises_SRW &&
                recent_Exercises_SRW.map((item) => {
                    return <TodaySRWCard data={item} />;
                })}
                {recent_Exercises_Distance &&
                recent_Exercises_Distance.map((item) => {
                    return <TodayDistanceCard data={item} />;
                })}
            </div>
            {/*<div className="recentExercises">
                {recent_Exercises &&
                recent_Exercises.map((item) => {
                return <TodayWorkout data={item} />;
                })}
            </div>*/}
            <div className="button_container">
                {/* <a href="http://localhost:5173/workouts/add/"> */}
                    <button className="add_workout">
                        <Link to="/workouts/add" style={{ textDecoration: 'none' }}> 
                            <div className="button_text">Add Workout</div>
                        </Link>
                    </button>
            </div>
            <h1>View other Workout Dates</h1>
            <Calendar />
        </>
        
    );
}
export default Workouts;