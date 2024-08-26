import { Alert } from "react-native";
import createBoard, { vecinos } from "./createBoard";
import { useContext } from "react";
import { context } from "../context/contextGeneral";

export function gameReducer(state, action) {
  const { type, row, col, valueActual } = action;
  switch (type) {
    case 'HANDLE_CELL': {
      const board = state.board[row][col];
      if (board.isBom) {
        return {
          ...state,
          board: flipAll(state.board),
          isGameOver: true,
        };
      } else if (board.value === 0) {
        // expand
        return {
          ...state,
          board: expand(row, col, state.board),
          numCellFlip:numOfOpenCells(state.board,'COUNT_CELLS',state.numCellFlip)
        };
      } else {
        const count = numOfOpenCells(state.board,'COUNT_CELL',state.numCellFlip);
        return {
          ...state,
          board: flipCell(row, col, state.board),
          numCellFlip:board.isFlipped?state.numCellFlip:count
        };
      }
    }
    case 'RETURN_GAME': {
      return {
        ...state,
        board: createBoard(valueActual.width, valueActual.height, valueActual.bombs),
        isGameOver: false,
        numCellFlip:0
      };
    }
    default: {
      console.log('error, action unknown');
    }
  }
}

function flipCell(row, col, board) {
  const newBoard = board.slice();
  const cell = newBoard[row][col];
  const newCell = {
    ...cell,
    isFlipped: true,
  };
  newBoard[row][col] = newCell;
  return newBoard;
}

function expand(row, col, board) {
  // Copia profunda del tablero
  const newBoard = board.map(row => row.slice());
  const stack = [[row, col]];

  while (stack.length > 0) {
    const [currentRow, currentCol] = stack.pop();
    const neighbors = vecinos(newBoard, currentRow, currentCol);
    newBoard[row][col].isFlipped = true;
    for (const [neighborRow, neighborCol] of neighbors) {
      const cell = newBoard[neighborRow][neighborCol];
      if (cell.isFlipped) continue;
      if (!cell.isBomb) {
        cell.isFlipped = true;
        if (cell.value === 0) {
          stack.push([neighborRow, neighborCol]);
        }
      }
    }
  }
  return newBoard;
}


function flipAll(matriz){
  return matriz.map((row) => row.map((cell) => ({ ...cell, isFlipped: true })));
}

function numOfOpenCells(board,type,value) {
  switch (type) {
    case 'COUNT_CELL':
      return value+1  
    case 'COUNT_CELLS':
      let total = 0;
      const newBoard = [...board]
      for (let row = 0; row < newBoard.length; row++) {
        for (let col = 0; col < newBoard[row].length; col++) {
          if (board[row][col].isFlipped) {
            total++;
          }
        }
      }
      return total;
    default:
        console.log('error mande otra vaina');
      break;
  }
}