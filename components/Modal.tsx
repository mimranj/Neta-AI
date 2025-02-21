import { COLORS } from "@/constants";
import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const WelcomeModal = ({ visible, onClose }: any) => {
  return (
    <Modal animationType="fade" transparent={false} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          {/* 🎉 Celebration Emoji */}
          <Text style={styles.emoji}>🎉</Text>

          {/* Title */}
          <Text style={styles.title}>Congratulations!</Text>

          {/* Message */}
          <Text style={styles.message}>
            You have received a <Text style={styles.highlight}>Pro Subscription</Text> for
            <Text style={styles.highlight}> one month free! </Text>🚀
          </Text>

          {/* 🎊 Close Button */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Enjoy! 🚀</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)", // Dark overlay
  },
  modalView: {
    width: "85%",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "#fff", // White background
    borderWidth: 2,
    borderColor: "#FFD700", // Gold border
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
    lineHeight: 22,
  },
  highlight: {
    fontWeight: "bold",
    color: COLORS.primary, // Orange color for highlighting
  },
  button: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFD700", // Gold button
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});

export default WelcomeModal;
