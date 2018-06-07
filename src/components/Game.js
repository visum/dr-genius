import React, { Component } from "react";
import Genius from "../Genius";

const turnMessages = {
  genius: "It's my turn",
  player: "It's your turn",
  end: "Game over!",
  none: ""
};

export default class Game extends Component {
  constructor(props) {
    super(props);
    const { maxGuess, target } = props;
    this.state = {
      target: target,
      maxGuess: maxGuess,
      turn: "genius",
      total: 0,
      message: ""
    };
    this.handlePlayerGuess = this.handlePlayerGuess.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    const { target, maxGuess } = this.state;
    this.genius = new Genius(target, maxGuess);
    this.genius.addListener(this.handleUpdate);
    this.genius.start();
  }

  handleUpdate() {
    this.setState(this.genius.getState());
  }

  handlePlayerGuess(event) {
    const guess = parseInt(this.state.playerInput, 10);
    this.genius.opponentGuess(guess);
  }

  handleInputChange = event => {
    let guess = parseInt(event.target.value, 10);
    const { maxGuess } = this.state;
    if (guess > maxGuess) {
      event.target.value = maxGuess;
      guess = maxGuess;
    }
    this.setState({
      playerInput: guess
    });
  };

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handlePlayerGuess();
    }
  }

  render() {
    const { total, message, target, maxGuess, turn, playerInput } = this.state;
    return (
      <div onKeyPress={this.handleKeyPress} >
        <section>
          Target: {target}, Guess from 1 to {maxGuess};
        </section>
        <section>Current Total: {total}</section>
        <section>{turnMessages[turn]}</section>
        <section>{message}</section>
        {turn === "player" && (
          <section>
            Your guess:{" "}
            <input type="number" onChange={this.handleInputChange} size="3"/>
            <button onClick={this.handlePlayerGuess}>Guess!</button>
          </section>
        )}
      </div>
    );
  }
}
