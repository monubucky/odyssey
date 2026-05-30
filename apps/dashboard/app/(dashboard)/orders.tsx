import { View, Text } from "react-native";
import DashboardLayout from "../../components/layout/DashboardLayout";

const orders = [
  {
    id: "#1001",
    customer: "John Doe",
    total: "$45",
    status: "Pending",
  },
  {
    id: "#1002",
    customer: "Sarah Smith",
    total: "$89",
    status: "Completed",
  },
];

export default function OrdersPage() {
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
          Orders
        </Text>

        {orders.map((order) => (
          <View
            key={order.id}
            style={{
              backgroundColor: "#171A21",
              padding: 20,
              marginBottom: 12,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "white" }}>
              {order.id}
            </Text>

            <Text style={{ color: "#94A3B8" }}>
              {order.customer}
            </Text>

            <Text style={{ color: "#10B981" }}>
              {order.total}
            </Text>
          </View>
        ))}
      </View>
    </DashboardLayout>
  );
}