import { start_button, pause_button, stop_button } from "./buttons.js";
import { globals } from "./globals.js";
import { loadActualTask } from "./tasks.js";

const clock =  document.getElementById("clock");

/* ************** *  POMODORO  ** ******************* */
/* ************** DOM ******************* */
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");

/* ************** VARIABLES RELOJ ******************* */
let tiempoTotal = 0;
// Configuración del Tiempo para cada modo
let workTime = true; let workTime_Mins = globals.worktimeMinutes;
let breakTime = false; let breakTime_Mins = globals.breaktimeMinutes;
let restTime = false; let restTime_Mins = globals.resttimeMinutes;

const speed = 100; /* 1000 = 1 segundo */

let totalPomodoros = 0;
let totalBreakTime = 0;
let totalRestTime = 0;

// Minutos y Segundos del timer
let pomodoroMins;
let pomodoroSecs;

pomodoroMins = parseInt(mins.innerText);
pomodoroSecs = parseInt(secs.innerText);

/* ************** PROGRESO RELOJ ******************* */
// Selecciona el círculo
const circle = document.querySelector(".progress-ring__circle");
const outcircle = document.querySelector(".out-ring__circle");
const incircle = document.querySelector(".in-ring__circle");

// Radio del círculo
const radius = circle.r.baseVal.value;
const inradius = incircle.r.baseVal.value;
const outradius = outcircle.r.baseVal.value;

// Perímetro del círculo (longitud del trazo)
const circumference = 2 * Math.PI * radius;
const incircumference = 2 * Math.PI * inradius;
const outcircumference = 2 * Math.PI * outradius;

// Establecer el perímetro como stroke-dasharray
circle.style.strokeDasharray = `${circumference} ${circumference}`;
incircle.style.strokeDasharray = `${incircumference} ${incircumference}`;
outcircle.style.strokeDasharray = `${outcircumference} ${outcircumference}`;
circle.style.strokeDashoffset = circumference;

incircle.style.strokeDashoffset = incircumference;
outcircle.style.strokeDashoffset = outcircumference;

const inoffset = incircumference - 1 * incircumference;
incircle.style.strokeDashoffset = inoffset;
const outoffset = outcircumference - 1 * outcircumference;
outcircle.style.strokeDashoffset = outoffset;


window.addEventListener("load", (event) => {
    timer = undefined;
    loadPomodoro();
});


/********************** loadPomodoro ******************************/
function loadPomodoro(){
    loadActualTask();
    if (workTime == true) {
        mins.innerText = workTime_Mins;
    } else if (breakTime == true) {
        mins.innerText = breakTime_Mins;
    } else {
        mins.innerText = restTime_Mins;
    };
    secs.innerText = "00";
    pomodoroMins = parseInt(mins.innerText);    
    pomodoroSecs = parseInt(secs.innerText);
    tiempoTotal = pomodoroMins*60 + pomodoroSecs;
    if (!globals.running) {
        start_button.classList.remove('active');
    }
};

/********************** startPomodoro ******************************/
function startPomodoro(){
    start_button.classList.add("active");
    pause_button.classList.remove('active');
    pause_button.classList.add('ready');
    stop_button.classList.add('ready');
    if (typeof timer === "undefined") {
        if (!globals.inpause) {
            timer = setInterval(() => {
                const porcentaje = (pomodoroMins*60+pomodoroSecs)*100/tiempoTotal;
                if (pomodoroSecs>=0 || pomodoroMins>=0) {
                    pomodoroSecs -= 1;
                    if (pomodoroSecs < 0 && pomodoroMins>0) {
                        pomodoroSecs = 59;
                        pomodoroMins -= 1;
                    }
                    pomodoroSecs<10 ? secs.innerText = '0' + pomodoroSecs : secs.innerText = pomodoroSecs;
                    pomodoroMins<10 ? mins.innerText = '0' + pomodoroMins : mins.innerText = pomodoroMins;
                    setProgress(porcentaje);
                    if (pomodoroSecs<0) {
                        if (workTime) {
                            totalPomodoros += 1;
                            console.log("Pomodoros Totales: " + totalPomodoros);
                            pomodoroComplete();
                            changeMode(1);
                        } else if (breakTime) {
                            totalBreakTime += 1;
                            console.log("Break Time Totales: " + totalBreakTime);
                            changeMode(0);
                        }
                        loadPomodoro();
                        stopPomodoro();
                    }
                } else {
                    loadPomodoro();
                    stopPomodoro();
                }
            }, speed);
        } else {
            loadPomodoro();
            stopPomodoro();
        }
    } else {
        stopPomodoro();
    }
};

/********************** stopPomodoro ******************************/
function stopPomodoro(){
    setProgress(100);
    globals.running = false;
    globals.inpause = false;
    start_button.classList.remove('active');
    pause_button.classList.remove('active');
    pause_button.classList.remove('ready');
    stop_button.classList.remove('active');
    stop_button.classList.remove('ready');
    loadPomodoro();
    if (typeof timer != "undefined") {
        clearInterval(timer);
        timer = undefined;
    }
}

/********************** pausePomodoro ******************************/
function pausePomodoro(){
    if (globals.running) {
        globals.running = false;
        globals.inpause = true;
        clearInterval(timer);
        pause_button.classList.toggle('active');
    } else if (globals.inpause) {
            globals.inpause = false;
            globals.running = true;
            timer = undefined;
            pause_button.classList.toggle('active');
            startPomodoro();
    }
}

/********************** setProgress ******************************/
function setProgress(percentage) {
    const offset =  (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

/********************** changeColor ******************************/
function changeColor(colorVar) {    
    circle.style.stroke = 'var(' + colorVar + ')';
    outcircle.style.stroke = 'var(' + colorVar + ')';
    incircle.style.stroke = 'var(' + colorVar + ')';
    mins.style.color = 'var(' + colorVar + ')';    
    secs.style.color = 'var(' + colorVar + ')';
    clock.style.color = 'var(' + colorVar + ')';
}

/********************** changeMode ******************************/
function changeMode(mode) {
    stopPomodoro();
    mode == 0 ? workTime = true : workTime = false;
    mode == 1 ? breakTime = true : breakTime = false;
    mode == 2 ? restTime = true : restTime = false;
    
    workTime ? pomodoroMins = workTime_Mins :
        breakTime ? pomodoroMins = breakTime_Mins :        
            restTime ? pomodoroMins = restTime_Mins : console.log("ERROR");
    
    workTime ? changeColor("--blue-color") :
        breakTime ? changeColor("--orange-color") :
            restTime ? changeColor("--green-color") :
                console.log("ERROR");

    workTime ? worktime_btn.classList.add('work') : worktime_btn.classList.remove('work');
    breakTime ? breaktime_btn.classList.add('brake') : breaktime_btn.classList.remove('brake');
    restTime ? resttime_btn.classList.add('rest') : resttime_btn.classList.remove('rest');
    
    start_button.classList.remove('active');
    pause_button.classList.remove('active');

    mins.innerText = pomodoroMins;
    secs.innerText = "00";
}











function pomodoroComplete() {

}



/**************************** EXPORTS ******************************/
export {loadPomodoro, startPomodoro, stopPomodoro, pausePomodoro, setProgress};
export {changeColor, changeMode, loadActualTask};
