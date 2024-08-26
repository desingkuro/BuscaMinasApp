import { Text, View } from "react-native";
import createBoard from "../util/createBoard";
import Cell from "./Cell";
import { gameReducer } from "../util/gameReducers";
import react, { useContext, useEffect, useState } from "react";
import { context } from "../context/contextGeneral";
import MyModal from "./MyModal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Btn from "./Btn";

const Board = ({ goBack }) => {
  const { valueActual, setNumCellFlipped } =
    useContext(context);
  const [modalVisible, setModalVisible] = useState(false);
  const [textModal,setTextModal] = useState('Has Perdido');

  const [gameState, dispatch] = react.useReducer(gameReducer, {
    board: createBoard(
      valueActual.width,
      valueActual.height,
      valueActual.bombs
    ),
    isGameOver: false,
    numCellFlip: 0,
    countWind: valueActual.width * valueActual.height,
  });

  function handlePress(row, col) {
    dispatch({ type: "HANDLE_CELL", row, col });
  }

  function returnGame() {
    dispatch({ type: "RETURN_GAME", valueActual: valueActual });
    setModalVisible(false);
  }

  useEffect(() => {
    if (gameState.isGameOver) {
      const timer = setTimeout(() => {
        setModalVisible(true);
      }, 500);
      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta o gameState cambia
    } else {
      setModalVisible(false);
    }
  }, [gameState.isGameOver]);

  useEffect(() => {
    setNumCellFlipped(gameState.numCellFlip);
    if (gameState.numCellFlip === gameState.countWind-valueActual.bombs) {
      setModalVisible(true);
      setTextModal("Felicidades Ganaste");
    }
  }, [gameState.numCellFlip]);
  
  return (
    <View>
      {gameState.board.map((row, indexRow) => (
        <View key={indexRow} className="flex-row">
          {row.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              {...cell}
              handlePress={() => handlePress(indexRow, cellIndex)}
            />
          ))}
        </View>
      ))}

      <MyModal visible={modalVisible}>
        <View
          className="h-full w-full items-center justify-center"
          style={{ backgroundColor: "rgba(1,1,1,0.5)" }}
        >
          <View className="h-80 w-64 items-center justify-center bg-slate-500 rounded-lg">
            <Text className="font-bold text-white text-3xl mb-4 text-center">
              {textModal}
            </Text>
            <Btn
              callback={returnGame}
              text={
                <MaterialIcons name="restart-alt" size={34} color="white" />
              }
              styleBtn={"bg-orange-500"}
            />
            <Btn
              callback={() => {
                setModalVisible(false);
                goBack();
              }}
              text={<MaterialIcons name="home" size={34} color="white" />}
              styleBtn={"bg-blue-500"}
            />
          </View>
        </View>
      </MyModal>
    </View>
  );
};

export default Board;
