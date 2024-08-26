import { View, Text } from "react-native";
import React from "react";
import createCell from "./CreateCell";

const createBoard = (width, height, bombs) => {
  const matriz = [];
  for (let row = 0; row < height; row++) {
    const Row = [];
    for (let col = 0; col < width; col++) {
      Row.push(createCell(row, col));
    }
    matriz.push(Row);
  }
  //console.log(matriz);
  //insertar Bombas
  insertBomb(matriz, bombs);
  incrementNumber(matriz);
  return matriz;
};

export default createBoard;

function insertBomb(matriz, bombs) {
  let bombsToInsert = bombs;
  while (bombsToInsert > 0) {
    let row = Math.floor(Math.random() * matriz.length);
    let col = Math.floor(Math.random() * matriz[0].length);
    if (!matriz[row][col].isBom) {
      matriz[row][col].isBom = true;
      bombsToInsert--;
    }
  }
}
function incrementNumber(matriz) {
  for (let row = 0; row < matriz.length; row++) {
    for (let col = 0; col < matriz[row].length; col++) {
      if (matriz[row][col].isBom) {
        const vecinosList = vecinos(matriz, row, col);
        for (const [vecinoRow, vecinoCol] of vecinosList) {
          matriz[vecinoRow][vecinoCol].value += 1;
        }
      }
    }
  }
}


export function vecinos(matriz, row, col) {
  const neighbors = [];
  const height = matriz.length;
  if (row < 0 || row >= height || !matriz[row]) return neighbors;

  const width = matriz[row].length;
  const up = row - 1;
  const down = row + 1;
  const left = col - 1;
  const right = col + 1;

  // Cardinal directions
  if (up >= 0) neighbors.push([up, col]); // UP
  if (down < height) neighbors.push([down, col]); // DOWN
  if (right < width) neighbors.push([row, right]); // RIGHT
  if (left >= 0) neighbors.push([row, left]); // LEFT

  // Diagonals
  if (up >= 0 && left >= 0) neighbors.push([up, left]); // UP-LEFT
  if (up >= 0 && right < width) neighbors.push([up, right]); // UP-RIGHT
  if (down < height && right < width) neighbors.push([down, right]); // DOWN-RIGHT
  if (down < height && left >= 0) neighbors.push([down, left]); // DOWN-LEFT

  return neighbors;
}

