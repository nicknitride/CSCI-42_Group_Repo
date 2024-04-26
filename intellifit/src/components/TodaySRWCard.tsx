import "../component-pages/Workouts.css";
import "../css/TodayWorkout.css";

type exercise_SRW = {
    workout_completed_id: number;
    exercise_completed_id: number;
    workout_name: string;
    exercise_name: string;
    sets: number;
    reps: number;
    weight: number;
};

interface props{
    data: exercise_SRW;
}

function TodaySRWCard({data}: props){
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
                            <li>Weight: {data.weight} kg</li>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default TodaySRWCard;