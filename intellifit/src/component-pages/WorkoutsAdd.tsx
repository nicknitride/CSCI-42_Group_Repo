import axios from "axios";
import "./WorkoutsAdd.css";
import Minigreeter from "../components/Minigreeter";
import React, { FormEvent, ReactComponentElement, useEffect, useState, useRef, useContext } from 'react'
import { breadcrumbsClasses } from "@mui/material";
import { hoursToMilliseconds } from "date-fns";
import { AuthContext } from "./auth-pages/AuthContext";

type workoutFields = {
    workout: number,
    exercise: number;
    sets: number;
    reps: number;
    weight: number;
    date: String;
    distance: number;
    duration: String;
    workout_type: String;
    loggedInUser: string | null;
}

function WorkoutsAdd(){
    const { loggedInUser } = useContext(AuthContext);
    
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        }

    }, [isRunning])

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function pause(){
        setIsRunning(false);
    }

    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime(){
        let hours: string = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(2, "0");
        let mins: string = String(Math.floor(elapsedTime / (1000 * 60) % 60)).padStart(2, "0");
        let secs: string = String(Math.floor(elapsedTime / 1000 % 60)).padStart(2, "0");
        return `${hours}:${mins}:${secs}`;
    }
    
    const currentDate: Date = new Date();
    const formattedDate: string = currentDate.toISOString().split('T')[0];

    const [values, setValues] = useState<workoutFields>({
        workout: 0,
        exercise: 0,
        sets: 0,
        reps: 0,
        weight: 0,
        date: formattedDate,
        distance: 0,
        duration: '',
        workout_type: '',
        loggedInUser: loggedInUser,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleExerciseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const handleStop = () => {
        setIsRunning(false);
        setValues(prevValues => ({
            ...prevValues,
            duration: formatTime()
        }));
    }

    const [workouts, setWorkouts] = useState<any[]>([]);
    useEffect(() => {
        fetch('http://localhost:3003/workouts')
        .then(res => res.json())
        .then(data => setWorkouts(data))
        .catch(error => console.error('Error fetching workouts:', error));
    }, []);

    const [exercises_1, setExercises_1] = useState<any[]>([])
    useEffect(() => {
        fetch('http://localhost:3003/ex_entries-1')
        .then(res => res.json())
        .then(data => setExercises_1(data))
        .catch(error => console.error('Error fetching Leg exercises:', error));
    }, []);

    const [exercises_2, setExercises_2] = useState<any[]>([])
    useEffect(() => {
        fetch('http://localhost:3003/ex_entries-2')
        .then(res => res.json())
        .then(data => setExercises_2(data))
        .catch(error => console.error('Error fetching Push exercises:', error));
    }, []);

    const [exercises_3, setExercises_3] = useState<any[]>([])
    useEffect(() => {
        fetch('http://localhost:3003/ex_entries-3')
        .then(res => res.json())
        .then(data => setExercises_3(data))
        .catch(error => console.error('Error fetching Pull exercises:', error));
    }, []);

    const [exercises_4, setExercises_4] = useState<any[]>([])
    useEffect(() => {
        fetch('http://localhost:3003/ex_entries-4')
        .then(res => res.json())
        .then(data => setExercises_4(data))
        .catch(error => console.error('Error fetching Running exercises:', error));
    }, []);

    const [exercises_5, setExercises_5] = useState<any[]>([])
    useEffect(() => {
        fetch('http://localhost:3003/ex_entries-5')
        .then(res => res.json())
        .then(data => setExercises_5(data))
        .catch(error => console.error('Error fetching Running exercises:', error));
    }, []);

    const [exercises_6, setExercises_6] = useState<any[]>([])
    useEffect(() => {
        fetch('http://localhost:3003/ex_entries-6')
        .then(res => res.json())
        .then(data => setExercises_6(data))
        .catch(error => console.error('Error fetching Full Body exercises:', error));
    }, []);

    const [exercises_7, setExercises_7] = useState<any[]>([])
    useEffect(() => {
        fetch('http://localhost:3003/ex_entries-7')
        .then(res => res.json())
        .then(data => setExercises_7(data))
        .catch(error => console.error('Error fetching Core exercises:', error));
    }, []);

    const [exercises_8, setExercises_8] = useState<any[]>([])
    useEffect(() => {
        fetch('http://localhost:3003/ex_entries-8')
        .then(res => res.json())
        .then(data => setExercises_8(data))
        .catch(error => console.error('Error fetching Stretch exercises:', error));
    }, []);

    const [selectEx1, setEx1] = useState<boolean>(false);
    const [selectEx2, setEx2] = useState<boolean>(false);
    const [selectEx3, setEx3] = useState<boolean>(false);
    const [selectEx4, setEx4] = useState<boolean>(false);
    const [selectEx5, setEx5] = useState<boolean>(false);
    const [selectEx6, setEx6] = useState<boolean>(false);
    const [selectEx7, setEx7] = useState<boolean>(false);
    const [selectEx8, setEx8] = useState<boolean>(false);
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const chosenWorkout = event.target.value;
        switch(chosenWorkout){
            case "1":
                setEx1(true);
                setEx2(false);
                setEx3(false);
                setEx4(false);
                setEx5(false);
                setEx6(false);
                setEx7(false);
                setEx8(false);
                break;
            case "2":
                setEx1(false);
                setEx2(true);
                setEx3(false);
                setEx4(false);
                setEx5(false);
                setEx6(false);
                setEx7(false);
                setEx8(false);
                break;
            case "3":
                setEx1(false);
                setEx2(false);
                setEx3(true);
                setEx4(false);
                setEx5(false);
                setEx6(false);
                setEx7(false);
                setEx8(false);
                break;
            case "4":
                setEx1(false);
                setEx2(false);
                setEx3(false);
                setEx4(true);
                setEx5(false);
                setEx6(false);
                setEx7(false);
                setEx8(false);
                break;
            case "5":
                setEx1(false);
                setEx2(false);
                setEx3(false);
                setEx4(false);
                setEx5(true);
                setEx6(false);
                setEx7(false);
                setEx8(false);
                break;
            case "6":
                setEx1(false);
                setEx2(false);
                setEx3(false);
                setEx4(false);
                setEx5(false);
                setEx6(true);
                setEx7(false);
                setEx8(false);
                break;
            case "7":
                setEx1(false);
                setEx2(false);
                setEx3(false);
                setEx4(false);
                setEx5(false);
                setEx6(false);
                setEx7(true);
                setEx8(false);
                break;
            case "8":
                setEx1(false);
                setEx2(false);
                setEx3(false);
                setEx4(false);
                setEx5(false);
                setEx6(false);
                setEx7(false);
                setEx8(true);
                break;
            default:
                setEx1(false);
                setEx2(false);
                setEx3(false);
                setEx4(false);
                setEx5(false);
                setEx6(false);
                setEx7(false);
                setEx8(false);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('http://localhost:3003/addTo_WorkoutCompleted', values)
        .then(res => console.log("workout completed registered Successfully!!"))
        .catch(err => console.log(err));
        axios.post('http://localhost:3003/addTo_ExerciseCompleted', values)
        .then(res => console.log("exercise completed registered Successfully!!"))
        .catch(err => console.log(err));
        axios.post('http://localhost:3003/addTo_DurationCompleted', values)
        .then(res => console.log("exercise completed registered Successfully!!"))
        .catch(err => console.log(err));
        axios.post('http://localhost:3003/addTo_OtherTables', values)
        .then(res => console.log("SRW registered Successfully!!"))
        .catch(err => console.log(err));
    }

    return(
        <>
            <div className="minigreeter-container">
                <Minigreeter label="Add a Workout"></Minigreeter>
            </div>
            <div className="addForm_Container">
                <form className="addForm" onSubmit={handleSubmit}>
                    <div className="workoutField">
                    <p className="chooseWorkoutText">Choose workout type:</p>
                        <select id="workout" name="workout" onChange={handleSelectChange}>
                            <option value="">Select Workout</option>
                            {workouts.map(workout => (
                                <option key={workout.workout_id} value={workout.workout_id}>{workout.workout_name}</option>
                            ))}
                        </select>
                    </div>             
                    {selectEx1 && (
                        <div className="exerSelect">
                            <p>Choose Exercise: </p>
                            <select id="exercise" name="exercise" onChange={handleExerciseChange}>
                                <option value="">Choose Exercise</option>
                                {exercises_1.map(exercise_1 => (
                                    <option key={exercise_1.exercise_id} value={exercise_1.exercise_id}>{exercise_1.exercise_name}</option>
                                ))}
                            </select>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input required type='number'placeholder="sets" name="sets" onChange={handleChange}/>
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input required type='number' placeholder="reps" name="reps" onChange={handleChange}/>
                            </div>
                            <div className="weight">
                                <p>Enter Weight (in kg): </p>
                                <input required type='number' placeholder="weight" name="weight" onChange={handleChange}/>
                            </div>
                            <div className="time">
                                <p>Press to Start and Record Your Time: </p>
                                <div className="stopwatch">
                                    <div className="display">{formatTime()}</div>
                                    <div className="controls">
                                        <button type="button" onClick={start} className="start-button">Start</button>
                                        <button type="button" onClick={pause} className="pause-button">pause</button>
                                        <button type="button" onClick={reset} className="reset-button">Reset</button>
                                        <button type="button" onClick={handleStop} className="stop-button">Stop and Record</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectEx2 && (
                        <div className="exerSelect">
                            <p>Choose Exercise: </p>
                            <select id="exercise" name="exercise" onChange={handleExerciseChange}>
                                <option value="">Choose Exercise</option>
                                {exercises_2.map(exercise_2 => (
                                    <option key={exercise_2.exercise_id} value={exercise_2.exercise_id}>{exercise_2.exercise_name}</option>
                                ))}
                            </select>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input required type='number'placeholder="sets" name="sets" onChange={handleChange}/>
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input required type='number' placeholder="reps" name="reps" onChange={handleChange}/>
                            </div>
                            <div className="weight">
                                <p>Enter Weight (in kg): </p>
                                <input required type='number' placeholder="weight" name="weight" onChange={handleChange}/>
                            </div>
                            <div className="time">
                                <p>Press to Start and Record Your Time: </p>
                                <div className="stopwatch">
                                    <div className="display">{formatTime()}</div>
                                    <div className="controls">
                                        <button type="button" onClick={start} className="start-button">Start</button>
                                        <button type="button" onClick={pause} className="pause-button">pause</button>
                                        <button type="button" onClick={reset} className="reset-button">Reset</button>
                                        <button type="button" onClick={handleStop} className="stop-button">Stop and Record</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectEx3 && (
                        <div className="exerSelect">
                            <p>Choose Exercise: </p>
                            <select id="exercise" name="exercise" onChange={handleExerciseChange}>
                                <option value="">Choose Exercise</option>
                                {exercises_3.map(exercise_3 => (
                                    <option key={exercise_3.exercise_id} value={exercise_3.exercise_id}>{exercise_3.exercise_name}</option>
                                ))}
                            </select>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input required type='number'placeholder="sets" name="sets" onChange={handleChange}/>
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input required type='number' placeholder="reps" name="reps" onChange={handleChange}/>
                            </div>
                            <div className="weight">
                                <p>Enter Weight (in kg): </p>
                                <input required type='number' placeholder="weight" name="weight" onChange={handleChange}/>
                            </div>
                            <div className="time">
                                <p>Press to Start and Record Your Time: </p>
                                <div className="stopwatch">
                                    <div className="display">{formatTime()}</div>
                                    <div className="controls">
                                        <button type="button" onClick={start} className="start-button">Start</button>
                                        <button type="button" onClick={pause} className="pause-button">pause</button>
                                        <button type="button" onClick={reset} className="reset-button">Reset</button>
                                        <button type="button" onClick={handleStop} className="stop-button">Stop and Record</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectEx4 && (
                        <div className="exerSelect">
                            <p>Choose Exercise: </p>
                            <select id="exercise" name="exercise" onChange={handleExerciseChange}>
                                <option value="">Choose Exercise</option>
                                {exercises_4.map(exercise_4 => (
                                    <option key={exercise_4.exercise_id} value={exercise_4.exercise_id}>{exercise_4.exercise_name}</option>
                                ))}
                            </select>
                            <div className="distance">
                                <p>Enter Distance (in m): </p>
                                <input required type='number'placeholder="distance" name="distance" onChange={handleChange}/>
                            </div>
                            <div className="time">
                                <p>Press to Start and Record Your Time: </p>
                                <div className="stopwatch">
                                    <div className="display">{formatTime()}</div>
                                    <div className="controls">
                                        <button type="button" onClick={start} className="start-button">Start</button>
                                        <button type="button" onClick={pause} className="pause-button">pause</button>
                                        <button type="button" onClick={reset} className="reset-button">Reset</button>
                                        <button type="button" onClick={handleStop} className="stop-button">Stop and Record</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectEx5 && (
                        <div className="exerSelect">
                            <p>Choose Exercise: </p>
                            <select id="exercise" name="exercise" onChange={handleExerciseChange}>
                                <option value="">Choose Exercise</option>
                                {exercises_5.map(exercise_5 => (
                                    <option key={exercise_5.exercise_id} value={exercise_5.exercise_id}>{exercise_5.exercise_name}</option>
                                ))}
                            </select>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input required type='number'placeholder="sets" name="sets" onChange={handleChange}/>
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input required type='number' placeholder="reps" name="reps" onChange={handleChange}/>
                            </div>
                            <div className="time">
                                <p>Press to Start and Record Your Time: </p>
                                <div className="stopwatch">
                                    <div className="display">{formatTime()}</div>
                                    <div className="controls">
                                        <button type="button" onClick={start} className="start-button">Start</button>
                                        <button type="button" onClick={pause} className="pause-button">pause</button>
                                        <button type="button" onClick={reset} className="reset-button">Reset</button>
                                        <button type="button" onClick={handleStop} className="stop-button">Stop and Record</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectEx6 && (
                        <div className="exerSelect">
                            <p>Choose Exercise: </p>
                            <select id="exercise" name="exercise" onChange={handleExerciseChange}>
                                <option value="">Choose Exercise</option>
                                {exercises_6.map(exercise_6 => (
                                    <option key={exercise_6.exercise_id} value={exercise_6.exercise_id}>{exercise_6.exercise_name}</option>
                                ))}
                            </select>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input required type='number'placeholder="sets" name="sets" onChange={handleChange}/>
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input required type='number' placeholder="reps" name="reps" onChange={handleChange}/>
                            </div>
                            <div className="weight">
                                <p>Enter Weight (in kg): </p>
                                <input required type='number' placeholder="weight" name="weight" onChange={handleChange}/>
                            </div>
                            <div className="time">
                                <p>Press to Start and Record Your Time: </p>
                                <div className="stopwatch">
                                    <div className="display">{formatTime()}</div>
                                    <div className="controls">
                                        <button type="button" onClick={start} className="start-button">Start</button>
                                        <button type="button" onClick={pause} className="pause-button">pause</button>
                                        <button type="button" onClick={reset} className="reset-button">Reset</button>
                                        <button type="button" onClick={handleStop} className="stop-button">Stop and Record</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectEx7 && (
                        <div className="exerSelect">
                            <p>Choose Exercise: </p>
                            <select id="exercise" name="exercise" onChange={handleExerciseChange}>
                                <option value="">Choose Exercise</option>
                                {exercises_7.map(exercise_7 => (
                                    <option key={exercise_7.exercise_id} value={exercise_7.exercise_id}>{exercise_7.exercise_name}</option>
                                ))}
                            </select>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input required type='number'placeholder="sets" name="sets" onChange={handleChange}/>
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input required type='number' placeholder="reps" name="reps" onChange={handleChange}/>
                            </div>
                            <div className="weight">
                                <p>Enter Weight (in kg): </p>
                                <input required type='number' placeholder="weight" name="weight" onChange={handleChange}/>
                            </div>
                            <div className="time">
                                <p>Press to Start and Record Your Time: </p>
                                <div className="stopwatch">
                                    <div className="display">{formatTime()}</div>
                                    <div className="controls">
                                        <button type="button" onClick={start} className="start-button">Start</button>
                                        <button type="button" onClick={pause} className="pause-button">pause</button>
                                        <button type="button" onClick={reset} className="reset-button">Reset</button>
                                        <button type="button" onClick={handleStop} className="stop-button">Stop and Record</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectEx8 && (
                        <div className="exerSelect">
                            <p>Choose Exercise: </p>
                            <select id="exercise" name="exercise" onChange={handleExerciseChange}>
                                <option value="">Choose Exercise</option>
                                {exercises_8.map(exercise_8 => (
                                    <option key={exercise_8.exercise_id} value={exercise_8.exercise_id}>{exercise_8.exercise_name}</option>
                                ))}
                            </select>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input required type='number'placeholder="sets" name="sets" onChange={handleChange}/>
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input required type='number' placeholder="reps" name="reps" onChange={handleChange}/>
                            </div>
                            <div className="weight">
                                <p>Enter Weight (in kg): </p>
                                <p>Input 0 if no weight needed</p>
                                <input type='number' placeholder="weight" name="weight" onChange={handleChange}/>
                            </div>
                            <div className="time">
                                <p>Press to Start and Record Your Time: </p>
                                <div className="stopwatch">
                                    <div className="display">{formatTime()}</div>
                                    <div className="controls">
                                        <button type="button" onClick={start} className="start-button">Start</button>
                                        <button type="button" onClick={pause} className="pause-button">pause</button>
                                        <button type="button" onClick={reset} className="reset-button">Reset</button>
                                        <button type="button" onClick={handleStop} className="stop-button">Stop and Record</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <button id="Add-Workout" type="submit">Add Workout</button>
                </form>
            </div>
        </>
    )
}
export default WorkoutsAdd;