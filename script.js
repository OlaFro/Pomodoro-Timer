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
const circles = document.querySelectorAll("box")
const progress = document.querySelector(".circle__progress--fill")



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
  // two lines to help the counter start right away:
  // secondsInTotal--;
  // countDown();

  switch(sessionCounter){
    case 1:
      document.getElementById("circle1").style.backgroundColor="white"
      break
    case 2:
      document.getElementById("circle2").style.backgroundColor="white";
      body.style.background = "linear-gradient(to right, #a18cd1, #fbc2eb)";   
    break
    case 3:
      document.getElementById("circle3").style.backgroundColor="white"
      body.style.background = "linear-gradient(to left, #a3bded 0%, #6991c7 100%)";
    break
    case 4:
      document.getElementById("circle4").style.backgroundColor="white"
      body.style.background = "linear-gradient(to right, #FFC796 0%, #FF6B95 100%)";
      timeForBreak = false;
  lastSession = true;
    break
    default:
  }
  

  info.textContent = `You are in the ${sessionCounter} session`;
  document.body.style.color = "white";
  timeForBreak = true;
  secondsInTotal = minutesInSession * 60;
  if (sessionCounter===4){
    clearInterval(counting);
  }
  counting = setInterval(countDown, 100);
}

function breakMode() {
  console.log("break");
  minutesInBreak = minB.value;
  minutes.textContent = minutesInBreak;
  secondsInTotal = minutesInBreak * 60;
  info.textContent = `Break for ${minB.value} minutes!`;
  document.body.style.color = "#1B2631";
  timeForBreak = false;
  
  counting = setInterval(countDown, 100);
}


function countDown() {
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
  minutesInBreak = 1;
  minutes.textContent = minutesInBreak;
  secondsInTotal = minutesInBreak * 60;
  info.textContent = `Take a longer 20 minutes break and start again`;
  body.style.background = "white"
  body.style.color = "red";
  longerBreak = true;
  
  counting = setInterval(countDown, 100);
}


// stopping the timer
stopBtn.addEventListener("click", () => {
  startBtn.classList.toggle("hidden");
  stopBtn.classList.toggle("hidden");
  clearInterval(counting);
  sessionCounter = 1
  document.getElementById("circle1").style.backgroundColor= ""
  document.getElementById("circle2").style.backgroundColor= ""
  document.getElementById("circle3").style.backgroundColor= ""
  document.getElementById("circle4").style.backgroundColor= ""

  minutes.textContent = minS.value;
  seconds.textContent = "00";
  secondsInTotal = minutesInSession * 60;
  info.textContent = "Press start"; 
});





/*
BUGS:
how to start the counting right away after clicking start?

PROBLEMS:

how to stop the cycle?

IN CASE OF UNEVEN SECONDS:
console.log(secondsInTotal);
console.log(new Date().getSeconds());

*/
