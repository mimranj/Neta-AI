import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="forgetpasswordOption" options={{ headerShown: false }} />
      <Stack.Screen name="forgotpasswordphonenumber" options={{ headerShown: false }} />
      <Stack.Screen name="forgotpasswordemail" options={{ headerShown: false }} />
    </Stack>
  );
}
