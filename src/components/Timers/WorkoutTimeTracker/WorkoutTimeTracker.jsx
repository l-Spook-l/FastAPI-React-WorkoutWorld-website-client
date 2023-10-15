import React, { useState, useEffect } from 'react';

const WorkoutTimeTracker = ({ onStart, onStop, onReset, onTimeUpdate }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

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
    <div>
      <p>Time: {time} seconds</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default WorkoutTimeTracker;
