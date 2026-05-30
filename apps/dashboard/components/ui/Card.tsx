import { View } from "react-native";

export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        backgroundColor: "#171A21",
        borderRadius: 16,
        padding: 20,
      }}
    >
      {children}
    </View>
  );
}