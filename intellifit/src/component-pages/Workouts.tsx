import axios from "axios";
import "../App.css";
import "./Workouts.css";
import * as React from 'react';
import Minigreeter from "../components/Minigreeter";
import Calendar from '../components/Calendar';
import TodayWorkout from "../components/TodayWorkout";

function Workouts(){ 
    return(
        <> 
            <Minigreeter label="Workout Dashboard: "></Minigreeter>
            <h1>Recent Workouts</h1>
            <TodayWorkout/>
            <h1 className="null-message fade-in">
                No Workouts for Today.
            </h1>
            <div className="button_container">
                <a href="http://localhost:5173/workouts/add/">
                    <button className="add_workout">
                        Add Workout
                    </button>
                </a>
            </div>
            <h1>View other Workout Dates</h1>
            <Calendar />
        </>
        
    );
}
export default Workouts;