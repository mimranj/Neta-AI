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
// import { COLORS, SIZES, icons, images } from '../constants';

// import { reducer } from '../utils/reducers/formReducers';
// import { validateInput } from '../utils/actions/formActions';
// import Input from '../components/Input';
// import Checkbox from 'expo-checkbox';
// import Button from '../components/Button';
// import { useTheme } from '../theme/ThemeProvider';
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import apiClient from "@/utils/axios-services";
import CustomCheckbox from "@/components/CustomCheckBox";
import MainButton from "@/components/MainButton";
import { validateInput } from "@/utils/actions/formActions";
import { reducer } from "@/utils/reducers/formReducers";
import Header from "@/components/Header";
import images from "@/constants/images";
import { COLORS, SIZES } from "@/constants";
import Input from "@/components/Input";
const email = require("../../assets/icons/email.png");

type Nav = {
  navigate: (value: string) => void;
};

const isTestMode = false;

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
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);
  // const { colors, dark } = useTheme();
  const colors = { background: "white" };
  const dark = false;

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error);
    }
  }, [error]);
  const [email, setEmail] = useState("");

  const loginHandler = async (email: any) => {
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
          <Input
            id="email"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities["email"]}
            placeholder="Email"
            placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
            icon={email}
            keyboardType="email-address"
          />
          <View style={styles.checkBoxContainer}>
            <View style={{ flexDirection: "row" }}>
              <CustomCheckbox
                checked={isChecked}
                onChange={setChecked}
                label="Remember me"
              />
            </View>
          </View>
          <MainButton
            title="Reset Password"
            filled
            onPress={() => loginHandler(formState.inputValues)}
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
