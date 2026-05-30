import { View } from "react-native";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#0F1115",
      }}
    >
      <Sidebar />

      <View style={{ flex: 1 }}>
        <Topbar />

        <View style={{ flex: 1 }}>
          {children}
        </View>
      </View>
    </View>
  );
}