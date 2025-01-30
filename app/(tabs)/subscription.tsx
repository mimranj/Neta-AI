import SubscriptionCard from "@/components/SubscriptionCard";

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
const SubscriptionScreen = () => {
  const [selected, setSelected] = useState<string>("free");
  const handleSelect = (pkg: string) => {
    setSelected(pkg);
    Alert.alert(`Subscribed Successfully! ${pkg}`);
  };
  return (
    <View style={styles.subscriptionContainer}>
      <Text style={styles.subscriptionTitle}>Choose Your Subscription</Text>
      <TouchableOpacity
        onPress={() => handleSelect("free")} style={[styles.card,selected==="free"&& styles.selectedCard]}>
        <Ionicons name="lock-open" size={24} color="gold" />
        <Text style={styles.cardTitle}>Free Tier</Text>
        <Text style={styles.cardDescription}>
          Limited NEC code lookups and cost estimation.
        </Text>
        <Text style={styles.cardPrice}>Free</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSelect("basicPaid")}
        style={[styles.card,selected==="basicPaid"&& styles.selectedCard]}
      >
        <Ionicons name="document-text" size={24} color="white" />
        <Text style={styles.cardTitle}>Basic Paid Tier</Text>
        <Text style={styles.cardDescription}>
          Enhanced lookups, detailed breakdowns, and document analysis.
        </Text>
        <Text style={styles.cardPrice}>$9.99/month</Text>
        <Text style={styles.cardSelected}>Selected</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSelect("premium")} style={[styles.card,selected==="premium"&& styles.selectedCard ]}>
        <Ionicons name="star" size={24} color="orange" />
        <Text style={styles.cardTitle}>Premium Paid Tier</Text>
        <Text style={styles.cardDescription}>
          Full access to all features, advanced analysis, and branded proposal
          customization
        </Text>
        <Text style={styles.cardPrice}>$19.99/month</Text>
        <Text style={styles.cardSelected}>Premium</Text>
      </TouchableOpacity>
    </View>
 
  );
};

const styles = StyleSheet.create({
  subscriptionContainer: {
    backgroundColor:COLORS.black,
    flex:1,
    padding: 10,
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
    borderWidth: 2,
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
