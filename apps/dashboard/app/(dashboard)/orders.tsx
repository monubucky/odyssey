import { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:8787/orders")
      .then((r) => r.json())
      .then(setOrders);
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.status
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <View>
      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "700",
          marginBottom: 24,
        }}
      >
        Orders
      </Text>

      {/* Filter Input */}
      <TextInput
        placeholder="Filter by status..."
        placeholderTextColor="#94A3B8"
        value={filter}
        onChangeText={setFilter}
        style={{
          backgroundColor: "#171A21",
          color: "white",
          padding: 12,
          borderRadius: 12,
          marginBottom: 20,
        }}
      />

      {/* Orders List */}
      {filteredOrders.map((order) => (
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
            Order #{order.id}
          </Text>

          <Text style={{ color: "#94A3B8" }}>
            Status: {order.status}
          </Text>

          <Text style={{ color: "#10B981" }}>
            ${order.total}
          </Text>
        </View>
      ))}
    </View>
  );
}