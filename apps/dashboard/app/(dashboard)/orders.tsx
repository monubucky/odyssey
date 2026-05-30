import DashboardLayout from "../../components/layout/DashboardLayout";
import OrdersFilters from "../../features/orders/components/OrdersFilters";
import OrdersTable from "../../features/orders/components/OrdersTable";
import { View, Text } from "react-native";

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <View
        style={{
          padding: 24,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "700",
            marginBottom: 20,
          }}
        >
          Orders
        </Text>

        <OrdersFilters />

        <OrdersTable />
      </View>
    </DashboardLayout>
  );
}