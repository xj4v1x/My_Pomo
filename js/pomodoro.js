
/* *************************************************** */
/* ************** *  POMODORO  ** ******************* */
/* *************************************************** */

const mins = document.getElementById("mins");
const secs = document.getElementById("secs");
let tiempoTotal = 0;
const start_button = document.getElementById("startbutton");
const pause_button = document.getElementById("pausebutton");
const stop_button = document.getElementById("stop_button");

const worktime_button = document.getElementById("worktime_button");
const shortbreak_button = document.getElementById("shortbreak_button");
const longbreak_button = document.getElementById("longbreak_button");

const body = document.body;
const root = document.documentElement;

// Configuración del Tiempo para cada modo
let workTime = true; let workTime_Mins = 25;
let breakTime = false; let breakTime_Mins = 5;
let restTime = false; let restTime_Mins = 15;

const speed = 100; /* 1000 = 1 segundo */
// Minutos y Segundos del timer
let pomodoroMins;
let pomodoroSecs;
pomodoroMins = parseInt(mins.innerText);
pomodoroSecs = parseInt(secs.innerText);
// Estado de los botones del timer
let running = false;
let inpause = false;


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


function setProgress(percentage) {
    const offset =  (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;    
}

window.addEventListener("load", (event) => {
    timer = undefined;
    loadPomodoro();
});

function loadPomodoro(){
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
    if (!running) {
        start_button.classList.remove('active');
    }
};


/**************************** START BUTTON ******************************/
/**************************** START BUTTON ******************************/
/**************************** START BUTTON ******************************/

start_button.addEventListener("dblclick", function () {
    console.log("x2");
});

start_button.addEventListener("click", function () {    
    running = !running;
    if (running) {
        start_button.classList.add("active");
        pause_button.classList.remove('active');
        pause_button.classList.add('ready');
        stop_button.classList.add('ready');
        startPomodoro();
    } else {            
        stopPomodoro();
    }     
    loadPomodoro(); 
});

function startPomodoro(){
    if (typeof timer === "undefined") {        
        if (!inpause) {            
            timer = setInterval(() => {
                const porcentaje = (pomodoroMins*60+pomodoroSecs)*100/tiempoTotal;
                if (pomodoroSecs>=0 || pomodoroMins>=0) {
                    pomodoroSecs -= 1;                    
                    if (pomodoroSecs < 0 && pomodoroMins>0) {             
                        pomodoroSecs = 59;
                        pomodoroMins -= 1;
                    }
                    if (pomodoroSecs<0) {
                        loadPomodoro();
                        stopPomodoro();
                    }
                } else {
                    loadPomodoro();
                    stopPomodoro();
                }
                pomodoroSecs<10 ? secs.innerText = '0' + pomodoroSecs : secs.innerText = pomodoroSecs;
                pomodoroMins<10 ? mins.innerText = '0' + pomodoroMins : mins.innerText = pomodoroMins;
                setProgress(porcentaje);
            }, speed);
        } else {
            loadPomodoro();
            stopPomodoro();
        }
    } else {        
        stopPomodoro();
    }
};


/**************************** STOP BUTTON ******************************/
/**************************** STOP BUTTON ******************************/
/**************************** STOP BUTTON ******************************/
stop_button.addEventListener("click", function () {                    
    stopPomodoro();    
    loadPomodoro(); 
});

function stopPomodoro(){
    running = false;
    inpause = false;
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

/**************************** PAUSE BUTTON ******************************/
/**************************** PAUSE BUTTON ******************************/
/**************************** PAUSE BUTTON ******************************/
pause_button.addEventListener("click", function () {
    console.log("running");
    pausePomodoro();
});

function pausePomodoro(){
    if (running) {
        running = false;
        inpause = true;        
        clearInterval(timer);
        //start_button.classList.toggle('active');
        pause_button.classList.toggle('active');
    } else if (inpause) {
            inpause = false;
            running = true;        
            timer = undefined;
            //start_button.classList.toggle('active');
            pause_button.classList.toggle('active');
            startPomodoro();
    }    
}

/* *************************************************** */
/* ************** **  STATUS BAR  ** **************** */
/* ************************************************* */

const worktime_btn = document.getElementById("worktime_btn");
const breaktime_btn = document.getElementById("breaktime_btn");
const resttime_btn = document.getElementById("resttime_btn");
const start_btn = document.getElementById("startbutton");
const pause_btn = document.getElementById("pausebutton");
const clock =  document.getElementById("clock");


worktime_btn.addEventListener("click", function () {
    changeMode(0);
});

breaktime_btn.addEventListener("click", function () {
    changeMode(1);
});

resttime_btn.addEventListener("click", function () {   
    changeMode(2);
});

function changeColor(colorVar) {    
    circle.style.stroke = 'var(' + colorVar + ')';
    outcircle.style.stroke = 'var(' + colorVar + ')';
    incircle.style.stroke = 'var(' + colorVar + ')';
    mins.style.color = 'var(' + colorVar + ')';    
    secs.style.color = 'var(' + colorVar + ')';
    clock.style.color = 'var(' + colorVar + ')';
}

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
    
    start_btn.classList.remove('active');
    pause_btn.classList.remove('active');

    mins.innerText = pomodoroMins;
    secs.innerText = "00";
}