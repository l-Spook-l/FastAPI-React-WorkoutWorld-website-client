import React, { useState, useEffect } from 'react';
import style from './RestIntervalTimer.module.css'

const RestIntervalTimer = ({ active, initialSeconds, onFinish  }) => {
  const [seconds, setSeconds] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)


  useEffect(() => {
    setIsActive(active)
    setSeconds(initialSeconds)
    setProgress(0)
  }, [active, initialSeconds])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive && seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1)
        const newProgress = 102 - (seconds / initialSeconds) * 100
        setProgress(newProgress)
      } else {
        clearInterval(interval)
        setIsActive(false)
        onFinish()
      }
    }, 1000);

    return () => clearInterval(interval)
  }, [seconds, isActive])

  const skipRest = () => {
    setIsActive(false)
    setProgress(0)
    setSeconds(initialSeconds)
    onFinish()
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
              backgroundColor: 'rgb(255, 235, 205)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RestIntervalTimer
