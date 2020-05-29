import React from 'react';
import './app.scss';
import { TetrisBoard } from './components/tetris-board';

const rows = 20;
const columns = 10;

const board = new Array(rows).fill(0).map(() => new Array(columns).fill(0));

const App = () => {
  return (
    <main className="main">
      <TetrisBoard board={board} />
    </main>
  );
}

export default App;
