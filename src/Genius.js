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
    this.observers = [];
    this.state = {
      target: target,
      maxGuess: maxGuess,
      turn: "genius",
      total: 0,
      message: "",
      status: "play"
    };
  }

  checkWin() {
    if (this.state.total === 100) {
      this.state.status = "end";
      if (this.state.turn === "genius") {
        this.state.message = "I won!";
      } else {
        this.state.message = "You beat me!";
      }
      this.state.turn = "end";
    }
  }

  endTurn(guess) {
    this.state.total += guess;
    this.checkWin();
    if (this.state.status === "play") {
      if (this.state.turn === "genius") {
        this.state.turn = "player";
      } else {
        this.state.turn = "genius";
        this.geniusGuess(null, guess);
      }
      this.state.message = "";
    }
    this.notify();
  }

  taunt(message, time) {
    this.state.message = message;
    this.notify();
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }

  opponentGuess(guess) {
    this.state.turn = "none";
    this.taunt(`You guessed ${guess}.`, 2000).then(() => {
      this.endTurn(guess);
    });
  }

  geniusGuess(staticGuess, lastOpponentGuess) {
    let guess = 0;
    if (typeof staticGuess === "number") {
      guess = staticGuess;
    } else {
      guess = this.seriesWidth - lastOpponentGuess;
    }
    this.turn = "none";
    this.taunt("I will guess...", 1000).then(() => {
      this.taunt("I will guess... " + guess + ".", 1000).then(() => {
        this.endTurn(guess);
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
    this.geniusGuess(1);
  }
}
