import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { COLORS, images } from "@/constants";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

// const data = [
//   {
//     title: "NEC Electrical Code Expert",
//     usage: [
//       "✓ Type your NEC question or upload a job image.",
//       "✓ Receive NEC code summaries with compliance guidance.",
//     ],
//     benefits: [
//       "✓ Ensures your work meets NEC standards effortlessly.",
//       "✓ Enhances job safety and accuracy."
//     ]
//   },
//   {
//     title: "Inspection & Compliance Assistance",
//     usage: [
//       "✓ Upload images to verify NEC code compliance.",
//       "✓ Expedite inspections directly through the app."
//     ],
//     benefits: [
//       "✓ Ensures your work passes inspections.",
//       "✓ Saves time and money by avoiding re-inspection delays."
//     ]
//   },
//   {
//     title: "Electrical Troubleshooting & Job Assistance",
//     usage: [
//       "✓ Describe your electrical issue or upload a job image/document.",
//       "✓ Receive step-by-step repair guides or recommended NEC code fixes."
//     ],
//     benefits: [
//       "✓ Quickly diagnose and resolve electrical work.",
//       "✓ Reduce errors and rework by following expert troubleshooting advice.",
//     ]
//   },
// ]

// const Card = ({ title, usage, benefits }: any) => (
//   <View style={styles.card}>
//     <Text style={styles.cardTitle}>{title}</Text>

//     <Text style={styles.sectionTitle}>How to use</Text>
//     {usage.map((item: any, index: number) => (
//       <View key={index} style={styles.bulletItem}>
//         <Text style={styles.bulletText}>{item}</Text>
//       </View>
//     ))}

//     <Text style={styles.sectionTitle}>Benefits</Text>
//     {benefits.map((item: any, index: number) => (
//       <View key={index} style={styles.bulletItem}>
//         <Text style={styles.bulletText}>{item}</Text>
//       </View>
//     ))}
//   </View>
// );

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
    marginBottom: 18,
    marginTop: 10,
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
  },
  logo: {
    width: "80%",
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
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8F9FA",
//     alignItems: "center",
//     padding: 20,
//   },
//   logo: {
//     width: 200,
//     height: 100,
//     // marginBottom: 12,
//     marginTop: -22,
//   },
//   area: {
//     flex: 1,
//     backgroundColor: COLORS.primary,
//     // paddingTop: 10,
//     // height:100
//     paddingBottom: -32
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: COLORS.primary,
//     textAlign: "center",
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#333",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     width: "100%",
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: COLORS.primary,
//     marginBottom: 8,
//   },
//   bulletItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   bulletText: {
//     fontSize: 14,
//     color: "#444",
//   },
//   button: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });