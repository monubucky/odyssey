import { Modal, View } from "react-native";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function MenuModal({
  visible,
  onClose,
}: any) {
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 40,
          backgroundColor: "rgba(0,0,0,.7)",
        }}
      >
        <View
          style={{
            backgroundColor: "#171A21",
            padding: 20,
            borderRadius: 16,
          }}
        >
          <Input placeholder="Item Name" />

          <View style={{ height: 12 }} />

          <Input placeholder="Price" />

          <View style={{ height: 20 }} />

          <Button
            title="Save Item"
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
}