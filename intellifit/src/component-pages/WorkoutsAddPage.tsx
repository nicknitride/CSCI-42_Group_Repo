import axios from "axios";
import "./WorkoutsAddPage.css";
import Minigreeter from "../components/Minigreeter";

function WorkoutsAddPage(){
    return(
        <>
            <Minigreeter label="Add a Workout"></Minigreeter>
            <div className="addForm_Container">
                <form className="addForm">
                    <div className="mb3">
                        <p>Choose Workout: </p>
                        <select id="workout" name="workout">
                            <option value='1'>Legs</option>
                            <option value='2'>Push</option>
                            <option value='3'>Pull</option>
                            <option value='4'>Running</option>
                            <option value='5'>HITT</option>
                            <option value='6'>Full Body</option>
                            <option value='7'>Core</option>
                            <option value='8'>Stretch</option>
                        </select>
                    </div>
                    <div className="mb3">
                        <p>Choose Exercise: </p>
                        <select id="exercise" name="exercise">
                            <option value='1'>Barbell Squat</option>
                            <option value='2'>Romanian Deadlifts</option>
                            <option value='3'>Dummbell Lunge</option>
                            <option value='4'>Barbell Hip Thrusts</option>
                            <option value='5'>Dummbell Leg Curl</option>
                            <option value='6'>Calf Raise</option>
                            <option value='7'>Barbell Bench Press</option>
                            <option value='8'>Standing OverHead Press</option>
                            <option value='9'>Tricep Dip</option>
                            <option value='10'>Dumbbell Floor Fly</option>
                            <option value='11'>Dummbell Lunge</option>
                        </select>
                    </div>
                    <div className="mb3">
                        <p>Enter Reps: </p>
                        <input type='number'></input>
                    </div>
                    <div className="mb3">
                        <p>Enter Sets: </p>
                        <input type='number'></input>
                    </div>
                    <div className="mb3">
                        <p>Start Time:</p>
                        <input type="time" id="startTime" name="startTime"></input>
                        <p>End Time: </p>
                        <input type="time" id="endTime" name="endTime"></input>
                    </div>
                    <button id="Add-Workout">Add Workout</button>
                </form>
            </div>
        </>
    );
}

export default WorkoutsAddPage;