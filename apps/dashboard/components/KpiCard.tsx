import { View, Text } from "react-native";

export default function KpiCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#171A21",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <Text style={{ color: "#94A3B8" }}>
        {title}
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "700",
          marginTop: 12,
        }}
      >
        {value}
      </Text>
    </View>
  );
}