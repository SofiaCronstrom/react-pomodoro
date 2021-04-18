import React, {useState, useEffect} from 'react';
import './Pomodoro.css'
import Background from './Background.svg'
import Alarm from './sound_cowbell.wav'
import useSound from 'use-sound';


export default function Pomodoro(){

     const [minutes, setMinutes] = useState(25);
     const [seconds, setSeconds] = useState(0);
     const [displayMessage, setDisplayMessage] = useState(false);
     const [isActive, setIsActive] = useState(false);
     const [play] = useSound(Alarm);

     function toggle() {
      setIsActive(!isActive);
    }
  
    function reset() {
      setMinutes(25)
      setSeconds(0);
      setIsActive(false);
      setDisplayMessage(!displayMessage);
    }


     useEffect (() => {
      let interval = null;
       if (isActive){
      
       interval = setInterval(() => {
        
      
         if (seconds === 0){
             
            if (minutes !== 0){
                 setSeconds(59);
                 setMinutes(minutes - 1);
            } else {
               let minutes = displayMessage ? 24 : 4;
               let seconds = 59;
              
               play();
               setSeconds(seconds);
               setMinutes(minutes);
               setDisplayMessage(!displayMessage);
               
            }

        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
     
    } else if (!isActive && seconds !== 0){
      clearInterval(interval);
    }
    return () => clearInterval(interval) 
    }, [seconds, minutes, displayMessage, isActive, play]);
     
     const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
     const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;


    return ( 
    <div className="pomodoro" style={{backgroundImage: `url(${Background} )` }}>
        <div className="row">
        <div className="message">
            {displayMessage && <div>Five minutes strech time</div>}
        </div>

       
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
