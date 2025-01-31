import { COLORS } from "@/constants";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NETA AI - Your AI-Powered Electrical Assistant</Text>
      <Text style={styles.subtitle}>Revolutionizing electrical work with advanced AI</Text>

      {/* NEC Electrical Code Expert */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>NEC Electrical Code Expert</Text>
        <View style={styles.bulletItem}>
          <Text style={styles.bulletText}>✓ Real-time code compliance checks</Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bulletText}>✓ Instant NEC reference lookups</Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bulletText}>✓ Document & image analysis</Text>
        </View>
      </View>

      {/* Electrical Work Proposal Assistant */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Electrical Work Proposal Assistant</Text>
        <View style={styles.bulletItem}>
          <Text style={styles.bulletText}>✓ Automated cost estimation</Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bulletText}>✓ Material & labor calculations</Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bulletText}>✓ Branded PDF proposal generation</Text>
        </View>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button}onPress={() => router.replace("/login")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  bulletText: {
    fontSize: 14,
    color: "#444",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});