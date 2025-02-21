import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StripeProvider } from "@stripe/stripe-react-native";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("token");
      setIsAuthenticated(!!token);

      if (token) {
        router.replace("/home"); // Redirect logged-in users to home
      } else {
        router.replace("/login"); // Redirect non-logged-in users to login
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <StripeProvider publishableKey="pk_test_51PzeKD2KMMDRlcPBpqnta19uV67lAWN2tlCGf1CD2pKbjOwOtKgxkTbTQSon47tS8kIv6glxhgf9UQHbUCCeaBVF00YtvZ2Myy">
      {isAuthenticated ? (
        <>
          <Stack screenOptions={{ headerShown: false }}>  {/* Hide all headers */}
            <Stack.Screen name="home" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="editprofile" />
            <Stack.Screen name="subscription" />
            <Stack.Screen name="selectedPackageScreen" />
            <Stack.Screen name="electricalAssitant" />
            <Stack.Screen name="chats" />
            <Stack.Screen name="chatdetail" />
          </Stack>
        </>
      ) : (
        <>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="forgetpasswordOption" />
            <Stack.Screen name="forgotpasswordphonenumber" />
            <Stack.Screen name="forgotpasswordemail" />
            <Stack.Screen name="createNewPassword" />
          </Stack>
        </>
      )}
    </StripeProvider>
  );
}
