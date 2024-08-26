import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

const Cell = ({ row, col, isBom, value, isFlipped, handlePress }) => {
  const [background, setBackground] = useState("bg-gray-800");
  const [colorText, setColorText] = useState("text-white");

  useEffect(() => {
    if (isFlipped) {
      setBackground("bg-gray-600");
    }
    if (isFlipped === false) {
      setBackground("bg-gray-800");
    }
    if (value === 1) {
      setColorText("text-green-600");
    }
    if (value === 2) {
      setColorText("text-orange-300");
    }
    if (value === 3) {
      setColorText("text-yellow-300");
    }
  }, [isFlipped]);

  return (
    <Pressable
      onPress={() => handlePress(row, col)}
      className={`w-6 h-6 items-center justify-center border border-solid border-gray-500 ${background}`}
    >
      <Text className={`font-extrabold ${colorText}`}>
        {isFlipped && (isBom ? "💣" : value)}
      </Text>
    </Pressable>
  );
};

export default Cell;
