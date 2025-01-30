import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
      <Stack.Screen name="forgetpasswordOption" />
      <Stack.Screen name="forgotpasswordemail" />
      <Stack.Screen name="forgotpasswordphonenumber" />
     
    </Stack>
  );
}
