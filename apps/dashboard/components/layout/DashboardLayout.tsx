import { View, ScrollView } from "react-native";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#0F1115",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#0F1115",
        }}
      >
        {/* Top Navigation */}
        <Topbar />

        {/* Page Content */}
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            padding: 24,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  );
}