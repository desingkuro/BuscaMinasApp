import { View, Text } from "react-native";
import React, { createContext, useState } from "react";

export const context = createContext();

const ContextGeneral = ({ children }) => {
  const [valueActual, setValue] = useState(null);
  const [numCellFlipped, setNumCellFlipped] = useState(0);


  const difficulties = {
    easy: { width: 8, height: 8, bombs: 10 },
    medium: { width: 12, height: 12, bombs: 30 },
    hard: { width: 15, height: 15, bombs: 40 },
  };

  function goToPage(navigation,page){
    if(page!=""){
      navigation.navigate(page);
    }else{
      navigation.goBack();
    }
  }

  return (
    <context.Provider
      value={{
        difficulties,
        valueActual,
        setValue,
        numCellFlipped,
        setNumCellFlipped,
        goToPage
      }}
    >
      {children}
    </context.Provider>
  );
};

export default ContextGeneral;
