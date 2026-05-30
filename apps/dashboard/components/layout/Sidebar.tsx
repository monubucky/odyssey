import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

function NavItem({ href, label }: { href: string; label: string }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(href)}
      style={({ pressed }) => ({
        paddingVertical: 12,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Text style={{ color: "#94A3B8" }}>{label}</Text>
    </Pressable>
  );
}

export default function Sidebar() {
  return (
    <View
      style={{
        width: 240,
        backgroundColor: "#171A21",
        padding: 24,
        position: "relative",
        zIndex: 10,
        elevation: 10,
      }}
    >
      <Text style={{ color: "white", fontSize: 22 }}>Odyssey</Text>

      <NavItem href="/" label="Home" />
      <NavItem href="/orders" label="Orders" />
      <NavItem href="/crm" label="CRM" />
      <NavItem href="/menu" label="Menu" />
      <NavItem href="/settings" label="Settings" />
      <NavItem href="/ui-library" label="UI Library" />
    </View>
  );
}