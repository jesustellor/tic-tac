import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
        return (
            <button 
            className='square' 
            onClick={props.onClick}
            >
              {props.value}
            </button>
        );
    }


function Board(props) {

    let renderSquare = (i) => {
        return ( <Square 
                      value={props.box[i]} 
                      onClick={() => {props.onClick(i)}} /> );
    }

        return (
        <div>
            <div className='board-row'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
        );
    }


class Game extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        history: [
          {
            box: [1,2,3,4,5,6,7,8,9]
         }
      ],
      stepNumber: 0,
      xIsNext: true,
    };
}

handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.box.slice();
    if (calculateWinner(squares) || squares[i] === 'X' || squares[i] === 'O') {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
        box: squares,
        }
    ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

    render() {
     const history = this.state.history;
     const current = history[this.state.stepNumber];
     const winner = calculateWinner(current.box);

     const moves = history.map((step, index) => {
        const desc = index ?
                      'Goto Move # ' + index :
                      'Goto game start';
        return (
          <li key={index}>
            <button onClick={() => this.jumpTo(index)}>{desc}</button>
          </li>
        );
     });

     let status;
     if (winner) {
        status = 'Winner: ' + winner;
     } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
     }
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                     box={current.box}
                     onClick={i => this.handleClick(i)}
                     />
                </div>
               <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
               </div>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><Game /></React.StrictMode>)


function calculateWinner(box) {
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
      if (box[a] && box[a] === box[b] && box[b] === box[c]) {
        return box[a];
      }
    }
    return null;
  }