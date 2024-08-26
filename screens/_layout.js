import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import ContextGeneral from "../src/context/contextGeneral";
const Layout = () => {
  return (
    <ContextGeneral>
      <View className=" flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </ContextGeneral>
  );
};

export default Layout;
