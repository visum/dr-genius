function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

export default class Genius {
  constructor(target, maxGuess) {
    this.target = target;
    this.seriesWidth = maxGuess + 1;
    this.currentTotal = 0;
    this.series = [];
    this.observers = [];
    this.state = {
      target: target,
      maxGuess: maxGuess,
      turn: "genius",
      total: 0,
      message: ""
    };
    this.buildSeries();
  }

  taunt(message, time) {
    this.state.message = message;
    this.notify();
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }

  buildSeries() {
    let pen = 0;
    const width = this.seriesWidth;
    while (pen < this.target) {
      pen += width;
      this.series.push(pen);
    }
  }

  opponentGuess(guess) {
    this.state.turn = "none";
    this.taunt(`You guessed ${guess}.`, 2000).then(() => {
      this.state.total += guess;  
      if (this.state.total >= this.state.target) {
        this.state.message = "I won!";
        this.state.turn = "end";
        this.notify();
      } else {
        this.state.turn = "genius";
        this.geniusGuess();
      }
    });
  }

  geniusGuess(staticGuess) {
    let guess = 0;
    if (typeof staticGuess === "number") {
      guess = staticGuess;
    } else {
      const { total } = this.state;
      // what's the next number in the series?
      let nextInSeries = 0;
      for (let i = 0; i < this.series.length; i++) {
        const seriesEntry = this.series[i];
        if (seriesEntry > total) {
          nextInSeries = seriesEntry;
          break;
        }
      }
      guess = nextInSeries - total;
    }
    this.turn = "none";
    this.taunt("I will guess...", 1000).then(() => {
      this.taunt("I will guess... " + guess + ".", 1000).then(() => {
        this.state.message = "";
        this.state.total += guess;
        this.state.turn = "player";
        this.notify();
      });
    });
  }

  addListener(callback) {
    this.observers.push(callback);
  }

  notify() {
    this.observers.forEach(observer => {
      observer();
    });
  }

  getState() {
    return this.state;
  }

  start() {
    this.geniusGuess(getRandomIntInclusive(0, this.state.maxGuess));
  }
}
