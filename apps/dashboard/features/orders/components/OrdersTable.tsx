import { View, Text } from "react-native";

const orders = [
  {
    id: "#1001",
    customer: "John Doe",
    total: "$42",
    status: "Pending",
  },
  {
    id: "#1002",
    customer: "Sarah",
    total: "$82",
    status: "Ready",
  },
];

export default function OrdersTable() {
  return (
    <>
      {orders.map((order) => (
        <View
          key={order.id}
          style={{
            backgroundColor: "#171A21",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
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
    </>
  );
}