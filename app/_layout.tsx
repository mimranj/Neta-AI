import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";


export default function RootLayout() {
  return (
 
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="login" />
        <Stack.Screen name="forgetpasswordOption" />
        <Stack.Screen name="forgotpasswordemail" />
      {/* <StatusBar style="light" /> */}
      </Stack>
     
  );
}
