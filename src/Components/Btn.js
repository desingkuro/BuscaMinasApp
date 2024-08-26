import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Btn = ({ text, styleBtn, callback }) => {
  const [bg,setBg] = useState('bg-blue-500');
  return (
    <Pressable
      className={`w-40 py-2 px-3 rounded-lg items-center justify-center mb-4 ${styleBtn}`} // Combine base and additional styles
      onPress={callback}
    >
      <Text className="text-white font-bold text-2xl">{text}</Text>
    </Pressable>
  );
};

export default Btn;
