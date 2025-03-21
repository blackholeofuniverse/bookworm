import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
      <Link href={"/(auth)"}>Go to login</Link>
      <Link href={"/(auth)/signup"}>Go to sign up</Link>
    </View>
  );
}
