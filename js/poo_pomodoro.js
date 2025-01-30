class clock {
    constructor(minutes = 0, seconds = 0) {
        this.minutes = minutes;
        this.seconds = seconds;
        this.interval = null;
    }

    start() {
        if (this.interval) return;
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
        console.log("⏹ Reloj detenido");
    }

    reset() {
        this.stop();
        this.minutes = 0;
        this.seconds = 0;
        console.log("🔄 Reloj reiniciado");
    }

    tick() {
        if (this.seconds === 0) {
            this.seconds = 59;
            this.minutes--;
        } else {
            this.seconds--;
        }

        console.log(this.getTime()); // Muestra el tiempo actualizado
    }

    getTime() {
        return `${String(this.minutes).padStart(2, "0")}:${String(this.seconds).padStart(2, "0")}`;
    }
}

window.onload = (event) => {
    console.log("page is fully loaded");
    const myClock = new clock(25 , 5);
myClock.start(); // Comienza a contar
setTimeout(() => myClock.stop(), myClock.seconds*1000); // Se detiene después de 5 segundos
};