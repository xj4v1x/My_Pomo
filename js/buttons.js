import { startPomodoro, stopPomodoro, pausePomodoro, loadPomodoro, changeMode } from "./pomodoro.js";
import { globals } from "./globals.js";

const start_button = document.getElementById("startbutton");
const pause_button = document.getElementById("pausebutton");
const stop_button = document.getElementById("stopbutton");

const worktime_button = document.getElementById("worktime_button");
const shortbreak_button = document.getElementById("shortbreak_button");
const longbreak_button = document.getElementById("longbreak_button");


/**************************** START BUTTON ******************************/
start_button.addEventListener("click", function () {
    globals.running = !globals.running;
    if (globals.running) {        
        startPomodoro();
    } else {
        stopPomodoro();
    }
    loadPomodoro();
});

/**************************** STOP BUTTON ******************************/
stop_button.addEventListener("click", function () {                    
    stopPomodoro();    
    loadPomodoro(); 
});

/**************************** PAUSE BUTTON ******************************/
pause_button.addEventListener("click", function () {
    pausePomodoro();
});

/********************** Work Time BUTTON ******************************/
worktime_btn.addEventListener("click", function () {
    changeMode(0);
});

/********************** Break Time BUTTON ******************************/
breaktime_btn.addEventListener("click", function () {
    changeMode(1);
});

/********************** Rest Time BUTTON ******************************/
resttime_btn.addEventListener("click", function () {   
    changeMode(2);
});



/**************************** EXPORTS ******************************/
export {start_button, pause_button, stop_button};
