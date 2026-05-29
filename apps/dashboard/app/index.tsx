import React from 'react'
import { View, Text } from 'react-native'

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F1115' }}>
      <Text style={{ color: 'white', fontSize: 24 }}>
        Odyssey Dashboard
      </Text>
    </View>
  )
}