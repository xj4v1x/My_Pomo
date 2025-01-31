
class Clock {
    constructor(minutes = 0, seconds = 0, steps = 1000) {
        this.initialMinutes = minutes;
        this.initialSeconds = seconds;
        this.steps = steps;
        this.minutes = minutes;
        this.seconds = seconds;
        this.interval = null;
    }

//  start()   Inicia el reloj
    start() {
        if (this.interval) return;
        this.interval = setInterval(() => {
            this.run();
            this.updateDisplay();
        }, this.steps);
    }

//  pause()     Pausa el reloj
    pause() {
        clearInterval(this.interval);
        this.interval = null;
        console.log("⏹ Reloj pausado");
    }

//  stop()      Detiene el reloj
    stop() {
        this.pause();
        this.minutes = this.initialMinutes;
        this.seconds = this.initialSeconds;
        console.log("🔄 Reloj reiniciado");
        this.updateDisplay();
    }

//  run()       Empieza a contar el tiempo    
    run() {
        if (this.minutes === 0 && this.seconds === 0) {            
            this.stop();
            return;
        }
        if (this.seconds === 0) {
            this.seconds = 59;
            if (this.minutes > 0) {
                this.minutes--;
            }
        } else {
            this.seconds--;
        }
        console.log(this.getTime());
    }

//  Devuelve una cadena con el formato minutos:segundos    
    getTime() {
        return `${String(this.minutes).padStart(2, "0")}:${String(this.seconds).padStart(2, "0")}`;
    }

// Actualiza el display (DOM)    
    updateDisplay() {        
        if (mins && secs) {
            mins.innerText = String(this.minutes).padStart(2, "0");
            secs.innerText = String(this.seconds).padStart(2, "0");
        }
    }
}

export const pomodoroClock = new Clock(25,0,1000);        
