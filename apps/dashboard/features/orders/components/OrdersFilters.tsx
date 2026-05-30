import { View } from "react-native";
import Input from "../../../components/ui/Input";

export default function OrdersFilters() {
  return (
    <View
      style={{
        marginBottom: 20,
      }}
    >
      <Input placeholder="Search orders..." />
    </View>
  );
}