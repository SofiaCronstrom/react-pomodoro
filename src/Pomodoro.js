
import React, { useRef, useState, useEffect } from "react";
import './Pomodoro.css';


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
    <div className="pomodoro">
      
      
        <div className="length-section">
        <div className="focus">
            <h4>FOCUS TIME</h4>
            <input onClick={onSessDecreClick} type="button" value="-" className="button1" />
            <h4>{sessionTime}</h4>
            <input onClick={onSessIncreClick} type="button" value="+" className="button1"/>
          </div>
          <div className="stretch">
            <h4>STRETCH TIME</h4>
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
      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

export default App;
