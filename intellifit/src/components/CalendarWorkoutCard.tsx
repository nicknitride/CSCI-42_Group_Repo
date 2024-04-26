import "../component-pages/Workouts.css";
import "../css/TodayWorkout.css";

type dailyMeal = {
    exercise_completed_id: number;
    exercise_name: string;
    completed_date: string;
    completed_type: number;
};

interface props{
    data : dailyMeal;
}

function TodayWorkout({data}: props){
    return(
        <>
            <div className="workouts-container">
                <div className="workout-card">
                    <h2>{data.completed_date.substring(0, 10)}</h2>
                    <p className="workout-name">Workout</p>
                    <ul className="exercise-list">
                        <div className="list-detail">
                            <li>{data.exercise_name}</li>
                        </div>
                    </ul>
                </div>
            </div>
            
        </>
    )
};

export default TodayWorkout;