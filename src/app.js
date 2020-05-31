import React, { useState, useEffect } from 'react';
import useInterval from 'react-useinterval';
import './app.scss';
import { TetrisBoard } from './components/tetris-board';
import { tiles } from './components/tetris-board/tiles';

const rows = 20;
const columns = 10;

const randomizeTile = () => Math.floor(Math.random() * tiles.length)

const initialState = {
  board: new Array(rows).fill(0).map(() => new Array(columns).fill(0)),
  activeTile: randomizeTile(),
  activeTileX: Math.floor(columns / 2),
  activeTileY: 1,
  tileRotation: 0
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
      tileRotation
    } = state;

    // Remove actual tile from board to test for new insert position
    board[activeTileY + tiles[activeTile].rotations[tileRotation][0].y][activeTileX + tiles[activeTile].rotations[tileRotation][0].x] = 0;
    board[activeTileY + tiles[activeTile].rotations[tileRotation][1].y][activeTileX + tiles[activeTile].rotations[tileRotation][1].x] = 0;
    board[activeTileY + tiles[activeTile].rotations[tileRotation][2].y][activeTileX + tiles[activeTile].rotations[tileRotation][2].x] = 0;
    board[activeTileY + tiles[activeTile].rotations[tileRotation][3].y][activeTileX + tiles[activeTile].rotations[tileRotation][3].x] = 0;
        
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

    // Test if tile should move horizontally
    if (xAdd !== 0) {
      let xAddIsValid = true;

      for (let i = 0; i <= 3; i++) {
        // Test if tile can be moved without getting outside the board
        if (
          activeTileX + xAdd + tiles[activeTile].rotations[tileRotation][i].x >= 0
          && activeTileX + xAdd + tiles[activeTile].rotations[tileRotation][i].x < columns
        ) {
          if (board[activeTileY + tiles[activeTile].rotations[tileRotation][i].y][activeTileX + xAdd + tiles[activeTile].rotations[tileRotation][i].x] !== 0) {
            // Prevent the move
            xAddIsValid = false;
          }
        } else {
          // Prevent the move
          xAddIsValid = false;
        }
      }
      // If horizontal move is valid update x variable (move the tile)
      if (xAddIsValid && xAdd !== 0) {
        activeTileX += xAdd;
      }
    }


    // Test if tile should rotate
    if (rotateAdd !== 0) {
      let rotateIsValid = true
      let newRotate = (tileRotation + rotateAdd >= tiles[activeTile].rotations.length) ? 0 : tileRotation + rotateAdd;

      for (let i = 0; i <= 3; i++) {
        // Test if tile can be rotated without getting outside the board
        if (
          activeTileX + tiles[activeTile].rotations[newRotate][i].x >= 0 &&
          activeTileX + tiles[activeTile].rotations[newRotate][i].x < columns &&
          activeTileY + tiles[activeTile].rotations[newRotate][i].y >= 0 &&
          activeTileY + tiles[activeTile].rotations[newRotate][i].y < rows
        ) {
          // Test of tile rotation is not blocked by other tiles
          if (
            board[activeTileY + tiles[activeTile].rotations[newRotate][i].y][activeTileX + tiles[activeTile].rotations[newRotate][i].x] !== 0
          ) {
            // Prevent rotation
            rotateIsValid = false
          }
        } else {
          // Prevent rotation
          rotateIsValid = false
        }
      }
      // If rotation is valid update rotate variable (rotate the tile)
      if (rotateIsValid) {
        tileRotation = newRotate
      }
    }

    let yAddIsValid = true;

    if (yAdd !== 0) {
      for (let i = 0; i <= 3; i++) {
        // Test if tile can fall faster without getting outside the board
        if (
          activeTileY + yAdd + tiles[activeTile].rotations[tileRotation][i].y >= 0 &&
          activeTileY + yAdd + tiles[activeTile].rotations[tileRotation][i].y < rows
        ) {
          // Test if faster fall is not blocked by other tiles
          if (
            board[activeTileY + yAdd + tiles[activeTile].rotations[tileRotation][i].y][activeTileX + tiles[activeTile].rotations[tileRotation][i].x] !== 0
          ) {
            // Prevent faster fall
            yAddIsValid = false;
          }
        } else {
          // Prevent faster fall
          yAddIsValid = false;
        }
      }
      if (yAddIsValid) {
        activeTileY += yAdd;
      }
    }

    // Render the tile at new position
    board[activeTileY + tiles[activeTile].rotations[tileRotation][0].y][activeTileX + tiles[activeTile].rotations[tileRotation][0].x] = activeTile;
    board[activeTileY + tiles[activeTile].rotations[tileRotation][1].y][activeTileX + tiles[activeTile].rotations[tileRotation][1].x] = activeTile;
    board[activeTileY + tiles[activeTile].rotations[tileRotation][2].y][activeTileX + tiles[activeTile].rotations[tileRotation][2].x] = activeTile;
    board[activeTileY + tiles[activeTile].rotations[tileRotation][3].y][activeTileX + tiles[activeTile].rotations[tileRotation][3].x] = activeTile;

    // If moving down is not possible, remove completed rows, add score
    // find next tile and check if game is over
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
      activeTile = randomizeTile()
      activeTileX = Math.floor(columns / 2)
      activeTileY = 1
      tileRotation = 0

      // Test if game is over - test if new tile can't be placed in board
      if (
        board[activeTileY + tiles[activeTile].rotations[tileRotation][0].y][activeTileX + tiles[activeTile].rotations[tileRotation][0].x] !== 0 ||
        board[activeTileY + tiles[activeTile].rotations[tileRotation][1].y][activeTileX + tiles[activeTile].rotations[tileRotation][1].x] !== 0 ||
        board[activeTileY + tiles[activeTile].rotations[tileRotation][2].y][activeTileX + tiles[activeTile].rotations[tileRotation][2].x] !== 0 ||
        board[activeTileY + tiles[activeTile].rotations[tileRotation][3].y][activeTileX + tiles[activeTile].rotations[tileRotation][3].x] !== 0
      ) {
        // Stop the game
      } else {
        // Otherwise, render new tile and continue
        board[activeTileY + tiles[activeTile].rotations[tileRotation][0].y][activeTileX + tiles[activeTile].rotations[tileRotation][0].x] = activeTile
        board[activeTileY + tiles[activeTile].rotations[tileRotation][1].y][activeTileX + tiles[activeTile].rotations[tileRotation][1].x] = activeTile
        board[activeTileY + tiles[activeTile].rotations[tileRotation][2].y][activeTileX + tiles[activeTile].rotations[tileRotation][2].x] = activeTile
        board[activeTileY + tiles[activeTile].rotations[tileRotation][3].y][activeTileX + tiles[activeTile].rotations[tileRotation][3].x] = activeTile
      }
    }

    setState({
      ...state,
      board,
      activeTileX,
      activeTileY,
      tileRotation,
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
