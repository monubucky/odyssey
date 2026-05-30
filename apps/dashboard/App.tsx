import { View, Text } from "react-native";
import DashboardLayout from "./components/layout/DashboardLayout";

export default function App() {
  return (
    <DashboardLayout>
      <View style={{ padding: 20 }}>
        <Text>Dashboard Home 🚀</Text>
      </View>
    </DashboardLayout>
  );
}