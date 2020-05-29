import React from 'react';
import styles from './App.module.scss';
import { TetrisBoard } from './components/tetris-board';

const rows = 20;
const columns = 10;

const board = new Array(rows).fill(0).map(() => new Array(columns).fill(0));

const App = () => {

  return (
    <div className={styles.App}>
      <TetrisBoard board={board} />
    </div>
  );
}

export default App;
