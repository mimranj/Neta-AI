import SubscriptionCard from "@/components/SubscriptionCard";

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { useNavigation, useRouter } from "expo-router";
import apiClient from "@/utils/axios-services";

const plans = [
  {
    title: "Electrician Free Tier",
    description: [{ label: "Electrical Assistant - 5 Chats a Day", icon: <Ionicons name="chatbubble-outline" size={16} color="white" /> }],
    price: "Free",
    icon: <Ionicons name="lock-closed-outline" size={24} color="white" />,
  },
  {
    title: "Pro Electrician Tier",
    description: [
      { label: "Unlimited Chats", icon: <Ionicons name="chatbubble-outline" size={16} color="white" /> },
      { label: "Unlimited Image/Documents Uploads Analyser", icon: <Ionicons name="image-outline" size={16} color="white" /> }
    ],
    price: "$9.99/month",
    amount: 999, // Amount in cents
    icon: <Ionicons name="flash-outline" size={24} color="white" />
  },
  // {
  //   title: "Master Electrician Tier",
  //   description: ["Unlimited Chats", "Unlimited Image/Documents Uploads", "Logo Creation"],
  //   price: "$19.99/month",
  //   amount: 1999, // Amount in cents
  //   icon: <Ionicons name="star" size={24} color="orange" />
  // },
];
type RootStackParamList = {
  RouteName: { card: { id: number } };
};

const SubscriptionScreen = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("Free Tier");
  const [activePlan, setActivePlan] = useState("Free Tier");
  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await apiClient.get('stripe/subscription');
        if (response.status !== 200) {
          Alert.alert('Error', response.data.message);
          return
        }
        setSelected(response.data.data.name);
        setActivePlan(response.data.data)
      } catch (error: any) {
        console.error('Error fetching plan data:', error.response.data);
      }
    }
    fetchPlanData();
  }, []);
  const colors = { background: "white" }
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <Header title="" />
      <View style={styles.subscriptionContainer}>
        <Text style={styles.subscriptionTitle}>Choose Your Subscription</Text>
        {
          plans.map((plan, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                plan.title !== "Electrician Free Tier" && router.push({
                  pathname: '/selectedPackageScreen',
                  params: { plan: JSON.stringify({ title: plan.title, price: plan.price, amount: plan.amount }) }, // Pass plan as a parameter
                });
              }}
              style={[styles.card, selected === plan.title && styles.selectedCard]}>
              {/* {plan.icon} */}
              <View style={styles.topRow}>
                <View style={styles.iconAndTitle}>
                  {plan.icon}
                  <Text style={styles.cardTitle}>{plan.title}</Text>
                </View>
                <Text style={styles.cardPrice}>{plan.price}</Text>
              </View>
              {/* <Text style={styles.cardDescription}>
                {plan.description.join(", ")}
              </Text> */}
              {
                plan.description.map((item, index) => (
                  <View key={index} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: 5, }}>
                    {item.icon}
                    <Text style={{ fontSize: 14, color: "white", marginLeft: 8 }}>{item.label}</Text>
                  </View>
                ))
              }
              {/* <Text style={styles.cardPrice}>{plan.price}</Text> */}
            </TouchableOpacity>
          ))
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subscriptionContainer: {
    // backgroundColor: COLORS.,
    flex: 1,
    padding: 10,
  },
  area: {
    flex: 1,
    // backgroundColor: COLORS.white,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  iconAndTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 30,
    // alignItems: "center",
  },
  // cardTitle: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   color: "white",
  //   // marginTop: 5,
  // },
  cardDescription: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginVertical: 5,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "lightgreen",
    // backgroundColor: "#0073b7",
  },
  cardSelected: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
});
export default SubscriptionScreen;
