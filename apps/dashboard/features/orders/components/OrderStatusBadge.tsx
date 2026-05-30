import { Text } from "react-native";

const colors = {
  pending: "#F59E0B",
  accepted: "#3B82F6",
  preparing: "#8B5CF6",
  ready: "#10B981",
  completed: "#10B981",
  cancelled: "#EF4444",
};

export default function OrderStatusBadge({
  status,
}: {
  status: keyof typeof colors;
}) {
  return (
    <Text
      style={{
        backgroundColor: colors[status],
        color: "white",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
      }}
    >
      {status}
    </Text>
  );
}