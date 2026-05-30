import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  Switch,
} from "react-native";

type MenuItem = {
  id?: string;
  name: string;
  category: string;
  price: string;
  available: boolean;
};

export default function MenuModal({
  visible,
  onClose,
  item,
  onRefresh,
}: any) {
  const [form, setForm] = useState<MenuItem>({
    name: "",
    category: "",
    price: "",
    available: true,
  });

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        category: item.category,
        price: String(item.price),
        available: item.available,
      });
    } else {
      setForm({
        name: "",
        category: "",
        price: "",
        available: true,
      });
    }
  }, [item]);

  const saveItem = async () => {
    const method = item ? "PUT" : "POST";
    const url = item
      ? `http://localhost:8787/menu/${item.id}`
      : "http://localhost:8787/menu";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
      }),
    });

    onRefresh();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, padding: 16, backgroundColor: "#0F1115" }}>
        <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
          {item ? "Edit Item" : "Create Item"}
        </Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#94A3B8"
          value={form.name}
          onChangeText={(t) => setForm({ ...form, name: t })}
          style={{ color: "white", marginBottom: 10 }}
        />

        <TextInput
          placeholder="Category"
          placeholderTextColor="#94A3B8"
          value={form.category}
          onChangeText={(t) => setForm({ ...form, category: t })}
          style={{ color: "white", marginBottom: 10 }}
        />

        <TextInput
          placeholder="Price"
          placeholderTextColor="#94A3B8"
          value={form.price}
          keyboardType="numeric"
          onChangeText={(t) => setForm({ ...form, price: t })}
          style={{ color: "white", marginBottom: 10 }}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white", marginRight: 10 }}>
            Available
          </Text>
          <Switch
            value={form.available}
            onValueChange={(v) =>
              setForm({ ...form, available: v })
            }
          />
        </View>

        <Button title="Save" onPress={saveItem} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
}