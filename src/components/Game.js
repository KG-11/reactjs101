import React from 'react';
import Board from './Board.js';
import MovesControl from './MovesControl.js';

let calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
    this.baseState = this.state;
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(move) {
    if (move === 0) {
      this.setState(this.baseState);
      return;
    }
    this.setState({
      stepNumber: this.state.stepNumber + move,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    console.log(this.state.stepNumber);
    // console.log(this.state.history[this.state.stepNumber].squares);
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const previousDisabled = this.state.stepNumber === 0;
    const nextDisabled = history.length < 2;
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="controls">
            <MovesControl value='<<' onClick={() => this.jumpTo(-1)} disabled={previousDisabled} />
            <MovesControl value='New Game' onClick={() => this.jumpTo(0)} />
            <MovesControl value='>>' onClick={() => this.jumpTo(1)} disabled={nextDisabled} />
          </div>
          <div>{status}</div>
        </div>
      </div>
    );
  }
}


export default Game;
