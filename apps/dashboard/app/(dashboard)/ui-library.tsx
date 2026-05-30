import { View, Text } from "react-native";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function UILibraryPage() {
  return (
    <DashboardLayout>
      <View style={{ padding: 24 }}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            marginBottom: 20,
          }}
        >
          Design System
        </Text>

        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: "#F97316",
            borderRadius: 16,
          }}
        />

        <Text
          style={{
            color: "white",
            marginTop: 16,
          }}
        >
          Primary Color
        </Text>
      </View>
    </DashboardLayout>
  );
}