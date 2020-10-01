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

// app variables
let minutesInSession = 25;
let minutesInBreak = 3;
let secondsInTotal;
var counting;
let timeForBreak = false;
let cycle = 0;

// adjusting the duration of session/break
minS.addEventListener("input", () => {
  displayS.textContent = "Session " + minS.value + " min";
  minutesInSession = parseInt(minS.value);
  secondsInTotal = minutesInSession * 60;
  minutes.textContent = parseInt(minS.value);
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
  console.log("session");
  // two lines to help the counter start right away:
  // secondsInTotal--;
  // countDown();

  info.textContent = "You are in the session";
  document.body.style.color = "white";
  timeForBreak = true;
  secondsInTotal = minutesInSession * 60;
  counting = setInterval(countDown, 100);
}

function breakMode() {
  console.log("break");
  minutesInSession = minB.value;
  minutes.textContent = minutesInSession;
  seconds.textContent = "00";
  secondsInTotal = minutesInSession * 60;
  info.textContent = `Break for ${minB.value} minutes!`;
  document.body.style.color = "black";
  timeForBreak = false;
  counting = setInterval(countDown, 100);
}

function countDown() {
  minutes.textContent = Math.floor(secondsInTotal / 60);
  seconds.textContent = secondsInTotal % 60;

  if (secondsInTotal < 10) {
    seconds.textContent = "0" + (secondsInTotal % 60);
  }

  if (secondsInTotal === 0 && timeForBreak == true) {
    clearInterval(counting);
    breakMode();
  }

  if (secondsInTotal === 0) {
    clearInterval(counting);
    sessionMode();
  }

  //   console.log(secondsInTotal);
  //   console.log(new Date().getSeconds());
  secondsInTotal--;
  console.log(secondsInTotal);
}

// stopping the timer
stopBtn.addEventListener("click", () => {
  startBtn.classList.toggle("hidden");
  stopBtn.classList.toggle("hidden");
  clearInterval(counting);
  minutes.textContent = minutesInSession;
  seconds.textContent = "00";
  secondsInTotal = minutesInSession * 60;
  info.textContent = "Press start";
});

/*
BUGS:
none at this stage

PROBLEMS:
how to count the whole cycles and fill every dot after finishing one?
idea: for loop? how about performance? 
forEach or map / dynamic ID in an array for filling the dots 
*/
