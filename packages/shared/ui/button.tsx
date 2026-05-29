import React from 'react'
import { Pressable, Text } from 'react-native'

export function Button({ title, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: '#F97316',
        padding: 12,
        borderRadius: 12
      }}
    >
      <Text style={{ color: 'white' }}>{title}</Text>
    </Pressable>
  )
}