import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import MenuModal from "../../features/menu/components/MenuModel";

type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
};

export default function Menu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const fetchMenu = () => {
    fetch("http://localhost:8787/menu")
      .then((r) => r.json())
      .then(setMenu)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const openCreate = () => {
    setEditingItem(null);
    setModalVisible(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#0F1115" }}>
      <Button title="Add Item" onPress={openCreate} />

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              marginVertical: 8,
              backgroundColor: "#171A21",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {item.name}
            </Text>

            <Text style={{ color: "#94A3B8" }}>
              Category: {item.category}
            </Text>

            <Text style={{ color: "#94A3B8" }}>
              ${item.price}
            </Text>

            <Text style={{ color: "#94A3B8" }}>
              {item.available ? "Available" : "Unavailable"}
            </Text>

            <Button title="Edit" onPress={() => openEdit(item)} />
          </View>
        )}
      />

      <MenuModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        item={editingItem}
        onRefresh={fetchMenu}
      />
    </View>
  );
}