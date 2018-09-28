const workUpBtn = document.querySelector("#workup");
const workDownBtn = document.querySelector("#workdown");
const breakUpBtn = document.querySelector("#breakup");
const breakDownBtn = document.querySelector("#breakdown");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const resumeBtn = document.querySelector(".resume");
const resetBtn = document.querySelector(".reset");
const timerDisplay = document.querySelector(".time");
const workMinutes = document.querySelector("#workmin");
const breakMinutes = document.querySelector("#breakmin");
const breakText = document.querySelector(".break");

let time = {
    workMin: 25,
    breakMin: 5,
    remainingSecs: 0,
    then: 0,
    timerID: null,
    isRunning: false,
    work: false,
    break: false,
    timer: function () {
        const secondsLeft = Math.round((time.then - Date.now()) / 1000);
        time.remainingSecs = secondsLeft;
        if (secondsLeft === 0 && time.work === true) {
            clearInterval(time.timerID);
            time.work = false;
            breakText.textContent = 'Break';
            startBreakTimer();
        } else if (secondsLeft === 0 && time.break === true) {
            clearInterval(time.timerID);
            time.break = false;
            breakText.textContent = '';
            startWorkTimer();
        }
        displayTimeLeft(secondsLeft);
    }
};

workUpBtn.addEventListener("click", function () {
    time.workMin++;
    workMinutes.textContent = time.workMin;
});

workDownBtn.addEventListener("click", function () {
    if (time.workMin > 1) {
        time.workMin--;
        workMinutes.textContent = time.workMin;
    }
});

breakUpBtn.addEventListener("click", function () {
    time.breakMin++;
    breakMinutes.textContent = time.breakMin;
});

breakDownBtn.addEventListener("click", function () {
    if (time.breakMin > 1) {
        time.breakMin--;
        breakMinutes.textContent = time.breakMin;
    }
});

startBtn.addEventListener("click", function () {
    if (time.isRunning === false && time.timerID === null) {
        startWorkTimer();
    }
});

pauseBtn.addEventListener("click", function () {
    clearInterval(time.timerID);
    time.isRunning = false;
});

resumeBtn.addEventListener("click", function () {
    if (time.isRunning === false) {
        if (time.work === true) {
            startWorkTimer();
        } else {
            startBreakTimer();
        }
    }
});

resetBtn.addEventListener("click", function () {
    resetTimer();
});


function startWorkTimer() {
   const now = Date.now();
   if (time.remainingSecs === 0) {
        time.then = now + (time.workMin * 60) * 1000;
    } else {
        time.then = now + time.remainingSecs * 1000;
    }
    
    time.timerID = setInterval(time.timer, 1000);
    time.isRunning = true;
    time.work = true;
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    const display = `${minutes}:${secondsLeft < 10 ? '0':''}${secondsLeft}`;
    timerDisplay.textContent = display;
}

function startBreakTimer() {
    const now = Date.now();
    time.then = now + (time.breakMin * 60) * 1000;
    time.timerID = setInterval(time.timer, 1000);
    time.break = true;
}

function resetTimer() {
    clearInterval(time.timerID);
    time.workMin = 25;
    time.breakMin = 5;
    time.remainingSecs = 0;
    time.then = 0;
    time.timerID = null;
    time.isRunning = false;
    time.work = false;
    time.break = false;

    workMinutes.textContent = time.workMin;
    breakMinutes.textContent = time.breakMin;
    timerDisplay.textContent = "00:00";
    breakText.textContent = '';
}
