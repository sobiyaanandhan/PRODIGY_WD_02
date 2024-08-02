// script.js
let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStop() {
    if (!isRunning) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTime, 1000);
        startStopBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    isRunning = false;
    laps = [];
    lapsContainer.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = display.textContent;
        laps.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = lapTime;
        lapsContainer.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.textContent = `${hours}:${minutes}:${seconds}`;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
