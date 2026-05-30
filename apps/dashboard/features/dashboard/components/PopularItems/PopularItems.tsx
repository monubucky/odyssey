import { View, Text } from "react-native";

export default function PopularItems({
  items,
}: {
  items: any[];
}) {
  return (
    <View
      style={{
        backgroundColor: "#171A21",
        padding: 20,
        borderRadius: 16,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          marginBottom: 16,
        }}
      >
        Popular Items
      </Text>

      {items.map((item) => (
        <Text
          key={item.item}
          style={{
            color: "#94A3B8",
            marginBottom: 8,
          }}
        >
          {item.item} ({item.sold})
        </Text>
      ))}
    </View>
  );
}