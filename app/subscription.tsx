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
    title: "Free Tier",
    description: ["Limited NEC code lookups", "Basic cost estimation"],
    price: "Free",
    icon: <Ionicons name="lock-open" size={24} color="gold" />
  },
  {
    title: "Basic Paid Tier",
    description: ["Enhanced lookups", "Detailed breakdowns", "Document analysis"],
    price: "$9.99/month",
    amount: 999, // Amount in cents
    icon: <Ionicons name="document-text" size={24} color="white" />
  },
  {
    title: "Premium Paid Tier",
    description: ["Full access to all features", "Advanced analysis", "Branded proposal customization"],
    price: "$19.99/month",
    amount: 1999, // Amount in cents
    icon: <Ionicons name="star" size={24} color="orange" />
  },
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
      console.log("========================================");
      
      try {
        const response = await apiClient.get('stripe/subscription');
        if (response.status !== 200) {
          Alert.alert('Error', response.data.message);
          return
        }
        console.log(response.data.data.subscription);
        
        response.data.data.subscription.map((plan: any) => {
          if (plan.status === "active") {
            setSelected(plan.name);
            setActivePlan(plan)
          }
        })
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
                router.push({
                  pathname: '/selectedPackageScreen',
                  params: { plan: JSON.stringify(plan) }, // Pass plan as a parameter
                });
              }}
              style={[styles.card, selected === plan.title && styles.selectedCard]}>
              {plan.icon}
              <Text style={styles.cardTitle}>{plan.title}</Text>
              <Text style={styles.cardDescription}>
                {plan.description.join(", ")}
              </Text>
              <Text style={styles.cardPrice}>{plan.price}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subscriptionContainer: {
    backgroundColor: COLORS.black,
    flex: 1,
    padding: 10,
  },
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#0073b7",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
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
    borderWidth: 4,
    borderColor: "white",
  },
  cardSelected: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
});
export default SubscriptionScreen;
