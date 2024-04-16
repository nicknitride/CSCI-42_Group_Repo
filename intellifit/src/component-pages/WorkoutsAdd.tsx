import axios from "axios";
import "./WorkoutsAddPage.css";
import Minigreeter from "../components/Minigreeter";
import React, { FormEvent, ReactComponentElement, useEffect, useState } from 'react'
import { breadcrumbsClasses } from "@mui/material";

type workoutFields = {
    workout: number,
    exercise: number;
    sets: number;
    reps: number;
    weight: number;
    date: String;
    workout_type: String;
}

function WorkoutsAdd(){
    const currentDate: Date = new Date();
    const formattedDate: string = currentDate.toISOString().split('T')[0];

    const [values, setValues] = useState<workoutFields>({
        workout: 0,
        exercise: 0,
        sets: 0,
        reps: 0,
        weight: 0,
        date: formattedDate,
        workout_type: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleExerciseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
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

    const [selectEx1, setEx1] = useState<boolean>(false);
    const [selectEx2, setEx2] = useState<boolean>(false);
    const [selectEx3, setEx3] = useState<boolean>(false);
    const [selectEx6, setEx6] = useState<boolean>(false);
    const [selectEx7, setEx7] = useState<boolean>(false);
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const chosenWorkout = event.target.value;
        switch(chosenWorkout){
            case "1":
                setEx1(true);
                setEx2(false);
                setEx3(false);
                setEx6(false);
                setEx7(false);
                break;
            case "2":
                setEx1(false);
                setEx2(true);
                setEx3(false);
                setEx6(false);
                setEx7(false);
                break;
            case "3":
                setEx1(false);
                setEx2(false);
                setEx3(true);
                setEx6(false);
                setEx7(false);
                break;
            case "6":
                setEx1(false);
                setEx2(false);
                setEx3(false);
                setEx6(true);
                setEx7(false);
                break;
            case "7":
                setEx1(false);
                setEx2(false);
                setEx3(false);
                setEx6(false);
                setEx7(true);
                break;
            default:
                setEx1(false);
                setEx2(false);
                setEx3(false);
                setEx6(false);
                setEx7(false);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('http://localhost:3003/add-workout-Test', values)
        .then(res => console.log("workout registered Successfully!!"))
        .catch(err => console.log(err));
        axios.post('http://localhost:3003/addTo_WorkoutCompleted', values)
        .then(res => console.log("workout completed registered Successfully!!"))
        .catch(err => console.log(err));
        axios.post('http://localhost:3003/addTo_ExerciseCompleted', values)
        .then(res => console.log("exercise completed registered Successfully!!"))
        .catch(err => console.log(err));
        axios.post('http://localhost:3003/addTo_SRW', values)
        .then(res => console.log("SRW registered Successfully!!"))
        .catch(err => console.log(err));
    }

    return(
        <>
            <Minigreeter label="Add a Workout"></Minigreeter>
            <div className="addForm_Container">
                <form className="addForm" onSubmit={handleSubmit}>
                    <div className="workoutField">
                        <p>Choose Kind of Workout: </p>
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
                                <input type='number'placeholder="sets" name="sets" onChange={handleChange}/>
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input type='number' placeholder="reps" name="reps" onChange={handleChange}/>
                            </div>
                            <div className="weight">
                                <p>Enter Weight: </p>
                                <input type='number' placeholder="weight" name="weight" onChange={handleChange}/>
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
                                <input type='number'placeholder="sets" name="sets" onChange={handleChange}/>
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input type='number' placeholder="reps" name="reps" onChange={handleChange}/>
                            </div>
                            <div className="weight">
                                <p>Enter Weight: </p>
                                <input type='number' placeholder="weight" name="weight" onChange={handleChange}/>
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
                                <input type='number'placeholder="sets" name="sets" onChange={handleChange}/>
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input type='number' placeholder="reps" name="reps" onChange={handleChange}/>
                            </div>
                            <div className="weight">
                                <p>Enter Weight: </p>
                                <input type='number' placeholder="weight" name="weight" onChange={handleChange}/>
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
                                <input type='number'placeholder="sets" name="sets" onChange={handleChange}/>
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input type='number' placeholder="reps" name="reps" onChange={handleChange}/>
                            </div>
                            <div className="weight">
                                <p>Enter Weight: </p>
                                <input type='number' placeholder="weight" name="weight" onChange={handleChange}/>
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
                                <input type='number'placeholder="sets" name="sets" onChange={handleChange}/>
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input type='number' placeholder="reps" name="reps" onChange={handleChange}/>
                            </div>
                            <div className="weight">
                                <p>Enter Weight: </p>
                                <input type='number' placeholder="weight" name="weight" onChange={handleChange}/>
                            </div>
                        </div>
                    )}
                    <button id="Add-Workout">Add Workout</button>
                </form>
            </div>
        </>
    )
}
export default WorkoutsAdd;