import React from 'react';
import "../css/Calendar.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const Calendar = () => {
    return(
        <>
            <div className="Calendar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>*
            </div>
        </>
    );
}
//source: https://www.youtube.com/watch?v=BN_wfeG47oQ

export default Calendar;