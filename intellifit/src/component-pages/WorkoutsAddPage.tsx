import axios from "axios";
import "./WorkoutsAddPage.css";
import Minigreeter from "../components/Minigreeter";
import React, { FormEvent, ReactComponentElement, useEffect, useState } from 'react'

function WorkoutsAddPage(){
    const getDate = new Date();
    const formattedDate = getDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', });

    const [exercises, setExercises] = useState([
        { id: 1, exercise: '', reps: '', sets: '', date: formattedDate}
    ]);

    const handleAddExercise = () => {
        const newId = exercises.length + 1;
        setExercises([...exercises, { id: newId, exercise: '', reps: '', 
                        sets: '', date: formattedDate }]);
    };

    const handleExerciseChange = (event: React.ChangeEvent<HTMLSelectElement>, id: number) => {
        const updatedExercises = exercises.map((exercise) =>
          exercise.id === id ? { ...exercise, exercise: event.target.value } : exercise
        );
        setExercises(updatedExercises);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('http://localhost:3003//add-workout', exercises)
        .then(res => console.log("Registered Successfully!!"))
        .catch(err => console.log(err));
    }
{/*
    const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const updatedExercises = exercises.map((exercise) =>
          exercise.id === id ? { ...exercise, reps: event.target.value } : exercise
        );
        setExercises(updatedExercises);
    };
    
    const handleSetsChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const updatedExercises = exercises.map((exercise) =>
          exercise.id === id ? { ...exercise, sets: event.target.value } : exercise
        );
        setExercises(updatedExercises);
    };

    const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const updatedExercises = exercises.map((exercise) =>
          exercise.id === id ? { ...exercise, distance: event.target.value} : exercise
        );
        setExercises(updatedExercises);
    };

    const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const updatedExercises = exercises.map((exercise) =>
          exercise.id === id ? { ...exercise, duration: event.target.value} : exercise
        );
        setExercises(updatedExercises);
    };

    const handleDeleteExercise = (index: number) => {
        const updatedExercises = exercises.filter((exercise, i) => i !== index);
        setExercises(updatedExercises);
    };
*/}

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
        .catch(error => console.error('Error fetching HIIT exercises:', error));
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
    
    const [selectEx4, setEx4] = useState<boolean>(false);
    const [selectEx5, setEx5] = useState<boolean>(false);
    const [selectEx3, setEx3] = useState<boolean>(false);
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

    return (
        <>
            <Minigreeter label="TEST_PAGE"></Minigreeter>
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
                        <div className="exInputFieldsContainer">
                        {exercises.map((exercise, index) => (
                        <div key={exercise.id}>
                            <div className="exerSelect">
                                <p>Choose Exercise: </p>
                                <select
                                value={exercise.exercise}
                                >
                                <option value="">Choose Exercise</option>
                                {exercises_1.map(exercise_1 => (
                                    <option key={exercise_1.exercise_id} value={exercise_1.exercise_id}>{exercise_1.exercise_name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input
                                type='number'
                                value={exercise.sets}
                                placeholder="sets"
                                />
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input
                                type='number'
                                value={exercise.reps}
                                placeholder="reps"
                                />
                            </div>
                            {/*<button onClick={() => handleDeleteExercise(index)}>Delete Exercise</button>*/}
                        </div>
                        ))}
                        <button onClick={(e) => {handleAddExercise(); e.preventDefault(); }}>Add another Exercise</button>
                        </div>
                    )}
                    {/*
                    {selectEx2 && (
                        <div className="exInputFieldsContainer">
                        {exercises.map((exercise, index) => (
                        <div key={exercise.id}>
                            <div className="exerSelect">
                                <p>Choose Exercise: </p>
                                <select
                                value={exercise.exercise}
                                onChange={(e) => handleExerciseChange(e, exercise.id)}
                                >
                                <option value="">Choose Exercise</option>
                                {exercises_2.map(exercise => (
                                    <option key={exercise.exercise_id} value={exercise.exercise_id}>{exercise.exercise_name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input
                                type='number'
                                value={exercise.sets}
                                onChange={(e) => handleSetsChange(e, exercise.id)}
                                placeholder="sets"
                                />
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input
                                type='number'
                                value={exercise.reps}
                                onChange={(e) => handleRepsChange(e, exercise.id)}
                                placeholder="reps"
                                />
                            </div>
                            <button onClick={() => handleDeleteExercise(index)}>Delete Exercise</button>
                        </div>
                        ))}
                        <button onClick={(e) => {handleAddExercise(); e.preventDefault(); }}>Add another Exercise</button>
                        </div>
                    )}
                    {selectEx3 && (
                        <div className="exInputFieldsContainer">
                        {exercises.map((exercise, index) => (
                        <div key={exercise.id}>
                            <div className="exerSelect">
                                <p>Choose Exercise: </p>
                                <select
                                value={exercise.exercise}
                                onChange={(e) => handleExerciseChange(e, exercise.id)}
                                >
                                <option value="">Choose Exercise</option>
                                {exercises_3.map(exercise => (
                                    <option key={exercise.exercise_id} value={exercise.exercise_id}>{exercise.exercise_name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input
                                type='number'
                                value={exercise.sets}
                                onChange={(e) => handleSetsChange(e, exercise.id)}
                                placeholder="sets"
                                />
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input
                                type='number'
                                value={exercise.reps}
                                onChange={(e) => handleRepsChange(e, exercise.id)}
                                placeholder="reps"
                                />
                            </div>
                            <button onClick={() => handleDeleteExercise(index)}>Delete Exercise</button>
                        </div>
                        ))}
                        <button onClick={(e) => {handleAddExercise(); e.preventDefault(); }}>Add another Exercise</button>
                        </div>
                    )}
                    {selectEx4 && (
                        <div className="exInputFieldsContainer">
                        {exercises.map((exercise, index) => (
                        <div key={exercise.id}>
                            <div className="exerSelect">
                                <p>Choose Exercise: </p>
                                <select
                                value={exercise.exercise}
                                onChange={(e) => handleExerciseChange(e, exercise.id)}
                                >
                                <option value="">Choose Exercise</option>
                                {exercises_4.map(exercise => (
                                    <option key={exercise.exercise_id} value={exercise.exercise_id}>{exercise.exercise_name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="distance">
                                <p>Enter D: </p>
                                <input
                                type='number'
                                value={exercise.distance}
                                onChange={(e) => handleDistanceChange(e, exercise.id)}
                                placeholder="distance"
                                />
                            </div>
                            <button onClick={() => handleDeleteExercise(index)}>Delete Exercise</button>
                        </div>
                        ))}
                        <button onClick={(e) => {handleAddExercise(); e.preventDefault(); }}>Add another Exercise</button>
                        </div>
                    )}
                    {selectEx5 && (
                        <div className="exInputFieldsContainer">
                        {exercises.map((exercise, index) => (
                        <div key={exercise.id}>
                            <div className="exerSelect">
                                <p>Choose Exercise: </p>
                                <select
                                value={exercise.exercise}
                                onChange={(e) => handleExerciseChange(e, exercise.id)}
                                >
                                <option value="">Choose Exercise</option>
                                {exercises_5.map(exercise => (
                                    <option key={exercise.exercise_id} value={exercise.exercise_id}>{exercise.exercise_name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input
                                type='number'
                                value={exercise.sets}
                                onChange={(e) => handleSetsChange(e, exercise.id)}
                                placeholder="sets"
                                />
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input
                                type='number'
                                value={exercise.reps}
                                onChange={(e) => handleRepsChange(e, exercise.id)}
                                placeholder="reps"
                                />
                            </div>
                            <div className="duration">
                                <p>Enter Duration in minutes: </p>
                                <input
                                type='number'
                                value={exercise.duration}
                                onChange={(e) => handleDurationChange(e, exercise.id)}
                                placeholder="duration"
                                />
                            </div>
                            <button onClick={() => handleDeleteExercise(index)}>Delete Exercise</button>
                        </div>
                        ))}
                        <button onClick={(e) => {handleAddExercise(); e.preventDefault(); }}>Add another Exercise</button>
                        </div>
                    )}
                    {selectEx6 && (
                        <div className="exInputFieldsContainer">
                        {exercises.map((exercise, index) => (
                        <div key={exercise.id}>
                            <div className="exerSelect">
                                <p>Choose Exercise: </p>
                                <select
                                value={exercise.exercise}
                                onChange={(e) => handleExerciseChange(e, exercise.id)}
                                >
                                <option value="">Choose Exercise</option>
                                {exercises_6.map(exercise => (
                                    <option key={exercise.exercise_id} value={exercise.exercise_id}>{exercise.exercise_name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input
                                type='number'
                                value={exercise.sets}
                                onChange={(e) => handleSetsChange(e, exercise.id)}
                                placeholder="sets"
                                />
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input
                                type='number'
                                value={exercise.reps}
                                onChange={(e) => handleRepsChange(e, exercise.id)}
                                placeholder="reps"
                                />
                            </div>
                            <button onClick={() => handleDeleteExercise(index)}>Delete Exercise</button>
                        </div>
                        ))}
                        <button onClick={(e) => {handleAddExercise(); e.preventDefault(); }}>Add another Exercise</button>
                        </div>
                    )}
                    {selectEx7 && (
                        <div className="exInputFieldsContainer">
                        {exercises.map((exercise, index) => (
                        <div key={exercise.id}>
                            <div className="exerSelect">
                                <p>Choose Exercise: </p>
                                <select
                                value={exercise.exercise}
                                onChange={(e) => handleExerciseChange(e, exercise.id)}
                                >
                                <option value="">Choose Exercise</option>
                                {exercises_7.map(exercise => (
                                    <option key={exercise.exercise_id} value={exercise.exercise_id}>{exercise.exercise_name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input
                                type='number'
                                value={exercise.sets}
                                onChange={(e) => handleSetsChange(e, exercise.id)}
                                placeholder="sets"
                                />
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input
                                type='number'
                                value={exercise.reps}
                                onChange={(e) => handleRepsChange(e, exercise.id)}
                                placeholder="reps"
                                />
                            </div>
                            <button onClick={() => handleDeleteExercise(index)}>Delete Exercise</button>
                        </div>
                        ))}
                        <button onClick={(e) => {handleAddExercise(); e.preventDefault(); }}>Add another Exercise</button>
                        </div>
                    )}
                    {selectEx8 && (
                        <div className="exInputFieldsContainer">
                        {exercises.map((exercise, index) => (
                        <div key={exercise.id}>
                            <div className="exerSelect">
                                <p>Choose Exercise: </p>
                                <select
                                value={exercise.exercise}
                                onChange={(e) => handleExerciseChange(e, exercise.id)}
                                >
                                <option value="">Choose Exercise</option>
                                {exercises_8.map(exercise => (
                                    <option key={exercise.exercise_id} value={exercise.exercise_id}>{exercise.exercise_name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="sets">
                                <p>Enter Sets: </p>
                                <input
                                type='number'
                                value={exercise.sets}
                                onChange={(e) => handleSetsChange(e, exercise.id)}
                                placeholder="sets"
                                />
                            </div>
                            <div className="reps">
                                <p>Enter Reps: </p>
                                <input
                                type='number'
                                value={exercise.reps}
                                onChange={(e) => handleRepsChange(e, exercise.id)}
                                placeholder="reps"
                                />
                            </div>
                            <button onClick={() => handleDeleteExercise(index)}>Delete Exercise</button>
                        </div>
                        ))}
                        <button onClick={(e) => {handleAddExercise(); e.preventDefault(); }}>Add another Exercise</button>
                        </div>
                    )}
                    <div className="Date_Container">
                        <p>Today is {formattedDate}. </p>
                    </div>
                    {/*
                    <div className="mb3">
                        <p>Start Time:</p>
                        <input type="time" id="startTime" name="startTime"></input>
                        <p>End Time: </p>
                        <input type="time" id="endTime" name="endTime"></input>
                </div>*/}
                    <button id="Add-Workout">Add Workout</button>
                </form>
            </div>
        </>
        
      );
}

export default WorkoutsAddPage;