import React, {useState} from 'react'
import './app.css';
import WatchDisplay from "./watch/watchDisplay";
import WatchBtns from "./watch/watchBtns";


function App() {
  const [time, setTime] = useState({h:0, m:0, s:0, ms:0});
  const [intervale, setIntervale] = useState();
  const [status, setStatus] = useState(0);

  let updateHrs = time.h , updateMin = time.m , updateSec = time.s, updateMSec = time.ms;

  const run = () => {
    if (updateMin === 60){
      updateHrs++;
      updateMin = 0;
    }
    if(updateSec === 60){
      updateMin++;
      updateSec=0;
    }
    if (updateMSec === 100){
      updateSec++;
      updateMSec = 0;
    }
    updateMSec++;
    return setTime({h:updateHrs, ms:updateMSec, s:updateSec, m:updateMin})
  };

  const start = () => {
    run();
    setIntervale(setInterval(run, 10));
    setStatus(1)
  };

  const stop = () => {
    clearInterval(intervale);
    setStatus(2)
  };

  const reset = () => {
    clearInterval(intervale);
    setStatus(0);
    setTime({h:0, m:0, s:0, ms:0})
  };

  const resume =() => start();
  return (
    <div className="main">
         <div className="block">
           <div className="watch">
             <h1>stop watch</h1>
             <WatchDisplay time={time} />
             <WatchBtns  start={start} stop={stop} status={status} reset={reset} resume={resume}/>
           </div>
         </div>
    </div>
  );
}

export default App;
