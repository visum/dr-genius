import React, { Component } from "react";
import Game from "./Game";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOn: false
    };
  }

  handleStartClick = (event) => {
    this.setState({gameOn:true});
  };

  render() {
    const { gameOn } = this.state;
    return (
      <div>
        {gameOn ? (
          <Game target={100} maxGuess={10} />
        ) : (
          <div>
            We will take turns guessing numbers between 1 and 10. The player who lands on 100 wins.
            <button onClick={this.handleStartClick}>Start!</button>          
          </div>
        )}
      </div>
    );
  }
}
