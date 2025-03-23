const RANDOM_Q_API_URL="https://api.quotable.io/random";
const qouteDisplay= document.getElementById('para_Disply');
const qouteInput= document.getElementById('input_Display');
const timer = document.getElementById('timer');
const recordtime = document.getElementById('recordtime');

qouteInput.addEventListener('input', ()=>{
  const arrayQoute = qouteDisplay.querySelectorAll('span')
  const arrayInput = qouteInput.value.split('')
  let corrected = true;
  // console.log(arrayInput,arrayQoute)

  arrayQoute.forEach((letterspan, index)=>{
    const inputletter= arrayInput[index]
    
    if (inputletter == null){
      letterspan.classList.remove('correct');
      letterspan.classList.remove('incorrect');
      corrected = false;

    }else if (inputletter == letterspan.innerText){
      letterspan.classList.add('correct');
      letterspan.classList.remove('incorrect')
    }else {
      letterspan.classList.add('incorrect');
      letterspan.classList.remove('correct');
      corrected = false;
    }
  })



  if(corrected) {
    let time=getTimertime()
  
    const record= document.createElement('span');
    record.innerText=`Time: ${time} seconds -wait for 5 second to retry`;
    recordtime.appendChild(record)
    record.innerHTML+='<br>';

    starttime()
    setTimeout(() => {
      nextQuote();
    }, 5000);
     
    
  } 
  
})


function getRandomQuote(){
  return fetch (RANDOM_Q_API_URL)
          .then(response => response.json())
          .then(data=> data.content)
   
}
async function nextQuote(){

  const qoute= await getRandomQuote();
  console.log(qoute);
  qouteDisplay.innerText='';

  qoute.split('').forEach((latter)=>{
    const latterspan= document.createElement('span');
    latterspan.innerText=latter;
    qouteDisplay.appendChild(latterspan);
  })
  qouteInput.value=null;
  starttime();
}

let starttimer

function starttime(){
    timer.innerText=0;
    starttimer = new Date();
    setInterval(()=>{
    timer.innerText = getTimertime();
    },1000)
}

function  getTimertime(){
  return Math.floor((new Date()- starttimer)/1000);
}


nextQuote();