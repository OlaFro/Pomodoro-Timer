// DOM elements
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


// app variables
let minutesInSession = 25;
let minutesInBreak = 3;
let secondsInTotal;
var counting;
let timeForBreak = false;
let sessionCounter = 1;
let longBreak = false;


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
      document.getElementById("circle2").style.backgroundColor="white"
    break
    case 3:
      document.getElementById("circle3").style.backgroundColor="white"
    break
    case 4:
      document.getElementById("circle4").style.backgroundColor="white"
      timeForBreak = false;
      longBreak = true;
    break
    default:
  }
  

  info.textContent = "You are in the session";
  document.body.style.color = "white";
  timeForBreak = true;
  secondsInTotal = minutesInSession * 60;
  counting = setInterval(countDown, 100);
}

function breakMode() {
  console.log("break");
  minutesInBreak = minB.value;
  minutes.textContent = minutesInBreak;
  secondsInTotal = minutesInBreak * 60;
  info.textContent = `Break for ${minB.value} minutes!`;
  document.body.style.color = "black";
  timeForBreak = false;
  counting = setInterval(countDown, 100);
}

function countDown() {
  minutes.textContent = Math.floor(secondsInTotal / 60);
  seconds.textContent = secondsInTotal % 60;

  if (seconds.textContent < 10) {
    seconds.textContent = "0" + (secondsInTotal % 60);
  }

  if (secondsInTotal === 0 && timeForBreak == true) {
    sessionCounter++
    clearInterval(counting);
    breakMode();
  }

  if (secondsInTotal === 0 ) {
    clearInterval(counting);
    sessionMode();
  }
 
  if (secondsInTotal === 0 && sessionCounter===4){
    clearInterval(counting)
    
  }

  secondsInTotal--;

  console.log(secondsInTotal);
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


PROBLEMS:

IN CASE OF UNEVEN SECONDS:
console.log(secondsInTotal);
console.log(new Date().getSeconds());

*/
