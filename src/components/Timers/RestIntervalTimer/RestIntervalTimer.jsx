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
    <div className={style.container}>
      <div >
        <div className={style.timerHeader}>
          <p className={style.timerHeaderTitle}>Time remaining: {seconds} seconds</p>
          <button className={style.buttonSkipTime} onClick={skipRest}>Skip the rest</button>
        </div>
        <div className={style.mainLineLoad}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              borderRadius: '7px',
              backgroundColor: 'rgb(27, 44, 19)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RestIntervalTimer;
