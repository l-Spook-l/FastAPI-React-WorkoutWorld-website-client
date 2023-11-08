import React, { useState, useEffect } from 'react';
import style from './WorkoutTimeTracker.module.css'

const WorkoutTimeTracker = ({ onStart, onStop, onReset, onTimeUpdate }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        onTimeUpdate(time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time, onTimeUpdate]);

  const startTimer = () => {
    setIsActive(true);
    onStart();
  };

  const stopTimer = () => {
    setIsActive(false);
    onStop(time);
  };

  const resetTimer = () => {
    setTime(0);
    onReset();
  };

  return (
    <div className={style.container}>
      <p>Time: {formatTime(time)}</p>
      <button className={style.buttonTimer} onClick={startTimer}>Start</button>
      <button className={style.buttonTimer} onClick={stopTimer}>Stop</button>
      <button className={style.buttonTimer} onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default WorkoutTimeTracker;
