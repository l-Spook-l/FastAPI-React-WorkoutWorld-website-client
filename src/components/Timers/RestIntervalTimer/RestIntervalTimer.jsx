import React, { useState, useEffect } from 'react';
import style from './RestIntervalTimer.module.css'

const RestIntervalTimer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [progress, setProgress] = useState(100);
  const [isActive, setIsActive] = useState(true); // Добавили состояние для активации/деактивации таймера

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive && seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
        const newProgress = (seconds / initialSeconds) * 100;
        setProgress(newProgress);
      } else {
        clearInterval(interval);
        setIsActive(false)
        //onFinish();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, initialSeconds, isActive]);

  const handleStop = () => {
    setIsActive(false); // Устанавливаем таймер в неактивное состояние
  };

  const finish = () => {

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
        <button onClick={handleStop}>Stop</button>
        <button onClick={finish}>Finish</button>
      </div>
    </div>
  );
};

export default RestIntervalTimer;

// import React, { useState, useEffect } from 'react';
// import style from './RestIntervalTimer.module.css'


// const RestIntervalTimer = ({ initialSeconds, onFinish }) => {
//   const [seconds, setSeconds] = useState(initialSeconds);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (seconds > 0) {
//         setSeconds((prevSeconds) => prevSeconds - 1);
//       } else {
//         clearInterval(interval);
//         onFinish();
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [seconds, onFinish]);

//   const progress = (initialSeconds - seconds) / initialSeconds * 100;

//   return (
//             <div className={style.countdownTimer}>
//       <p>Time: {seconds} seconds</p>
//       <div className={style.progressBar} style={{ width: `${progress}%` }} />
//     </div>
//   );
// };

// export default RestIntervalTimer;
