import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, illustrations, images } from "../constants";
import Header from "../components/Header";
import { reducer } from "../utils/reducers/formReducers";
// import { validateInput } from '../utils/actions/formActions';
import Input from "../components/Input";
// import Checkbox from 'expo-checkbox';
import Button from "../components/Button";
// import { useTheme } from '../theme/ThemeProvider';
import { useLocalSearchParams, useNavigation } from "expo-router";
import MainButton from "@/components/MainButton";
import InputField from "@/components/InputField";
import apiClient from "@/utils/axios-services";

type Nav = {
  navigate: (value: string) => void;
};

const isTestMode = true;

const initialState = {
  inputValues: {
    newPassword: isTestMode ? "**********" : "",
    confirmNewPassword: isTestMode ? "**********" : "",
  },
  inputValidities: {
    newPassword: false,
    confirmNewPassword: false,
  },
  formIsValid: false,
};

const CreateNewPassword = () => {
  const { email } = useLocalSearchParams();
  console.log("email to be used", email);

  const { navigate } = useNavigation<Nav>();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const { colors, dark } = useTheme();
  const colors = { background: "white" },
    dark = false;
  const [form, setForm] = useState({
    newPassword: "",
    confirmNewPassword: "",
    verification_otp: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<any>>({});
  const inputChangedHandler = useCallback(
    (inputValue: string, inputId: string) => {
      if (Object.keys(errors).length !== 0) {
        setErrors({});
      }
      setForm((prev) => ({ ...prev, [inputId]: inputValue }));
    },
    []
  );
  const validateForm = () => {
    const newErrors: any = {};
    if (form.newPassword !== form.confirmNewPassword) {
      newErrors.newPassword = "Passwords do not match";
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    // Validate OTP is exactly 4 digits
    if (!/^[0-9]{4}$/.test(form.verification_otp)) {
      newErrors.verification_otp = "OTP must be exactly 4 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error);
    }
  }, [error]);
  const handleCreatePassword = async() => {
    if (validateForm()) {
      try {
        setLoading(true);
        const res = await apiClient.post("auth/reset-password", {
          email: JSON.parse(email),
          otp: form.verification_otp,
          password: form.newPassword,
        });
        console.log("forget password request response", res);

        if (res.status !== 200) {
          throw new Error(res.data.msg);
        }
        setModalVisible(true);

        // router.push({
        //   pathname: "/createNewPassword" as any,
        //   params: { email: JSON.stringify(email) }, // Pass plan as a parameter
        // });
      } catch (error: any) {
        Alert.alert("Error", error.response.data.msg);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Form Invalid", "Please fill all fields correctly");
    }
  };

  // Render modal
  const renderModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={[styles.modalContainer]}>
            <View
              style={[
                styles.modalSubContainer,
                {
                  backgroundColor: dark ? COLORS.dark2 : COLORS.secondaryWhite,
                },
              ]}
            >
              <Image
                source={images.logo}
                resizeMode="contain"
                style={styles.modalIllustration}
              />
              <Text style={styles.modalTitle}>Congratulations!</Text>
              <Text
                style={[
                  styles.modalSubtitle,
                  {
                    color: dark ? COLORS.greyscale300 : COLORS.greyscale600,
                  },
                ]}
              >
                Your account is ready to use. You will be redirected to the Home
                page in a few seconds..
              </Text>

              <MainButton
                title="Continue"
                filled
                onPress={() => {
                  setModalVisible(false);
                  navigate("login");
                }}
                style={styles.modalButton}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Create New Password" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={
                dark
                  ? illustrations.passwordSuccessDark
                  : illustrations.newPassword
              }
              resizeMode="contain"
              style={styles.success}
            />
          </View>
          <Text>
            Please Enter the OTP that we sent to{" "}
            <Text
              style={[
                {
                  fontWeight: "bold",
                },
              ]}
            >
              {JSON.parse(email)}
            </Text>
          </Text>

          <InputField
            label=""
            style={styles.inputField}
            value={form.verification_otp}
            onChangeText={(text) =>
              inputChangedHandler(text, "verification_otp")
            }
            maxLength={4}
            placeholder="Enter OTP"
            error={errors?.verification_otp}
          />
          <View style={styles.line}></View>
          {/* 
          <Text
            style={[
              styles.title,
              {
                color: dark ? COLORS.white : COLORS.black,
              },
            ]}
          >
            Create Your New Password
          </Text> */}

          <InputField
            label="New Password"
            value={form.newPassword}
            onChangeText={(text) => inputChangedHandler(text, "newPassword")}
            placeholder="Enter New Password"
            error={errors?.newPassword}
          />

          <InputField
            label="Confirm New Password"
            value={form.confirmNewPassword}
            onChangeText={(text) =>
              inputChangedHandler(text, "confirmNewPassword")
            }
            placeholder="Confirm new password"
            error={errors?.confirmNewPassword}
          />

          <View></View>
        </ScrollView>

        <MainButton
          title="Continue"
          isLoading={loading}

          filled
          onPress={handleCreatePassword}
          style={styles.button}
        />
        {renderModal()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  line: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 30,
  },
  inputField: {
    alignSelf: "center",
    width: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },

  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  success: {
    width: SIZES.width * 0.8,
    height: 250,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 52,
  },
  title: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.black,
    marginVertical: 12,
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
  modalButton: {
    marginVertical: 6,
    width: SIZES.width - 64,
    borderRadius: 30,
  },
  forgotPasswordBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 12,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: "regular",
    color: COLORS.greyscale600,
    textAlign: "center",
    marginVertical: 12,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalSubContainer: {
    height: 494,
    width: SIZES.width * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalIllustration: {
    height: 180,
    width: 180,
    marginVertical: 22,
  },
});

export default CreateNewPassword;
