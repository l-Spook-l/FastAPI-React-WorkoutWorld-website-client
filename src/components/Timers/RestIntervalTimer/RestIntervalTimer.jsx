import React, { useState, useEffect } from 'react';
import style from './RestIntervalTimer.module.css'

const RestIntervalTimer = ({ active, initialSeconds }) => {
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false); // Добавили состояние для активации/деактивации таймера


  useEffect(() => {
    setIsActive(active)
    setSeconds(initialSeconds)
    setProgress(0)
  }, [active, initialSeconds])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive && seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
        const newProgress = 100 - (seconds / initialSeconds) * 100;
        setProgress(newProgress);
      } else {
        clearInterval(interval);
        setIsActive(false)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, isActive]);

  const skipRest = () => {
    setIsActive(false)
    setProgress(0)
    setSeconds(initialSeconds)
  }
  
  return (
    <div>
      <div>
        <p>Time remaining: {seconds} seconds</p>
        <div style={{ width: '100%', height: '20px', backgroundColor: '#ccc' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: 'green',
            }}
          />
        </div>
        <button onClick={skipRest}>Skip the rest</button>
      </div>
    </div>
  );
};

export default RestIntervalTimer;
