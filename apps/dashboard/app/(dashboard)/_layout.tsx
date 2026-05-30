import { Slot } from "expo-router";
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function DashboardRouteLayout() {
  return (
    <DashboardLayout>
      <Slot />
    </DashboardLayout>
  );
}