import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <StripeProvider publishableKey="pk_test_51PzeKD2KMMDRlcPBpqnta19uV67lAWN2tlCGf1CD2pKbjOwOtKgxkTbTQSon47tS8kIv6glxhgf9UQHbUCCeaBVF00YtvZ2Myy">
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="forgetpasswordOption" options={{ headerShown: false }} />
        <Stack.Screen name="forgotpasswordphonenumber" options={{ headerShown: false }} />
        <Stack.Screen name="forgotpasswordemail" options={{ headerShown: false }} />
        <Stack.Screen name="electricalAssitant" options={{ headerShown: false }} />
        <Stack.Screen name="chats" options={{ headerShown: false }} />
        <Stack.Screen name="chatdetail" options={{ headerShown: false }} />
        <Stack.Screen name="subscription" options={{ headerShown: false }} />
        <Stack.Screen name="selectedPackageScreen" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="editprofile" options={{ headerShown: false }} />


      </Stack>
    </StripeProvider>
  );
}
