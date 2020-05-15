import React, {useState,useEffect} from 'react';
import './App.scss';

function App() {

  const [stopwatch,setStopWatch] = useState("00:00");
  const [running,setRunning] = useState(false);
  const [clock,setClock] = useState({});
  

  useEffect(()=>{

   

  },[])

  const init = () =>{

    console.log('init!');

    if (window.Worker){
 
      const now = new Date();

      //Creating Web Worker
      const clockWorker = new Worker(`${process.env.PUBLIC_URL}/clockWorker.worker.js`);
      setClock(clockWorker);
      clockWorker.postMessage(['init',now]);
      
      clockWorker.onmessage = (e) => {
         const [msg,time] = e.data;
         
          if(msg==="time"){
              setStopWatch(time);
          }
        }
        setRunning(true);

  }

  }

  const handleStop = () =>{

    //Aturar el cronòmetre  
    clock.terminate();    
    setRunning(false);

  }

  const watchControl = () =>{


    setRunning(!running);
    if(running){
      clock.terminate();    
    setRunning(false);
    }else{
      if (window.Worker){
 
        const now = new Date();
  
        //Creating Web Worker
        const clockWorker = new Worker(`${process.env.PUBLIC_URL}/clockWorker.worker.js`);
        setClock(clockWorker);
        clockWorker.postMessage(['init',now]);
        
        clockWorker.onmessage = (e) => {
           const [msg,time] = e.data;
           
            if(msg==="time"){
                setStopWatch(time);
            }
          }
          setRunning(true);
  
    }
    }

  }

  return (
    <div className="App">
        <div className="container-chrono">
           <div onClick={watchControl}>{stopwatch}</div>
        </div>
    </div>
  );
}

export default App;
