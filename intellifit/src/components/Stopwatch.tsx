import { format } from 'path';
//import "../css/Stopwatch.css";

import React, {useState, useEffect, useRef} from 'react';
function Stopwatch (){

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

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime(){
        /*let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let mins = Math.floor(elapsedTime / (1000 * 60) % 60);
        let secs = Math.floor(elapsedTime / (1000) % 60);
        let ms = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        mins = String(mins).padStart(2, "0");
        secs = String(secs).padStart(2, "0");
        ms = String(ms).padStart(2, "0");*/

        let hours: string = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(2, "0");
        let mins: string = String(Math.floor(elapsedTime / (1000 * 60) % 60)).padStart(2, "0");
        let secs: string = String(Math.floor(elapsedTime / 1000 % 60)).padStart(2, "0");
        let ms: string = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, "0");

        return `${mins}:${secs}:${ms}`;
    }

    return(
        <>
            <div className="stopwatch">
                <div className="display">{formatTime()}</div>
                <div className="controls">
                    <button onClick={start} className="start-button">Start</button>
                    <button onClick={stop} className="stop-button">Stop</button>
                    <button onClick={reset} className="reset-button">Reset</button>
                </div>
            </div>
        </>
    );
}
export default Stopwatch