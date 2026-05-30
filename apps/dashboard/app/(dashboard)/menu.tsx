import { View, Text } from "react-native";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function MenuPage() {
  return (
    <DashboardLayout>
      <View style={{ padding: 24 }}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
          }}
        >
          Menu Management
        </Text>
      </View>
    </DashboardLayout>
  );
}