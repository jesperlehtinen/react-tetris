import React, { useState, useEffect } from 'react';
import useInterval from 'react-useinterval';
import './app.scss';
import { TetrisBoard } from './components/tetris-board';
import { tiles } from './components/tetris-board/tiles';

const rows = 20;
const columns = 10;

const initialState = {
  board: new Array(rows).fill(0).map(() => new Array(columns).fill(0)),
  activeTileX: Math.floor(columns / 2),
  activeTileY: 1,
  activeTile: 2,
  tileRotate: 0
}

const App = () => {
  const [state, setState] = useState(initialState);

  useInterval(() => {
    updateBoard('down')
  }, 1000);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  });

  const handleKeyPress = e => {
    debugger;
    switch (e.keyCode) {
      case 37:
        updateBoard('left');
        break;
      case 39:
        updateBoard('right');
        break;
      case 40:
        updateBoard('down');
        break;
      case 32:
        updateBoard('rotate');
        break;
      default: 
        return;
    }
  };

  const updateBoard = command => {
    let {
      board,
      activeTile,
      activeTileX,
      activeTileY,
      tileRotate
    } = state;

    // Prepare variables for additions to x/y coordinates, current active tile and new rotation
    let xAdd = 0;
    let yAdd = 0;
    let rotateAdd = 0;

    switch (command) {
      case 'down':
        yAdd = 1;
        break;
      case 'left':
        xAdd = -1;
        break;
      case 'right':
        xAdd = 1;
        break;
      case 'rotate':
        rotateAdd = 1;
        break;
      default:
        break;
    }

    // Remove actual tile from board to test for new insert position
    board[activeTileY + tiles[activeTile][tileRotate][0][1]][activeTileX + tiles[activeTile][tileRotate][0][0]] = 0;
    board[activeTileY + tiles[activeTile][tileRotate][1][1]][activeTileX + tiles[activeTile][tileRotate][1][0]] = 0;
    board[activeTileY + tiles[activeTile][tileRotate][2][1]][activeTileX + tiles[activeTile][tileRotate][2][0]] = 0;
    board[activeTileY + tiles[activeTile][tileRotate][3][1]][activeTileX + tiles[activeTile][tileRotate][3][0]] = 0;

    // Test if the move can be executed on actual field
    let xAddIsValid = true;

    // Test if tile should move horizontally
    if (xAdd !== 0) {
      for (let i = 0; i <= 3; i++) {
        // Test if tile can be moved without getting outside the board
        if (
          activeTileX + xAdd + tiles[activeTile][tileRotate][i][0] >= 0
          && activeTileX + xAdd + tiles[activeTile][tileRotate][i][0] < columns
        ) {
          if (board[activeTileY + tiles[activeTile][tileRotate][i][1]][activeTileX + xAdd + tiles[activeTile][tileRotate][i][0]] !== 0) {
            // Prevent the move
            xAddIsValid = false;
          }
        } else {
          // Prevent the move
          xAddIsValid = false;
        }
      }
    }

    // If horizontal move is valid update x variable (move the tile)
    if (xAddIsValid) {
      activeTileX += xAdd;
    }

    // Try to rotate the tile
    let newRotate = (tileRotate + rotateAdd > 3) ? 0 : tileRotate + rotateAdd
    let rotateIsValid = true

    // Test if tile should rotate
    if (rotateAdd !== 0) {
      debugger;
      for (let i = 0; i <= 3; i++) {
        // Test if tile can be rotated without getting outside the board
        if (
          activeTileX + tiles[activeTile][newRotate][i][0] >= 0 &&
          activeTileX + tiles[activeTile][newRotate][i][0] < columns &&
          activeTileY + tiles[activeTile][newRotate][i][1] >= 0 &&
          activeTileY + tiles[activeTile][newRotate][i][1] < rows
        ) {
          // Test of tile rotation is not blocked by other tiles
          if (
            board[activeTileY + tiles[activeTile][newRotate][i][1]][
              activeTileX + tiles[activeTile][newRotate][i][0]
            ] !== 0
          ) {
            // Prevent rotation
            rotateIsValid = false
          }
        } else {
          // Prevent rotation
          rotateIsValid = false
        }
      }
    }

    // If rotation is valid update rotate variable (rotate the tile)
    if (rotateIsValid) {
      tileRotate = newRotate
    }

    let yAddIsValid = true

    if (yAdd !== 0) {
      for (let i = 0; i <= 3; i++) {
        // Test if tile can fall faster without getting outside the board
        if (
          activeTileY + yAdd + tiles[activeTile][tileRotate][i][1] >= 0 &&
          activeTileY + yAdd + tiles[activeTile][tileRotate][i][1] < rows
        ) {
          // Test if faster fall is not blocked by other tiles
          if (
            board[activeTileY + yAdd + tiles[activeTile][tileRotate][i][1]][
              activeTileX + tiles[activeTile][tileRotate][i][0]
            ] !== 0
          ) {
            // Prevent faster fall
            yAddIsValid = false;
          }
        } else {
          // Prevent faster fall
          yAddIsValid = false;
        }
      }
    }

    if (yAddIsValid) {
      activeTileY += yAdd;
    }

    // Render the tile at new position
    board[activeTileY + tiles[activeTile][tileRotate][0][1]][activeTileX + tiles[activeTile][tileRotate][0][0]] = activeTile;
    board[activeTileY + tiles[activeTile][tileRotate][1][1]][activeTileX + tiles[activeTile][tileRotate][1][0]] = activeTile;
    board[activeTileY + tiles[activeTile][tileRotate][2][1]][activeTileX + tiles[activeTile][tileRotate][2][0]] = activeTile;
    board[activeTileY + tiles[activeTile][tileRotate][3][1]][activeTileX + tiles[activeTile][tileRotate][3][0]] = activeTile;

    // If moving down is not possible, remove completed rows add score
    // and find next tile and check if game is over
    if (!yAddIsValid) {

      for (let row = rows - 1; row >= 0; row--) {
        let isLineComplete = true

        for (let col = 0; col < columns; col++) {
          if (board[row][col] === 0) {
            isLineComplete = false
          }
        }

        if (isLineComplete) {
          for (let yRowSrc = row; row > 0; row--) {
            for (let col = 0; col < columns; col++) {
              board[row][col] = board[row - 1][col]
            }
          }
          row = rows
        }
      }

      // Create new tile
      activeTile = Math.floor(Math.random() * 7 + 1)
      activeTileX = columns / 2
      activeTileY = 1
      tileRotate = 0

      // Test if game is over - test if new tile can't be placed in board
      if (
        board[activeTileY + tiles[activeTile][tileRotate][0][1]][activeTileX + tiles[activeTile][tileRotate][0][0]] !== 0 ||
        board[activeTileY + tiles[activeTile][tileRotate][1][1]][activeTileX + tiles[activeTile][tileRotate][1][0]] !== 0 ||
        board[activeTileY + tiles[activeTile][tileRotate][2][1]][activeTileX + tiles[activeTile][tileRotate][2][0]] !== 0 ||
        board[activeTileY + tiles[activeTile][tileRotate][3][1]][activeTileX + tiles[activeTile][tileRotate][3][0]] !== 0
      ) {
        // Stop the game
      } else {
        // Otherwise, render new tile and continue
        board[activeTileY + tiles[activeTile][tileRotate][0][1]][activeTileX + tiles[activeTile][tileRotate][0][0]] = activeTile
        board[activeTileY + tiles[activeTile][tileRotate][1][1]][activeTileX + tiles[activeTile][tileRotate][1][0]] = activeTile
        board[activeTileY + tiles[activeTile][tileRotate][2][1]][activeTileX + tiles[activeTile][tileRotate][2][0]] = activeTile
        board[activeTileY + tiles[activeTile][tileRotate][3][1]][activeTileX + tiles[activeTile][tileRotate][3][0]] = activeTile
      }
    }

    setState({
      ...state,
      board,
      activeTileX,
      activeTileY,
      tileRotate,
      activeTile
    });
  };

  return (
    <main className="main">
      <TetrisBoard board={state.board} />
    </main>
  );
}

export default App;
