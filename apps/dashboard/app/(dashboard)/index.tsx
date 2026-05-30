import { View } from "react-native";
import KpiCard from "../../components/KpiCard";

export default function HomeScreen() {
  return (
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          padding: 24,
        }}
      >
        <KpiCard
          title="Revenue"
          value="$24,540"
        />

        <KpiCard
          title="Orders"
          value="312"
        />

        <KpiCard
          title="Pending"
          value="14"
        />

        <KpiCard
          title="Customers"
          value="105"
        />
      </View>
  );
}