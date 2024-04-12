import "../component-pages/Workouts.css";
import "../css/TodayWorkout.css";

function TodayWorkout(){
    return(
        <>
            <div className="workouts-container">
                <div className="workout-card">
                    <h2>March 24, 2024</h2>
                    <p className="workout-name">Leg Workout</p>
                    <div className="duration">
                        <span>Start: <span className="sets-value">11:00 AM</span></span>
                        <span>End: <span className="reps-value">12:00 PM</span></span>
                    </div>
                    <h3>Exercises</h3>
                    <ul className="exercise-list">
                        <div className="list-detail">
                            <li>Dumbell Lunges</li>
                            <li>3 Sets</li>
                            <li>12 Reps</li>
                        </div>
                        <div className="list-detail">
                            <li>Calf Raises</li>
                            <li>3 Sets</li>
                            <li>12 Reps</li>
                        </div>
                        <div className="list-detail">
                            <li>Walking Lunges</li>
                            <li>3 Sets</li>
                            <li>12 Reps</li>
                        </div>
                        <div className="list-detail">
                            <li>Leg Press</li>
                            <li>3 Sets</li>
                            <li>12 Reps</li>
                        </div>
                    </ul>
                </div>
                <div className="workout-card">
                    <h2>March 22, 2024</h2>
                    <p className="workout-name">Push Workout</p>
                    <div className="duration">
                        <span>Start: <span className="sets-value">1:25 PM</span></span>
                        <span>End: <span className="reps-value">2:00 PM</span></span>
                    </div>
                    <h3>Exercises</h3>
                    <ul className="exercise-list">
                        <div className="list-detail">
                            <li>Incline Chest Press</li>
                            <li>3 Sets</li>
                            <li>12 Reps</li>
                        </div>
                        <div className="list-detail">
                            <li>Pec Fly</li>
                            <li>3 Sets</li>
                            <li>12 Reps</li>
                        </div>
                        <div className="list-detail">
                            <li>Shoulder Press</li>
                            <li>3 Sets</li>
                            <li>12 Reps</li>
                        </div>
                    </ul>
                </div>
                <div className="workout-card">
                    <h2>March 20, 2024</h2>
                    <p className="workout-name">Pull Workout</p>
                    <div className="duration">
                        <span>Start: <span className="sets-value">9:00 PM</span></span>
                        <span>End: <span className="reps-value">10:00 PM</span></span>
                    </div>
                    <h3>Exercises</h3>
                    <ul className="exercise-list">
                        <div className="list-detail">
                            <li>Lat Pulldown</li>
                            <li>3 Sets</li>
                            <li>12 Reps</li>
                        </div>
                        <div className="list-detail">
                            <li>Rear Delt Machine</li>
                            <li>3 Sets</li>
                            <li>12 Reps</li>
                        </div>
                        <div className="list-detail">
                            <li>Cable Curls</li>
                            <li>3 Sets</li>
                            <li>12 Reps</li>
                        </div>
                    </ul>
                </div>
            </div>
            
        </>
    )
};

export default TodayWorkout;