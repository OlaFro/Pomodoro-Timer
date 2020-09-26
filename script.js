// DOM elements
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const boxes = document.querySelectorAll("boxes");

// app variables
let minutesInSession = 25;
let secondsInTotal = minutesInSession * 60;

var counting;
let breaks;
let sessions;

minutes.textContent = minutesInSession;

startBtn.addEventListener("click", pomodoro);

function pomodoro() {
  secondsInTotal--;
  startBtn.classList.toggle("hidden");
  stopBtn.classList.toggle("hidden");
  counting = setInterval(countDown, 100);
}

function countDown() {
  minutes.textContent = Math.floor(secondsInTotal / 60);
  seconds.textContent = secondsInTotal % 60;

  if (seconds.textContent < 10) {
    seconds.textContent = "0" + (secondsInTotal % 60);
  }

  if (minutes.textContent == 0 && seconds.textContent == "0" + 0) {
    clearInterval(counting);
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
});
