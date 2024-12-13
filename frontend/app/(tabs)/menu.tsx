import { Button, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const router = useRouter();

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView>
          <View>
            <Button
              title="Register"
              onPress={() => {
                router.push("/auth/Register"); // Navigate to Login screen
              }}
            />{" "}
            <Button
              title="Login"
              onPress={() => {
                router.push("/auth/Login"); // Navigate to Login screen
              }}
            />{" "}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

// const styles = StyleSheet.create({});
