import React, {useState, useEffect} from 'react';
import './Pomodoro.css'
export default function Pomodoro(){

     const [minutes, setMinutes] = useState(25);
     const [seconds, setSeconds] = useState(0);
     const [displayMessage, setDisplayMessage] = useState(false);
     const [isActive, setIsActive] = useState(false);
    
     function toggle() {
      setIsActive(!isActive);
    }
  
    function reset() {
      setMinutes(25)
      setSeconds(0);
      setIsActive(false);
    }


     useEffect (() => {
      let interval = setInterval(() => {
        
      
         if (seconds === 0 && isActive){
             
            if (minutes !== 0){
                 setSeconds(59);
                 setMinutes(minutes - 1);
            } else {
               let minutes = displayMessage ? 24 : 4;
               let seconds = 59;

               setSeconds(seconds);
               setMinutes(minutes);
               setDisplayMessage(!displayMessage);
            }

        } else {
          setSeconds(seconds - 1);
        }
        clearInterval(interval);
      }, 1000);
    }, [seconds, minutes, displayMessage, isActive])
     
     const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
     const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;


    return ( 
    <div className="pomodoro">
        
        <div className="message">
            {displayMessage && <div>Five minutes strech time</div>}
        </div>

        <div className="row">
            <div className="timer">{timerMinutes} : {timerSeconds}</div>

            <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
            {isActive ? 'Pause' : 'Start'}
           </button>

           <button className="button" onClick={reset}>
              Reset
           </button>
       </div>
        

        
    </div>
    );
};