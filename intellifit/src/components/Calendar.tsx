import React, { useState, useContext, ChangeEvent } from 'react';
import axios from 'axios';
import { AuthContext } from "../component-pages/auth-pages/AuthContext";

type date_val={
    date: string;
}

function Calendar(){
    const [selectedDate, setSelectedDate] = useState<string>('');
    const {loggedInUser} = useContext(AuthContext);
    
    const [dateVal, setDate] = useState<date_val>({
        date: ''
    });

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
        setDate({ ...dateVal, date: selectedDate});
    };

    const fetchExercises = async () => {
        try {
          const response = await axios.get(`http://localhost:3003/exercises-Recent/${selectedDate}/${loggedInUser}`);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching exercises:', error);
        }
      };

    return(
        <>
            <div className="Date_Picker">
                <input 
                    type="date"
                    id="date"
                    name = "date"
                    value={selectedDate} 
                    onChange={handleDateChange} 
                />
                <p>Selected Date: {selectedDate}</p>
                <button onClick={fetchExercises}>Fetch Exercises</button>
            </div>
        </>
    );
}

export default Calendar;