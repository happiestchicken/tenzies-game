import "../styles.css";
import React, { useState } from "react";
import { Timer } from "./Timer";
import { nanoid } from "nanoid"


function StopWatch(props) {
    const [start, setStart] = useState(props.start);
    const [time, setTime] = useState(props.time);
    const [forStorage, setForStorage] = useState(props.done)
    const [notFirstGame, setNotFirstGame] = useState(false)
    const [times, setTimes] = React.useState(
        () => JSON.parse(localStorage.getItem("times")) || []
    )

    React.useEffect(() => {
        localStorage.setItem("times", JSON.stringify([times]))
    }, [forStorage])

    React.useEffect(() => {
        if (time > 0) {
            const newTime = {
                id: nanoid(),
                time: time
            }
            setTimes(prevTimes => [newTime, ...prevTimes])
            setNotFirstGame(true)
        }
    }, [start])

    React.useEffect(() => {
        if (props.timer === true)
        setTime(0)
    }, [props.timer])

    React.useEffect(() => {
        setStart(props.start)
    }, [props.start])

    React.useEffect(() => {
        let interval = null;
        if (start) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        }

        return () => {
        clearInterval(interval);
        };
    }, [start]);

    React.useEffect(() => {
        if (props.start === true) {
            setStart(true)
        }
    }, [props.start])
    
    function handleStart() {
        setStart(true);
    };

    if (notFirstGame) {

        let topScore = times[0].time

        for (let i = 0; i < times.length - 1; i++) {
            if (times[i].time < topScore) {
                topScore = times[i].time
                console.log("kevin" + times[i].time)
            }
        }

        let minutes = ("0" + Math.floor((topScore / 60000) % 60)).slice(-2)
        let seconds = ("0" + Math.floor((topScore / 1000) % 60)).slice(-2)
        let mili = ("0" + ((topScore / 10) % 100)).slice(-2)
        var score = (minutes + ':' + seconds + "." + mili)
    }
 
    return (
        	<div className="stop-watch">
                <div className="timer">
        	            <Timer time={time} />
                </div>
                <div className="times">
                    <h4 className="best-time">Best Time</h4>
                    {notFirstGame && <span className="top-score">{score}</span>}
                </div>
        	</div>
        );
}

export {StopWatch}