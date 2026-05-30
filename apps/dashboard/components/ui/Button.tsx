import { Pressable, Text } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  disabled,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled
          ? "#475569"
          : "#F97316",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}