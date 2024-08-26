import { StatusBar } from "expo-status-bar";
import ContextGeneral from "./src/context/contextGeneral";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./src/navigation/Stack";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <ContextGeneral>
          <StatusBar style="auto" />
          <Stack />
        </ContextGeneral>
      </NavigationContainer>
    </>
  );
}
