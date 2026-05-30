import { View, Text } from "react-native";

export default function Topbar() {
  return (
    <View
      style={{
        height: 70,
        backgroundColor: "#171A21",
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        Restaurant Dashboard
      </Text>
    </View>
  );
}