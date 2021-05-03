// import React, {useState, useEffect} from 'react';
// import './Pomodoro.css'
// import Background from './Background.svg'
// import Alarm from './sound_cowbell.wav'
// import useSound from 'use-sound';


// export default function Pomodoro(){

//      const [minutes, setMinutes] = useState(1);
//      const [seconds, setSeconds] = useState(0);
//      const [displayMessage, setDisplayMessage] = useState(false);
//      const [isActive, setIsActive] = useState(false);
//      const [play] = useSound(Alarm);

//      function toggle() {
//       setIsActive(!isActive);
//     }
  
//     function reset() {
//       setMinutes(25)
//       setSeconds(0);
//       setIsActive(false);
//       setDisplayMessage(displayMessage);
//     }


//      useEffect (() => {
//       let interval = null;
//        if (isActive){
      
//        interval = setInterval(() => {
        
      
//          if (seconds === 0){
             
//             if (minutes !== 0){
//                  setSeconds(59);
//                  setMinutes(minutes - 1);
//             } else {
//                let minutes = displayMessage ? 24 : 4;
//                let seconds = 59;
              
//                play();
//                setSeconds(seconds);
//                setMinutes(minutes);
//                setDisplayMessage(!displayMessage);
               
//             }

//         } else {
//           setSeconds(seconds - 1);
//         }
//       }, 1000);
     
//     } else if (!isActive && seconds !== 0){
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval) 
//     }, [seconds, minutes, displayMessage, isActive, play]);
     
//      const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
//      const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;


//     return ( 
//     <div className="pomodoro" style={{backgroundImage: `url(${Background} )` }}>
//         <div className="row">


//                   <div className="set-time">
//                    <h5>Strech length:</h5>
//                    <input onClick={""} type="button" value="-" className="button1" />
//                    <h4>{""}</h4>
//                    <input onClick={""} type="button" value="+" className="button1"/>
                 

                 
//                    <h5>Focus length</h5>
//                    <input onClick={""} type="button" value="-" className="button1"/>
//                    <h4>{""}</h4>
//                    <input onClick={""} type="button" value="+" className="button1" />
//                  </div>
              

//         <div className="message">
//             {displayMessage && <div>Five minutes strech time</div>}
//         </div>

       
//             <div className="timer">{timerMinutes} : {timerSeconds}</div>

//             <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
//             {isActive ? 'Pause' : 'Start'}
//            </button>

//            <button className="button" onClick={reset}>
//               Reset
//            </button>
//         </div>
//        </div> 

        
    
//     );
// };
import React, { useRef, useState, useEffect } from "react";
import './Pomodoro.css';
import Background from './cucumber.svg';

const App = () => {
  const [breakTime, setBreakTime] = useState(1);
  const [sessionTime, setSessionTime] = useState(1);
  const [timerType, setTimerType] = useState("FOCUS");
  const [timeLeft, setTimeLeft] = useState(sessionTime * 60);
  const [pause, setPause] = useState(true);
  const starter = useRef(null);

  const changeTime = () => {
    if (timeLeft > 0) {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }
    if (timeLeft === 0) {
      if (timerType === "FOCUS") {
        console.log(timeLeft);
        setTimerType("STRETCH");
        setTimeLeft(breakTime * 60);
        buzzer();
      } else {
        setTimeLeft(sessionTime * 60);
        setTimerType("FOCUS");
        buzzer();
      }
    }
  };
  useEffect(() => {
    if (!pause) {
      const interval = setInterval(changeTime, 1000);
      return () => clearInterval(interval);
    }
  });
  const onBreakDecreClick = () => {
    if (breakTime > 0) {
      setBreakTime(breakTime - 1);
      if (timerType === "STRETCH") {
        setTimeLeft((breakTime - 1) * 60);
      }
    } else {
      return;
    }
  };
  const onBreakIncreClick = () => {
    setBreakTime(breakTime + 1);
    if (timerType === "STRETCH") {
      setTimeLeft((breakTime + 1) * 60);
    }
  };
  const onSessDecreClick = () => {
    if (sessionTime > 0) {
      setSessionTime((sessionTime) => sessionTime - 1);
      if (timerType === "FOCUS") {
        setTimeLeft((sessionTime - 1) * 60);
      }
    } else {
      return;
    }
  };
  const onSessIncreClick = () => {
    setSessionTime((sessionTime) => sessionTime + 1);
    if (timerType === "FOCUS") {
      setTimeLeft((sessionTime + 1) * 60);
    }
  };
  const buzzer = () => {
    const sound = document.getElementById("beep");
    sound.play();
  };
  const startTimer = () => {
    console.log(sessionTime, breakTime, timeLeft);
    setPause(false);
  };
  const stopTimer = () => {
    setPause(true);
    clearInterval(starter.current);
  };
  const onResetClick = () => {
    stopTimer();
    setBreakTime(5);
    setSessionTime(25);
    setTimerType("FOCUS");
    setTimeLeft(1500);
  };
  const onChangePause = () => {
    if (pause) {
      startTimer();
    } else {
      stopTimer();
    }
  };
  const toMMSS = () => {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft - minutes * 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  };
  return (
    <div className="pomodoro" style={{backgroundImage: `url(${Background} )` }}>
      
      <div className="row">
        <div className="length-section">
        <div className="focus">
            <h4>Focus time</h4>
            <input onClick={onSessDecreClick} type="button" value="-" className="button1" />
            <h4>{sessionTime}</h4>
            <input onClick={onSessIncreClick} type="button" value="+" className="button1"/>
          </div>
          <div className="stretch">
            <h4>Stretch time</h4>
            <input onClick={onBreakDecreClick} type="button" value="-" className="button1" />
            <h4>{breakTime}</h4>
            <input onClick={onBreakIncreClick} type="button" value="+" className="button1"/>
          </div>
        </div>
        <div className="set-time">
          <div>
            <h3>{timerType}</h3>
            <h4>{toMMSS(timeLeft)}</h4>
            <button onClick={onChangePause} id="start-pause" className="button-primary">
              {pause ? "START" : "PAUSE"}
            </button>
            <button onClick={onResetClick} id="reset" className="button">
              RESET
            </button>
          </div>
        </div>
      </div>
      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

export default App;
