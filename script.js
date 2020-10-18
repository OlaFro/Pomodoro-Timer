// DOM elements
const body = document.querySelector("body")
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const colon = document.getElementById("colon")
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const minS = document.getElementById("minS");
const minB = document.getElementById("minB");
const displayS = document.getElementById("displayS");
const displayB = document.getElementById("displayB");
const info = document.getElementById("info");
const dots = document.querySelectorAll(".box");
const icons = document.querySelectorAll("i")
const progress = document.querySelector(".path");
const circle = document.querySelector(".circle")
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
  sessionMode();
  
});



function sessionMode() {
  
  theme("#1e88e5b3", "#ffc10799")

  switch(sessionCounter){
    case 1:
      document.getElementById("circle1").style.backgroundColor="rgba(33, 33, 33, 0.5)";
      document.getElementById("circle1").style.border="3px solid rgba(255, 255, 255, 0.5)";
      document.getElementById("circle1").style.boxShadow=`inset 2px 2px 2px 0 rgba(0, 0, 0, 0.4),
      -1px -1px 1px 0 rgba(255, 255, 255, 0.3)`
      break

    case 2:
      document.getElementById("circle2").style.backgroundColor="rgba(33, 33, 33, 0.5)";
      document.getElementById("circle2").style.border="3px solid rgba(255, 255, 255, 0.5)";
      document.getElementById("circle2").style.boxShadow=`inset 2px 2px 2px 0 rgba(0, 0, 0, 0.4),
      -1px -1px 1px 0 rgba(255, 255, 255, 0.3)`
        
    break
    case 3:
      document.getElementById("circle3").style.backgroundColor="rgba(33, 33, 33, 0.5)";
      document.getElementById("circle3").style.border="3px solid rgba(255, 255, 255, 0.5)";
      document.getElementById("circle3").style.boxShadow=`inset 2px 2px 2px 0 rgba(0, 0, 0, 0.4),
      -1px -1px 1px 0 rgba(255, 255, 255, 0.3)`
      
    break
    case 4:
      document.getElementById("circle4").style.backgroundColor="rgba(33, 33, 33, 0.5)";
      document.getElementById("circle4").style.border="3px solid rgba(255, 255, 255, 0.5)";
      document.getElementById("circle4").style.boxShadow=`inset 2px 2px 2px 0 rgba(0, 0, 0, 0.4),
      -1px -1px 1px 0 rgba(255, 255, 255, 0.3)`
      timeForBreak = false;
      lastSession = true;
    break
    default:
  }
  
  info.textContent = `You are in the session ${sessionCounter} `;
  timeForBreak = true;
  secondsInTotal = minutesInSession * 60;
  
  if (sessionCounter===4){
    clearInterval(counting);
  }
  progress.style.animation = `move ${secondsInTotal}s linear`;
  counting = setInterval(countDown, 100);
  rotateCircle(secondsInTotal)
  
}

function breakMode() {
  console.log("break");
  minutesInBreak = minB.value;
  minutes.textContent = minutesInBreak;
  secondsInTotal = minutesInBreak * 60;
  info.textContent = `Break for ${minB.value} minutes!`;
  timeForBreak = false;
  counting = setInterval(countDown, 100);
  rotateCircle(secondsInTotal);
  theme("#00c853", "#7e57c2");
}


function countDown() {
  secondsInTotal--;
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
}

function rotateCircle(duration){
  progress.style.transform = "rotate 0(deg)";
  progress.style.animation = `moveTracker ${duration}s linear`;
  // circle.style.animation = `rotateCircle ${duration}s linear`;
  console.log("rotating for" + duration);
}

function longBrake(){
  theme("#ffc10799","#e57373" )
  minutesInBreak = 1;
  minutes.textContent = minutesInBreak;
  secondsInTotal = minutesInBreak * 60;
  info.textContent = `Take 20 minutes break and start again`;
  longerBreak = true;

  counting = setInterval(countDown, 100);
}


function theme(colorA, colorB){
  minutes.style.color = `${colorA}`;
  colon.style.color = `${colorA}`;
  seconds.style.color = `${colorA}`;
  for (icon of icons){
    icon.style.color = `${colorA}`;
  }
  circle.style.boxShadow = `-16px -16px 25px ${colorA}, 16px 16px 25px ${colorB}`;
}


// stopping the timer
stopBtn.addEventListener("click", () => {
  startBtn.classList.toggle("hidden");
  stopBtn.classList.toggle("hidden");
  clearInterval(counting);
  sessionCounter = 1
  for (let circle of dots){
    circle.style.backgroundColor= ""
    circle.style.boxShadow=`inset 2px 2px 3px 0 rgba(0, 0, 0, 0.2),
      inset -1px -1px 2px 0 rgba(255, 255, 255, 0.5)`;
  }
  minutes.textContent = minS.value;
  seconds.textContent = "00";
  secondsInTotal = minutesInSession * 60;
  info.textContent = "Press start"; 
  progress.style.animationPlayState="paused"
  progress.style.transform="rotate(0deg)"
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
  progress.style.animationPlayState="paused"
  clearInterval(counting)
})

pauseEndBtn.addEventListener("click", ()=>{
  counting = setInterval(countDown, 1000);
  pauseStartBtn.classList.toggle("hidden");
  pauseEndBtn.classList.toggle("hidden");
  progress.style.animationPlayState="running"
})


/*
BUGS:
fixing the animation!!
break 6 min as default value
color mode for break
color mode for longer break



TO DO:

animation of the progress bar
adding sound


IN CASE OF UNEVEN SECONDS:
console.log(secondsInTotal);
console.log(new Date().getSeconds());

*/
