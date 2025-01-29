import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity,  StyleSheet, ScrollView } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { COLORS, SIZES } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import illustrations from "@/constants/illustrations";
// import { icons } from "@/constants/icons";
const chat = require("../../assets/icons/chat.png");
const email = require("../../assets/icons/email.png");

import Button from "@/components/Button";
import { Image } from "expo-image";
import MainButton from "@/components/MainButton";
const PlaceholderImage = require("@/assets/images/adaptive-icon copy.png");


const ForgetScreen = () => {
  type Nav = {
    navigate: (value: string) => void
  }
  const {navigate} = useNavigation<Nav>();
  const [selectedMethod, setSelectedMethod] = useState('sms');

  const handleMethodPress = (method: any) => {
      setSelectedMethod(method);
  };
  const dark =false
  return (

   
        <SafeAreaView style={[styles.area
        // , { backgroundColor: colors.background }
        ]}>
            <View style={[styles.container,
              //  { backgroundColor: colors.background }
               ]}>
                <Header title="Forgot Password" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.passwordContainer}>
                        <Image
                            source={dark ? illustrations.passwordDark : illustrations.password}
                            contentFit='contain'
                            style={styles.password}
                        />
                    </View>
                    <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>Select which contact details
                        should we use to reset your password</Text>
                    <TouchableOpacity
                        style={[
                            styles.methodContainer,
                            selectedMethod === 'sms' && { borderColor: COLORS.primary, borderWidth: 2 },
                        ]}
                        onPress={() => handleMethodPress('sms')}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={chat}
                                contentFit='contain'
                                style={styles.icon} />
                        </View>
                        <View>
                            <Text style={styles.methodTitle}>via SMS:</Text>
                            <Text style={[styles.methodSubtitle, {
                                color: dark ? COLORS.white : COLORS.black
                            }]}>+1 111 ******99</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.methodContainer,
                            selectedMethod === 'email' && { borderColor: COLORS.primary, borderWidth: 2 }, // Customize the border color for Email
                        ]}
                        onPress={() => handleMethodPress('email')}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={email}
                                contentFit='contain'
                                style={styles.icon} />
                        </View>
                        <View>
                            <Text style={styles.methodTitle}>via Email:</Text>
                            <Text style={[styles.methodSubtitle, {
                                color: dark ? COLORS.white : COLORS.black
                            }]}>and***ley@yourdomain.com</Text>
                        </View>
                    </TouchableOpacity>
                    <MainButton
                        title="Continue"
                        filled
                        style={styles.button}
                        onPress={() =>
                            navigate(
                                selectedMethod === "sms"
                                    ? 'forgotpasswordphonenumber'
                                    : 'forgotpasswordemail'
                            )
                        }
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
      {/* <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      </View>

       */}

      
  
};

const styles = StyleSheet.create({
  area: {
      flex: 1,
      backgroundColor: COLORS.white
  },
  container: {
      flex: 1,
      backgroundColor: COLORS.white,
      padding: 16
  },
  password: {
      width: 276,
      height: 250
  },
  passwordContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 32
  },
  title: {
      fontSize: 18,
      fontFamily: "medium",
      color: COLORS.greyscale900
  },
  methodContainer: {
      width: SIZES.width - 32,
      height: 112,
      borderRadius: 32,
      borderColor: "gray",
      borderWidth: .3,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 22
  },
  iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.tansparentPrimary,
      marginHorizontal: 16
  },
  icon: {
      width: 32,
      height: 32,
      tintColor: COLORS.primary
  },
  methodTitle: {
      fontSize: 14,
      fontFamily: "medium",
      color: COLORS.greyscale600
  },
  methodSubtitle: {
      fontSize: 16,
      fontFamily: "bold",
      color: COLORS.black,
      marginTop: 12
  },
  button: {
      borderRadius: 32,
      marginVertical: 22
  }
})


export default ForgetScreen;