// DOM elements
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const sessionMinus = document.getElementById("sessionMinus");
const sessionPlus = document.getElementById("sessionPlus");
const breakMinus = document.getElementById("breakMinus");
const breakPlus = document.getElementById("breakPlus");
const sessionDuration = document.getElementById("sessionDuration");
const breakDuration = document.getElementById("breakDuration");
const info = document.getElementById("info");

// app variables
let minutesAdjust = minutesInSession;
// minutesInSession variable must come from the adjust panel
let minutesInSession = 25;
let secondsInTotal = minutesInSession * 60;
var counting;

// setting the duration of session/break

sessionMinus.addEventListener("click", () => {
  console.log(secondsInTotal);
  if (minutesInSession > 0) {
    minutesAdjust = minutesInSession - 1;
    sessionDuration.textContent = "Session " + minutesInSession + " min";
    minutes.textContent = minutesInSession;
  } else {
    sessionMinus.disabled = true;
  }
  return minutesAdjust;
});

sessionPlus.addEventListener("click", () => {
  if (minutesInSession <= 34) {
    minutesInSession++;
    sessionDuration.textContent = "Session " + minutesInSession + " min";
    minutes.textContent = minutesInSession;
  } else {
    sessionMinus.disabled = true;
  }
  return minutesInSession;
});

// timer functions:

minutes.textContent = minutesInSession;
startBtn.addEventListener("click", pomodoro);

function pomodoro() {
  console.log("session");
  // two lines to help the counter start right away:
  secondsInTotal--;
  countDown();

  counting = setInterval(countDown, 100);
  startBtn.classList.toggle("hidden");
  stopBtn.classList.toggle("hidden");
  info.textContent = "You are in the session";
  document.body.style.color = "white";
}

function countDown() {
  minutes.textContent = Math.floor(secondsInTotal / 60);
  seconds.textContent = secondsInTotal % 60;

  if (seconds.textContent < 10) {
    seconds.textContent = "0" + (secondsInTotal % 60);
  }

  if (secondsInTotal === 0) {
    clearInterval(counting);
    breakMode();
  }

  //   console.log(secondsInTotal);
  //   console.log(new Date().getSeconds());
  secondsInTotal--;
}

stopBtn.addEventListener("click", () => {
  startBtn.classList.toggle("hidden");
  stopBtn.classList.toggle("hidden");
  clearInterval(counting);
  minutes.textContent = minutesInSession;
  seconds.textContent = "00";
  secondsInTotal = minutesInSession * 60;
  info.textContent = "Press start";
});

function breakMode() {
  console.log("break");
  minutesInSession = 1;
  minutes.textContent = minutesInSession;
  seconds.textContent = "00";
  secondsInTotal = minutesInSession * 60;
  info.textContent = "Break!";
  document.body.style.color = "black";

  counting = setInterval(countDown, 100);
  if (secondsInTotal === 0) {
    clearInterval(counting);
    pomodoro();
  }
}
