import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SubscriptionCard = ({ title, price, benefits, isPopular }: any) => {
  return (
    <View style={[styles.card, isPopular && styles.popularCard]}>
      {isPopular && <Text style={styles.popularBadge}>Popular</Text>}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price} /month</Text>
      <View style={styles.divider} />

      {benefits.map((benefit:any, index:number) => (
        <Text key={index} style={styles.benefit}>✓ {benefit}</Text>
      ))}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Go Premium</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5f5fa",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  popularCard: {
    backgroundColor: "#6558f5",
  },
  popularBadge: {
    backgroundColor: "#fbc02d",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: "bold",
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginVertical: 5,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  benefit: {
    fontSize: 14,
    color: "#444",
    marginVertical: 3,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4b49ac",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SubscriptionCard;
