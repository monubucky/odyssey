import { View } from 'react-native'

export function Card({ children }: any) {
  return (
    <View
      style={{
        backgroundColor: '#171A21',
        borderRadius: 16,
        padding: 16,
      }}
    >
      {children}
    </View>
  )
}