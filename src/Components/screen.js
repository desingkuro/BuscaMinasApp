import { View, Text } from 'react-native'
import React from 'react'

const Screen = ({children}) => {
  return (
      <View className="flex-1 w-full h-full items-center justify-center bg-gray-800">
        {children}
      </View>
  )
}

export default Screen