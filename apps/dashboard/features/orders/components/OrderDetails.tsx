import { Modal, View, Text } from "react-native";

export default function OrderDetails({
  order,
  visible,
}: any) {
  if (!order) return null;

  return (
    <Modal visible={visible}>
      <View
        style={{
          padding: 24,
        }}
      >
        <Text>
          Order #{order.id}
        </Text>

        <Text>
          Status: {order.status}
        </Text>

        <Text>
          Total: ${order.total}
        </Text>
      </View>
    </Modal>
  );
}