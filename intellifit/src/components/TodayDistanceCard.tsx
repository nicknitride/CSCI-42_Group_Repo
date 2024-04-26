import "../component-pages/Workouts.css";
import "../css/TodayWorkout.css";

type exercise_distance = {
    workout_completed_id: number;
    exercise_completed_id: number;
    workout_name: string;
    exercise_name: string;
    distance: number;
};

interface props{
    data: exercise_distance;
}

function TodayDistanceCard({data}: props){
    return(
        <>
            <div className="workouts-container">
                <div className="workout-card">
                    <h2>{data.workout_name} Workout</h2>
                    <p>{data.exercise_name}</p>
                    <ul className="exercise-list">
                        <div className="list-detail">
                            <li>Distance:   {data.distance} m</li>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default TodayDistanceCard;