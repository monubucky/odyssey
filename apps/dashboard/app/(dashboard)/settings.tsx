import { View, Text, Switch } from "react-native";
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function SettingsPage() {
  const [enabled, setEnabled] = useState(true);

  return (
    <DashboardLayout>
      <View style={{ padding: 24 }}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
          }}
        >
          Settings
        </Text>

        <View
          style={{
            marginTop: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Text style={{ color: "white" }}>
            Accept Orders
          </Text>

          <Switch
            value={enabled}
            onValueChange={setEnabled}
          />
        </View>
      </View>
    </DashboardLayout>
  );
}