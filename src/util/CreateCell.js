import { View, Text } from 'react-native'
import React from 'react'

const createCell = (row,col) => {
  return{
    row,
    col,
    isBom:false,
    value:0,
    isFlipped:false
  }
}

export default createCell