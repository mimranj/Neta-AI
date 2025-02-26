import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { COLORS, images } from "@/constants";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';


export default function Index() {
  return (
    // <ScrollView>
    <View style={styles.container}>
      <Image source={images.logo} resizeMode="contain" style={styles.logo} />
      <ScrollView >
        {/* Card container */}
        <View style={styles.card}>

          {/* Key Features */}
          <Text style={styles.header}>Key Features</Text>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletSymbol}>✓</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>NEC Code Expert</Text> – Get instant NEC code summaries and compliance guidance.
            </Text>
          </View>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletSymbol}>✓</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Inspection Assistant</Text> – Upload images to verify NEC compliance and avoid re-inspection delays.
            </Text>
          </View>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletSymbol}>✓</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Troubleshooting Help</Text> – Describe issues or upload images for step-by-step repair guidance.
            </Text>
          </View>

          {/* How to Use */}
          <Text style={styles.header}>How to Use</Text>
          <Text style={styles.howToUse}>
            <Text style={styles.blueText}><Ionicons name="square" size={8} color="blue" /> Ask</Text> – Type your NEC question or upload an image.
          </Text>
          <Text style={styles.howToUse}>
            <Text style={styles.blueText}><Ionicons name="square" size={8} color="blue" /> Get Answers</Text> – Receive quick, accurate compliance guidance.
          </Text>
          <Text style={styles.howToUse}>
            <Text style={styles.blueText}><Ionicons name="square" size={8} color="blue" /> Fix & Verify</Text> – Use expert recommendations to correct electrical work.
          </Text>

          {/* Benefits */}
          <Text style={styles.header}>Benefits</Text>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletSymbolCheck}>✓ </Text>
            <Text style={styles.bulletText}>
              Ensure your work meets NEC standards effortlessly.
            </Text>
          </View>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletSymbolCheck}>✓ </Text>
            <Text style={styles.bulletText}>
              Avoid inspection failures and costly rework.
            </Text>
          </View>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletSymbolCheck}>✓ </Text>
            <Text style={styles.bulletText}>
              Save time with instant expert guidance.
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => router.replace("/login")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
    // </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 6,
    backgroundColor: "#fff",
  },
  card: {
    // backgroundColor: '#fff', // White background for the card
    borderRadius: 18,
    borderWidth: 2,
    borderLeftColor: "gray",
    borderTopColor: "gray",
    borderRightColor: COLORS.primary,
    borderBottomColor: COLORS.primary,
    paddingHorizontal: 8,
    borderEndEndRadius: 0,
    borderTopLeftRadius: 0,
    paddingBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    // marginBottom: 4,
    marginTop: 16,
    color: COLORS.primary,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletSymbol: {
    width: 18,
    height: 18,
    backgroundColor:"green",
    marginRight: 8,
    borderRadius: 2,
    fontSize: 16,
    color: 'white',
    paddingLeft: 2,
    lineHeight: 20,
  },
  bulletSymbolCheck: {
    fontWeight: 'bold',
    color: 'purple',
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
  },
  howToUse: {
    // marginBottom: 4,
    fontSize: 14,
    // color: 'black',
    lineHeight: 20,
  },
  blueText: {
    // color: '#0066CC',
    fontWeight: 'bold',
    lineHeight: 22,
  },
  logo: {
    width: "60%",
    height: 100,
    marginTop: -22,
    padding: 70,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 8,
    marginBottom: 10,
  },
});

