import { TextInput } from "react-native";

export default function Input(props: any) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#94A3B8"
      style={{
        backgroundColor: "#1F2430",
        color: "white",
        padding: 12,
        borderRadius: 12,
      }}
    />
  );
}