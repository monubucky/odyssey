import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

type Customer = {
  id: string;
  name: string;
  orderCount: number;
  spend: number;
  recentOrders: string[];
};

export default function CRM() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch("http://localhost:8787/customers")
      .then((r) => r.json())
      .then(setCustomers)
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#0F1115" }}>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={({ item: customer }) => (
          <View
            style={{
              padding: 12,
              marginBottom: 12,
              backgroundColor: "#171A21",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {customer.name}
            </Text>

            <Text style={{ color: "#94A3B8" }}>
              Orders: {customer.orderCount}
            </Text>

            <Text style={{ color: "#94A3B8" }}>
              Spend: ${customer.spend}
            </Text>

            <Text style={{ color: "#94A3B8", marginTop: 6 }}>
              Recent Orders: {customer.recentOrders?.join(", ")}
            </Text>
          </View>
        )}
      />
    </View>
  );
}