import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8787/orders")
      .then((r) => r.json())
      .then(setOrders);
  }, []);

  return (
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
            padding: 16,
            marginBottom: 12,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white" }}>
            {order.customer}
          </Text>

          <Text style={{ color: "#94A3B8" }}>
            {order.status}
          </Text>
        </View>
      ))}
    </View>
  );
}