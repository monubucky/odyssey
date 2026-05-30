import { View, Text } from "react-native";

export default function EmptyState() {
  return (
    <View
      style={{
        alignItems: "center",
        padding: 40,
      }}
    >
      <Text
        style={{
          color: "#94A3B8",
        }}
      >
        No data available
      </Text>
    </View>
  );
}