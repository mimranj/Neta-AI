import React, { useCallback, useState } from "react";
import { Platform } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import InputField from "@/components/InputField";
import apiClient from "@/utils/axios-services";
import MainButton from "@/components/MainButton";
import CustomCheckbox from "@/components/CustomCheckBox";
import { useRouter } from "expo-router";
import { images } from "@/constants";

const PlaceholderImage = require("@/assets/images/adaptive-icon copy.png");

const LoginScreen = () => {
  type Nav = {
    navigate: (value: string) => void;
  };
  const { navigate } = useNavigation<Nav>();
  const [form, setForm] = useState({ email: "neta-admin1@gmail.com", password: "admin123" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<any>>({});
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const validateForm = (): boolean => {
    let newErrors: any = {};

    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const inputChangedHandler = useCallback(
    (inputValue: string, key: string) => {
      setForm((prev) => ({ ...prev, [key]: inputValue }));
      if (Object.keys(errors).length !== 0) {
        setErrors({});
      }
    },
    [form]
  );

  const loginHandler = async () => {
    if (!validateForm()) {
      return;
    }
    if (Platform.OS != "web") {
      await SecureStore.deleteItemAsync("token");
    }
    setIsLoading(true);
    if (
      form.email !== "" &&
      form.password !== "" &&
      Object.keys(errors).length === 0
    ) {
      try {
        const user = {
          email: form.email,
          password: form.password,
          rememberMe: isChecked,
        };
        const response = await apiClient.post("/auth/login", user);
        if (response.status !== 200) {
          throw new Error("Login failed");
        }

        const { token } = response.data;
        if (Platform.OS != "web") {
          await SecureStore.setItemAsync("token", token);
        }
        setIsLoading(false);

        console.log("Login successful, token saved.", response.data);
        router.replace("/home");
        // Alert.alert("Logged In Successfully!");
      } catch (error: any) {
        setIsLoading(false);
        Alert.alert("Login failed", "Please try again with correct credentials.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
      <Image
        source={images.logo}
        style={styles.logo}
        resizeMode="contain"
        />
        </View>

      <Text style={styles.title}>Login to Your Account</Text>

      <View style={styles.inputContainer}>
        <InputField
          label="Email"
          value={form.email}
          onChangeText={(text) => inputChangedHandler(text, "email")}
          placeholder="Enter Email Address"
          error={errors?.email}
        />
      </View>

      <View style={styles.inputContainer}>
        <InputField
          label="Password"
          value={form.password}
          secureTextEntry={true}
          onChangeText={(text) => inputChangedHandler(text, "password")}
          placeholder="Enter password"
          error={errors?.password}
        />
      </View>

      <View style={styles.rememberContainer}>
        <CustomCheckbox
          checked={isChecked}
          onChange={setIsChecked}
          label="Remember me"
        />
      </View>

      {/* <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText} onPress={loginHandler}>
          Login
        </Text>
      </TouchableOpacity> */}
      <MainButton
        isLoading={isLoading}
        title="Login"
        filled
        onPress={loginHandler}
        style={styles.loginButton}
      />
      <TouchableOpacity onPress={() => navigate("forgetpasswordOption")}>
        <Text style={styles.forgotPassword}>Forgot the password?</Text>
      </TouchableOpacity>

      {/* <Text style={styles.orText}>or continue with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="red" />
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity onPress={() => navigate("signup")}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  imgContainer:{
    width:"100%",
    marginBottom:20
  },
  logo: {
    width: "auto",
    height: 170,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 8,
  },
  loginButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#2196F3",
    marginBottom: 20,
  },
  orText: {
    marginVertical: 10,
    color: "gray",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    color: "#2196F3",
    fontWeight: "bold",
  },
});

export default LoginScreen;
