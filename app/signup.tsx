// // Signup.js
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
 
import { Image } from "expo-image";
import { useNavigation } from "expo-router";

import apiClient from "@/utils/axios-services";
import Header from "@/components/Header";
import images from "@/constants/images";
import { COLORS, SIZES } from "@/constants";
import MainButton from "@/components/MainButton";
import CustomCheckbox from "@/components/CustomCheckBox";
import InputField from "@/components/InputField";
import { FontAwesome } from "@expo/vector-icons";
 

interface InputValues {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}

 
type Nav = {
  navigate: (value: string) => void;
};

// Signup Screen
const Signup = () => {
  const { navigate } = useNavigation<Nav>();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  // const { colors, dark } = useTheme();
  const colors = { background: "white" };
  const dark = false;
  const [form, setForm] = useState<InputValues>({
    name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<any>>({});
  const validateForm = (): boolean => {
    let newErrors: any = {};

if (!form.password.trim()) {
      newErrors.password = "Password can't be blank.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!form.phone_number.trim()) {
      newErrors.phone_number = "Password can't be blank.";
    } 
  if (form.phone_number.length<7) {
    newErrors.phone_number =form.phone_number.length<7 ?"Phone number could not be less than 7 digits!":"Phone number could not be more than 7 digits!";
  }


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
      if (Object.keys(errors).length !== 0) {
        setErrors({});
      }
      setForm((prev) => ({ ...prev, [key]: inputValue }));
    },
    [form]
  );

  // Signup handler using Firebase Authentication
  const signupHandler = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const user = {
          name: form.name,
          email: form.email,
          phone_number: form.phone_number,
          password: form.password,
          terms_accepted: isChecked,
        };
        const response = await apiClient.post("/auth/register", user);
        if (response.status !== 201) {
          throw new Error("Account creation failed!");
        }
        Alert.alert(
          "success",
           response?.data?.msg
        );
        navigate("login");
      } catch (error:any) {
        setIsLoading(false);
        Alert.alert(
          "Failed",
          error.response.status===400?"User with this email already exists!":"Something went worng!"
        );
        console.error("Error during signup:", error.response.data);
      }
    } else {
      Alert.alert("Invalid form", "Please fill in the form correctly");
    }
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={images.logo}
              contentFit="contain"
              style={styles.logo}
            />
          </View>
          <Text
            style={[
              styles.title,
              {
                color: dark ? COLORS.white : COLORS.black,
              },
            ]}
          >
            Create Your Account
          </Text>
          <InputField
            label="Name"
            value={form.name}
            onChangeText={(text) => inputChangedHandler(text, "name")}
            placeholder="Enter name..."
            error={errors?.name}
          />

          <InputField
            label="Email"
            value={form.email}
            onChangeText={(text) => inputChangedHandler(text, "email")}
            placeholder="Enter Email..."
            error={errors?.email}
          />

          <InputField
            label="Phone Number"
            value={form.phone_number}
            onChangeText={(text) => inputChangedHandler(text, "phone_number")}
            placeholder="Phone Number"
            error={errors?.phone_number}
          />

          <InputField
            label="Password"
            value={form.password}
            onChangeText={(text) => inputChangedHandler(text, "password")}
            placeholder="Enter password"
            error={errors?.password}
            secureTextEntry
          />
          <View style={styles.checkBoxContainer}>
            <View style={{ flexDirection: "row" }}>
              {/* <Checkbox
                style={styles.checkbox}
                value={isChecked}
                color={
                  isChecked ? COLORS.primary : dark ? COLORS.primary : "gray"
                }
                onValueChange={setChecked}
              /> */}
              <CustomCheckbox
                checked={isChecked}
                onChange={setChecked}
                label="By continuing you accept our Privacy Policy"
              />
            </View>
          </View>
          <View style={styles.centered}>
            <MainButton
            isLoading={isLoading}
              title="Sign Up"
              filled
              onPress={signupHandler}
              style={styles.button}
            />
            <View>
              <Text style={styles.orText}>or continue with</Text>

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
              </View>

              <TouchableOpacity onPress={() => navigate("login")}>
                <Text style={styles.signupText}>
                  Alreday have an account?{" "}
                  <Text style={styles.signupLink}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: "bold",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: 16,
  },
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 18,
  },
  checkbox: {
    marginRight: 8,
    height: 16,
    width: 16,
    borderRadius: 4,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  privacy: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.black,
  },
  socialBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 18,
    position: "absolute",
    bottom: 12,
    right: 0,
    left: 0,
  },
  bottomLeft: {
    fontSize: 14,
    fontFamily: "regular",
    color: "black",
  },
  bottomRight: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.primary,
  },
  button: {
    marginVertical: 6,
    width: SIZES.width - 32,
    borderRadius: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  orText: {
    textAlign:"center",
    marginVertical: 10,
    color: "gray",
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    color: "#2196F3",
    fontWeight: "bold",
  },
  centered:{
    justifyContent: "center",
    alignItems: "center",
  }
});

export default Signup;
