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
import { useNavigation, useRouter } from "expo-router";
import apiClient from "@/utils/axios-services";
import CustomCheckbox from "@/components/CustomCheckBox";
import MainButton from "@/components/MainButton";
 import { reducer } from "@/utils/reducers/formReducers";
import Header from "@/components/Header";
import images from "@/constants/images";
import { COLORS, SIZES } from "@/constants";
import Input from "@/components/Input";
import InputField from "@/components/InputField";

type Nav = {
  navigate: (value: string) => void;
};

// const isTestMode = false;

const initialState = {
  inputValues: {
    email: "",
  },
  inputValidities: {
    email: false,
  },
  formIsValid: false,
};

// Forgot password email
const ForgotPasswordEmail = () => {
  const router = useRouter();
  const { navigate } = useNavigation<Nav>();
  
  
  // const { colors, dark } = useTheme();
  const colors = { background: "white" };
  const dark = false;
  
    const [form, setForm] = useState({email:""});
        const [errors, setErrors] = useState<Partial<any>>({ });
  const validateForm = (): boolean => {
    let newErrors: any= {};

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
  }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
  const inputChangedHandler = useCallback(
    ( inputValue: string) => {
      if (Object.keys(errors).length !== 0) {
        setErrors({});
      }
        setForm((prev)=>({...prev,  email: inputValue }))
    },
    [form.email]
  );
 
  const loginHandler = async (email: any) => {
    if (validateForm()) {
    try {
      console.log("------------------------------------------", email);

      const res = await apiClient.post("/auth/otp", { email });
      if (res.status !== 200) {
        throw new Error(res.data.msg);
      }
      router.push({
        pathname: "/checkoutsession" as any,
        params: { plan: JSON.stringify(email) }, // Pass plan as a parameter
      });
    } catch (error: any) {
      Alert.alert("Error", error.response.data.msg);
    }
  }
  };
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Forgot Password" />
        <ScrollView
          style={{ marginVertical: 54 }}
          showsVerticalScrollIndicator={false}
        >
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
            Enter to Your Email
          </Text>
         
          <InputField
                label="Email"
                value={form.email}
                onChangeText={(text) =>inputChangedHandler(text)}
                placeholder="Enter Email Address"
                error={errors?.email}
            />
           
          <MainButton
            title="Reset Password"
            filled
            onPress={() => loginHandler(form.email)}
            style={styles.button}
          />
          <TouchableOpacity onPress={() => navigate("login")}>
            <Text style={styles.forgotPasswordBtnText}>
              Remenber the password?
            </Text>
          </TouchableOpacity>
          <View></View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Text
            style={[
              styles.bottomLeft,
              {
                color: dark ? COLORS.white : COLORS.black,
              },
            ]}
          >
            Don't have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigate("signup")}>
            <Text style={styles.bottomRight}>{"  "}Sign Up</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 24,
    fontFamily: "bold",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: 12,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  socialTitle: {
    fontSize: 19.25,
    fontFamily: "medium",
    color: COLORS.black,
    textAlign: "center",
    marginVertical: 26,
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
  forgotPasswordBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 12,
  },
});

export default ForgotPasswordEmail;
