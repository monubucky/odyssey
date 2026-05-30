import { View } from "react-native";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Sidebar />

      <View style={{ flex: 1 }}>
        <Topbar />
        {children}
      </View>
    </View>
  );
}