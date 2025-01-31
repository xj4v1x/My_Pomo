import { pomodoroClock } from "./poo_pomodoro.js";
import { globals } from "./globals.js";

const workTimeButton = document.getElementById("worktime_btn");
const breakTimeButton = document.getElementById("breaktime_btn");
const restTimeButton = document.getElementById("resttime_btn");

class Button {
    constructor(id, clock, action) {
        this.Button = document.getElementById(id);
        this.clock = clock;

        if (!this.Button) {
            console.log (`❌ El botón ${id} no existe`);
            return;
        }
        this.Button.addEventListener("click", () => this.handleClick(action));        
    }    
    handleClick(action) {
        action();
    }
    start() {
        if (!globals.isRunning) {
            this.clock.start();            
            globals.isRunning = true;
            this.Button.classList.add("active");
            this.addClass(stopButton, "ready");
            this.addClass(pauseButton, "ready");                    
        }
    }

    stop() {
        this.clock.stop();
        globals.isRunning = false;
        globals.inPause = false;
        this.Button.classList.remove("ready");
        startButton.Button.classList.remove("active");
        startButton.Button.innerText = "START";
        pauseButton.Button.classList.remove("ready");        
    }
    
    pause() {
        if (!globals.inPause) {
            globals.inPause = true;
            //globals.isRunning = false;
            this.clock.pause();
            this.Button.classList.add("active");        
        } else {
            globals.inPause = false;
            //globals.isRunning = true;
            this.clock.start();
            this.Button.classList.remove("active");        
        }
    }
    // Método para cambiar el texto del botón
    updateButtonText(text) {
        this.Button.innerText = text;
    }

    addClass(button, className) {
        button.Button.classList.add(className);
    }
}

export const startButton = new Button("startbutton", pomodoroClock, () => startButton.start());
export const stopButton = new Button("stopbutton", pomodoroClock, () => stopButton.stop());
export const pauseButton = new Button("pausebutton", pomodoroClock, () => pauseButton.pause());