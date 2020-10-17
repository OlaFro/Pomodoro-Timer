// DOM elements
const body = document.querySelector("body")
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const minS = document.getElementById("minS");
const minB = document.getElementById("minB");
const displayS = document.getElementById("displayS");
const displayB = document.getElementById("displayB");
const info = document.getElementById("info");
const circles = document.querySelectorAll(".box");
const progress = document.getElementById("progress");
const fullScreenBtn = document.getElementById("fullScreenBtn")
const exitFullScreen = document.getElementById("exitFullScreenBtn")
const pauseStartBtn = document.getElementById("pauseStartBtn")
const pauseEndBtn = document.getElementById("pauseEndBtn")


// app variables
let minutesInSession = 25;
let minutesInBreak = 3;
let secondsInTotal;
var counting;
let timeForBreak = false;
let sessionCounter = 1;
let lastSession = false;
let longerBreak = false


// adjusting the duration of session/break
minS.addEventListener("input", () => {
  displayS.textContent = "Session " + minS.value + " min";
  minutesInSession = parseInt(minS.value);
  minutes.textContent = minutesInSession;
  return minutesInSession;
});

minB.addEventListener("input", () => {
  displayB.textContent = "Break " + minB.value + " min";
  minutesInBreak = parseInt(minB.value);
  return minutesInBreak;
});

// starting the timer
startBtn.addEventListener("click", () => {
  startBtn.classList.toggle("hidden");
  stopBtn.classList.toggle("hidden");
  // secondsInTotal = minutesInSession * 60;
  // progress.style.animation= `${secondsInTotal}s progress linear`;
  sessionMode();
  
});

function sessionMode() {
  // two lines to help the counter start right away:
  // secondsInTotal--;
  // countDown();
  switch(sessionCounter){
    case 1:
      document.getElementById("circle1").style.backgroundColor="#212121"
      document.getElementById("circle1").style.boxShadow="none"
      break

    case 2:
      document.getElementById("circle2").style.backgroundColor="#212121";
      document.getElementById("circle2").style.boxShadow="none"
        
    break
    case 3:
      document.getElementById("circle3").style.backgroundColor="#212121"
      document.getElementById("circle3").style.boxShadow="none"
      
    break
    case 4:
      document.getElementById("circle4").style.backgroundColor="#212121"
      document.getElementById("circle4").style.boxShadow="none"
      timeForBreak = false;
      lastSession = true;
    break
    default:
  }
  
  info.textContent = `You are in the session ${sessionCounter} `;
  timeForBreak = true;
  secondsInTotal = minutesInSession * 60;
  // progress.style.animation= `${secondsInTotal}s progress linear`;
  
  if (sessionCounter===4){
    clearInterval(counting);
  }
  counting = setInterval(countDown, 1000);
}

function breakMode() {
  console.log("break");
  minutesInBreak = minB.value;
  minutes.textContent = minutesInBreak;
  secondsInTotal = minutesInBreak * 60;
  info.textContent = `Break for ${minB.value} minutes!`;
  timeForBreak = false;

  counting = setInterval(countDown, 1000);
}


function countDown() {
  console.log(secondsInTotal);
  minutes.textContent = Math.floor(secondsInTotal / 60);
  seconds.textContent = secondsInTotal % 60;

  
  if (seconds.textContent < 10) {
    seconds.textContent = "0" + (secondsInTotal % 60);
  }

  if (secondsInTotal === 0 && timeForBreak == true && lastSession==false) {
    sessionCounter++
    clearInterval(counting);
    breakMode();
  }

  if (secondsInTotal === 0 && lastSession==false) {
    clearInterval(counting);
    sessionMode();
  }
 
  if (secondsInTotal === 0 && longerBreak==false ){
    clearInterval(counting)
    longBrake()
  }

  if (secondsInTotal ===0 && longerBreak===true){
    clearInterval(counting)
  } 
    

  secondsInTotal--;

}

function longBrake(){
  console.log("break");
  minutesInBreak = 20;
  minutes.textContent = minutesInBreak;
  secondsInTotal = minutesInBreak * 60;
  info.textContent = `Take a longer 20 minutes break and start again`;
  body.style.background = "white"
  body.style.color = "red";
  longerBreak = true;
  
  counting = setInterval(countDown, 1000);
}


// stopping the timer
stopBtn.addEventListener("click", () => {
  startBtn.classList.toggle("hidden");
  stopBtn.classList.toggle("hidden");
  clearInterval(counting);
  sessionCounter = 1
  for (let circle of circles){
    circle.style.backgroundColor= ""
    circle.style.boxShadow=`inset 2px 2px 3px 0 rgba(0, 0, 0, 0.2),
      inset -1px -1px 2px 0 rgba(255, 255, 255, 0.5)`;
  }
 
  minutes.textContent = minS.value;
  seconds.textContent = "00";
  secondsInTotal = minutesInSession * 60;
  info.textContent = "Press start"; 
});



// full screen 
fullScreenBtn.addEventListener("click", ()=> {
  
  if (fullScreenBtn.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (fullScreenBtn.mozRequestFullScreen) { /* Firefox */
    document.documentElement.mozRequestFullScreen();
  } else if (fullScreenBtn.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    document.documentElement.webkitRequestFullscreen();
  } else if (fullScreenBtn.msRequestFullscreen) { /* IE/Edge */
    document.documentElement.msRequestFullscreen();
  }
  fullScreenBtn.classList.toggle("hidden");
  exitFullScreen.classList.toggle("hidden");
});


exitFullScreen.addEventListener("click", ()=> {
  document.exitFullscreen()
  fullScreenBtn.classList.toggle("hidden");
  exitFullScreen.classList.toggle("hidden");

})


//pause the counting

pauseStartBtn.addEventListener("click", ()=>{
  pauseStartBtn.classList.toggle("hidden");
  pauseEndBtn.classList.toggle("hidden");
  clearInterval(counting)
})

pauseEndBtn.addEventListener("click", ()=>{
  counting = setInterval(countDown, 1000);
  pauseStartBtn.classList.toggle("hidden");
  pauseEndBtn.classList.toggle("hidden");
})


/*
BUGS:
how to start the counting right away after clicking start?
how to synchronize the animation of the progress bar?


TO DO:

animation of the progress bar
adding sound


IN CASE OF UNEVEN SECONDS:
console.log(secondsInTotal);
console.log(new Date().getSeconds());

*/
