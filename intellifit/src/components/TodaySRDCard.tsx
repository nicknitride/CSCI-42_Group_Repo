import "../component-pages/Workouts.css";
import "../css/TodayWorkout.css";

type exercise_SRD = {
    workout_completed_id: number;
    exercise_completed_id: number;
    workout_name: string;
    exercise_name: string;
    sets: number;
    reps: number;
    duration: string;
};

interface props{
    data: exercise_SRD;
}

function TodaySRDCard({data}: props){
    return(
        <>
            <div className="workouts-container">
                <div className="workout-card">
                    <h2>{data.workout_name} Workout</h2>
                    <p>{data.exercise_name}</p>
                    <ul className="exercise-list">
                        <div className="list-detail">
                            <li>Sets:   {data.sets}</li>
                            <li>Reps:   {data.reps}</li>
                        </div>
                        <div className="duration-detail">
                            <li>Duration: {data.duration.substring(3,5)} minutes {data.duration.substring(6,8)} seconds</li>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default TodaySRDCard;