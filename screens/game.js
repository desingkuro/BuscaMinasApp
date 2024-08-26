import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Screen from "../src/Components/screen";
import Board from "../src/Components/Board";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from '@expo/vector-icons/Feather';
import { context } from "../src/context/contextGeneral";

const Game = ({navigation}) => {
  const { valueActual, numCellFlipped,goToPage} = useContext(context);

  //const BOARD_SIZE_WIDTH = 10;
  //const BOARD_SIZE_HEIGTH = 10;
  //const NUM_BOMBS = 22;
  function goBack(){
    goToPage(navigation,'');
  }

  return (
    <Screen>
      <View className="bg-gray-600 h-14 w-64 mb-12 rounded-lg">
        <View className="w-full h-full flex-row">
          <View className="w-1/2 h-full items-center justify-center flex-row">
            <FontAwesome name="flag" size={24} color="white" />
            <Text className="ml-5 mr-5 text-3xl font-bold text-white">
              {valueActual.bombs}
            </Text>
          </View>
          <View className="w-1/2 h-full items-center justify-center flex-row">
            <Feather name="check-square" size={24} color="white" />
            <Text className="ml-5 mr-5 text-3xl font-bold text-white">
              {numCellFlipped}
            </Text>
          </View>
        </View>
      </View>
      <Board goBack={goBack}/>
    </Screen>
  );
};

export default Game;

