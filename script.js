const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const btn = document.getElementById("startBtn");
const boxes = document.querySelectorAll("boxes");
let breaks;
let sessions;

let minutesInSession = 25;
var secondsInTotal = minutesInSession * 60;

btn.addEventListener("click", () => {
  setInterval(countDown, 999);
  function countDown() {
    minutes.textContent = Math.floor(secondsInTotal / 60);
    seconds.textContent = secondsInTotal % 60;
    secondsInTotal--;
    console.log(secondsInTotal);
    console.log(new Date().getSeconds());
    btn.disabled = true;
  }
});
