import { View, Text } from "react-native";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function CRMPage() {
  return (
    <DashboardLayout>
      <View style={{ padding: 24 }}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
          }}
        >
          CRM
        </Text>

        <Text
          style={{
            color: "#94A3B8",
            marginTop: 16,
          }}
        >
          Customer list and order history.
        </Text>
      </View>
    </DashboardLayout>
  );
}