import React from 'react';
import './board.scss';

const TetrisBoard = ({ board }) => {
  const rows = [];

  board.forEach((row, index) => {
    const columns = row.map((column, index) => <div key={index} className={`column block-${column}`} />);
    rows.push(<div className="tetris-board__row" key={index}>{columns}</div>);
  })

  return (
    <div className="tetris-board">
      <div className="tetris-board__board">
        {rows}
      </div>
    </div>
  )
};

export { TetrisBoard };
