import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Switch, Button } from "react-native";

export default function Settings() {
  const [prepTime, setPrepTime] = useState("");
  const [autoAccept, setAutoAccept] = useState(false);
  const [acceptingOrders, setAcceptingOrders] = useState(false);
  const [openingHours, setOpeningHours] = useState("");

  const fetchSettings = () => {
    fetch("http://localhost:8787/settings")
      .then((r) => r.json())
      .then((data) => {
        setPrepTime(String(data.prepTime));
        setAutoAccept(data.autoAccept);
        setAcceptingOrders(data.acceptingOrders);
        setOpeningHours(data.openingHours);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const saveSettings = async () => {
    await fetch("http://localhost:8787/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prepTime: Number(prepTime),
        autoAccept,
        acceptingOrders,
        openingHours,
      }),
    });
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#0F1115" }}>
      <Text style={{ color: "white", marginBottom: 8 }}>
        Prep Time
      </Text>
      <TextInput
        value={prepTime}
        onChangeText={setPrepTime}
        keyboardType="numeric"
        style={{ color: "white", marginBottom: 12 }}
      />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "white", marginRight: 10 }}>
          Auto Accept
        </Text>
        <Switch value={autoAccept} onValueChange={setAutoAccept} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "white", marginRight: 10 }}>
          Accepting Orders
        </Text>
        <Switch
          value={acceptingOrders}
          onValueChange={setAcceptingOrders}
        />
      </View>

      <Text style={{ color: "white", marginTop: 12 }}>
        Opening Hours
      </Text>
      <TextInput
        value={openingHours}
        onChangeText={setOpeningHours}
        style={{ color: "white", marginBottom: 12 }}
      />

      <Button title="Save Settings" onPress={saveSettings} />
    </View>
  );
}