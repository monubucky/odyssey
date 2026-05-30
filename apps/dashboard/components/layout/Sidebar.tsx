import { View, Text, Pressable } from "react-native";
import { router, usePathname } from "expo-router";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      label: "Home",
      route: "/",
    },
    {
      label: "Orders",
      route: "/orders",
    },
    {
      label: "CRM",
      route: "/crm",
    },
    {
      label: "Menu",
      route: "/menu",
    },
    {
      label: "Settings",
      route: "/settings",
    },
    {
      label: "UI Library",
      route: "/ui-library",
    },
  ];

  return (
    <View
      style={{
        width: 240,
        backgroundColor: "#171A21",
        paddingHorizontal: 20,
        paddingVertical: 24,
        borderRightWidth: 1,
        borderRightColor: "#2A3242",
      }}
    >
      {/* Logo */}
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "700",
          marginBottom: 40,
        }}
      >
        Odyssey
      </Text>

      {/* Navigation */}
      {links.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Pressable
            key={link.route}
            onPress={() => router.push(link.route as any)}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 14,
              marginBottom: 8,
              borderRadius: 12,
              backgroundColor: isActive
                ? "#F97316"
                : "transparent",
            }}
          >
            <Text
              style={{
                color: isActive
                  ? "#FFFFFF"
                  : "#94A3B8",
                fontSize: 16,
                fontWeight: isActive ? "600" : "500",
              }}
            >
              {link.label}
            </Text>
          </Pressable>
        );
      })}

      {/* Footer */}
      <View
        style={{
          marginTop: "auto",
          paddingTop: 24,
          borderTopWidth: 1,
          borderTopColor: "#2A3242",
        }}
      >
        <Text
          style={{
            color: "#64748B",
            fontSize: 12,
          }}
        >
          Odyssey Dashboard v1.0
        </Text>
      </View>
    </View>
  );
}