import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
const chat = require("../../assets/icons/chat.png");
// const email = require("../assets/icons/email.png");
const ElectricalAssitantScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender:true,id: "1", text: "Hello! How can I assist you?" },
    {sender:false, id: "2", text: "What do you need help with today?" },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: String(messages.length + 1), text: message,sender:false },
      ]);
      setMessage("");
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topbar}>
        <Ionicons
          name="time-outline"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.title}>Electrical Assistant</Text>
        <Image source={chat} style={styles.logo} />
      </View>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={item.sender ? styles.message:styles.receiver}>{item.text}</Text>
          )}
          contentContainerStyle={styles.messageContainer}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Chat with engineer..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.iconButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="mic" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexGrow: 1,
    padding: 10,
  },
  message: {
    backgroundColor: COLORS.primary,
    color: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: "flex-start",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 25,
    margin: 10,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  iconButton: {
    padding: 10,
  },
  receiver:{
    backgroundColor:COLORS.gray,
    color: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: "flex-end",
  }
});

export default ElectricalAssitantScreen;
