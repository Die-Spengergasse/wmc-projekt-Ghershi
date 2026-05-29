const state = {
  timeLeft: 25 * 60,
  isRunning: false,
  mode: "focus",
  darkMode: false
};


const timerDisplay = document.querySelector("#timerDisplay");
const statusText = document.querySelector("#statusText");
const modeText = document.querySelector("#modeText");

const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");
const focusBtn = document.querySelector("#focusBtn");
const breakBtn = document.querySelector("#breakBtn");
const themeBtn = document.querySelector("#themeBtn");

let intervalId = null;


function loadState() {
  const savedState = localStorage.getItem("pomodoroState");

  if (savedState) {
    const parsedState = JSON.parse(savedState);

    state.timeLeft = parsedState.timeLeft;
    state.mode = parsedState.mode;
    state.darkMode = parsedState.darkMode;
    state.isRunning = false;
  }
}


function saveState() {
  localStorage.setItem("pomodoroState", JSON.stringify(state));
}


function render() {
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;

  timerDisplay.textContent =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

  if (state.mode === "focus") {
    modeText.textContent = "Focus Time";
  } else {
    modeText.textContent = "Break Time";
  }

  if (state.darkMode) {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeBtn.textContent = "🌙";
  }

  document.title = timerDisplay.textContent + " - Pomodoro";
}


function startTimer() {
  if (state.isRunning) {
    return;
  }

  state.isRunning = true;
  statusText.textContent = "Timer is running. Stay focused 🌱";

  intervalId = setInterval(function () {
    state.timeLeft--;

    if (state.timeLeft <= 0) {
      clearInterval(intervalId);
      state.isRunning = false;
      statusText.textContent = "Time is up! Take a break 🎉";
      alert("Time is up!");
    }

    render();
    saveState();
  }, 1000);
}

function pauseTimer() {
  clearInterval(intervalId);
  state.isRunning = false;
  statusText.textContent = "Timer paused ☕";
  saveState();
}

function resetTimer() {
  clearInterval(intervalId);
  state.isRunning = false;

  if (state.mode === "focus") {
    state.timeLeft = 25 * 60;
  } else {
    state.timeLeft = 5 * 60;
  }

  statusText.textContent = "Timer reset ✨";
  render();
  saveState();
}

function setFocusMode() {
  clearInterval(intervalId);
  state.mode = "focus";
  state.timeLeft = 25 * 60;
  state.isRunning = false;
  statusText.textContent = "Focus mode selected 💻";
  render();
  saveState();
}

function setBreakMode() {
  clearInterval(intervalId);
  state.mode = "break";
  state.timeLeft = 5 * 60;
  state.isRunning = false;
  statusText.textContent = "Break mode selected 🌸";
  render();
  saveState();
}

function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  render();
  saveState();
}


startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
focusBtn.addEventListener("click", setFocusMode);
breakBtn.addEventListener("click", setBreakMode);
themeBtn.addEventListener("click", toggleDarkMode);


loadState();
render();
