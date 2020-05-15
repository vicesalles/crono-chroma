//Web worker handling stopwatch stuff

onmessage = (e) => {
    const [msg,time] = e.data;
    switch(msg){
        case 'init':
           
            setInterval(()=>{

                const now = new Date();
                const ms = now-time;
                const stringTime = mmss(ms);               
                postMessage(['time',stringTime]);
                

            },1000)

        case 'stop':
                console.log('stoping', time);

        default:
            console.log('Missatge rebut del fil principal');
    }
    
    
  }


  function mmss(mls){

    let lasting = mls;
    const ms = lasting % 1000;
    lasting = (lasting - ms) / 1000;
    const segons = dummyZero(lasting % 60);
    lasting = (lasting - segons) / 60;
    const minuts = dummyZero(lasting % 60);    
    const duration = `${minuts}:${segons}`;
   
    return duration;    

}


  function hhmmss(mls){

    let lasting = mls;
    const ms = lasting % 1000;
    lasting = (lasting - ms) / 1000;
    const segons = dummyZero(lasting % 60);
    lasting = (lasting - segons) / 60;
    const minuts = dummyZero(lasting % 60);
    const hores = dummyZero((lasting - minuts) / 60);
    const duration = `${hores}:${minuts}:${segons}`;
   
    return duration;    

}

function dummyZero(n) {
    let nn = "" + n;
    if (nn.length === 1) {
        nn = "0" + n;
    }
    return nn;
}

