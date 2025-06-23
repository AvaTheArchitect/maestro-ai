// src/modules/practice/PlayerTransport.js
export class PlayerTransport {
  constructor(onTick, bpm = 100) {
    this.bpm = bpm;
    this.interval = null;
    this.onTick = onTick;
  }

  start() {
    const tickRate = 60000 / this.bpm;
    this.interval = setInterval(() => {
      this.onTick(Date.now());
    }, tickRate);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  setBPM(bpm) {
    this.bpm = bpm;
    if (this.interval) {
      this.stop();
      this.start();
    }
  }
}
