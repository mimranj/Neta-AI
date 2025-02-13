import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { COLORS, images } from "@/constants";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

const data = [
  {
    title: "NEC Electrical Code Expert",
    usage: [
      "✓ Type your NEC question or upload a job image.",
      "✓ Receive NEC code summaries with compliance guidance.",
    ],
    benefits: [
      "✓ Ensures your work meets NEC standards effortlessly.",
      "✓ Enhances job safety and accuracy."
    ]
  },
  {
    title: "Inspection & Compliance Assistance",
    usage: [
      "✓ Upload images to verify NEC code compliance.",
      "✓ Expedite inspections directly through the app."
    ],
    benefits: [
      "✓ Ensures your work passes inspections.",
      "✓ Saves time and money by avoiding re-inspection delays."
    ]
  },
  {
    title: "Electrical Troubleshooting & Job Assistance",
    usage: [
      "✓ Describe your electrical issue or upload a job image/document.",
      "✓ Receive step-by-step repair guides or recommended NEC code fixes."
    ],
    benefits: [
      "✓ Quickly diagnose and resolve electrical work.",
      "✓ Reduce errors and rework by following expert troubleshooting advice.",
    ]
  },
]

const Card = ({ title, usage, benefits }: any) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>

    <Text style={styles.sectionTitle}>How to use</Text>
    {usage.map((item: any, index: number) => (
      <View key={index} style={styles.bulletItem}>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}

    <Text style={styles.sectionTitle}>Benefits</Text>
    {benefits.map((item: any, index: number) => (
      <View key={index} style={styles.bulletItem}>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
);

export default function Index() {
  return (
      <ScrollView>
        <View style={styles.container}>
          <Image source={images.logo} resizeMode="contain" style={styles.logo} />
          {data.map((item, index) => (
            <Card key={index} {...item} />
          ))}
          <TouchableOpacity style={styles.button} onPress={() => router.replace("/login")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F8F9FA",
    alignItems: "center",
    padding: 12,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: COLORS.primary,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  }, button: {
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
  logo: {
    width: "80%",
    height: 100,
    // marginBottom: 12,
    marginTop: -22,
    padding: 70,
  },
  bulletText: {
    fontSize: 14,
    color: '#333',
  }
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