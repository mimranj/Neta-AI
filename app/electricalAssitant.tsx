import React, { useState, useRef, useEffect } from "react";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView, Platform, Keyboard,
} from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import axios from "axios";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiClient from "@/utils/axios-services";
import Markdown, { MarkdownIt } from "react-native-markdown-display";
import * as SecureStore from 'expo-secure-store';
import TypingAnimation from "@/components/ChatAnimation";

type Message = {
  id: string;
  text: any;
  sender: "user" | "ai"; // false = user, true = AI
};

const ElectricalAssistantScreen: React.FC = () => {
  const messagesRef = useRef<Message[]>([]);

  const { title } = useLocalSearchParams();
  const pageTitle = title ? JSON.parse(title as string) : "";
  const navigation = useNavigation();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null); // Ref for FlatList
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  async function getUserDetail() {
    const userPlan = await SecureStore.getItemAsync('plan');
    if (userPlan) {
      const plan = JSON.parse(userPlan);
      const currentDate = new Date().toISOString().split('T')[0];
      const lastPromptDate = plan.lastPromptDate.split('T')[0];
      // Check if the last prompt date is different from the current date
      if (lastPromptDate !== currentDate) {
        plan.promptCount = 0;
        plan.lastPromptDate = new Date().toISOString();
        await SecureStore.setItemAsync('plan', JSON.stringify(plan));
      }
      if (plan.name === 'Electrician Free Tier' && plan.promptCount >= 5) {
        Alert.alert(
          'Limit Exceeded',
          'You are using the free tier plan and have already submitted 5 prompts. You can submit more prompts tomorrow or buy the premium plan to continue unlimited daily prompts.'
        );
        return;
      }
      return plan;
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await apiClient.get('/stripe/subscription');
      if (response.status != 200) {
        throw new Error('User not found.');
      }
      response.data.data.promptCount = 0
      response.data.data.lastPromptDate = new Date().toISOString();
      if (response.data.data.name === "Electrician Free Tier") {
        const planData: any = await SecureStore.getItemAsync('plan');
        const planDetails = JSON.parse(planData);
        if (!planDetails || planDetails.name !== response.data.data.name) {
          await SecureStore.setItemAsync('plan', JSON.stringify(response.data.data));
        }
      } else {
        await SecureStore.setItemAsync('plan', JSON.stringify(response.data.data));
      }

    } catch (error: any) {
      console.error('Error fetching user data: ', error.response.data);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  )


  // Scroll to bottom when messages update
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const speakText = (text: string) => {
    if (speaking) {
      Speech.stop(); // Stop speech if already speaking
      setSpeaking(false);
    } else {
      Speech.speak(text, {
        language: "en",
        pitch: 1,
        rate: 1,
        onDone: () => setSpeaking(false), // Reset speaking state when done
        onStopped: () => setSpeaking(false),
      });
      setSpeaking(true);
    }
  };


  // Function to send text message
  const sendMessage = async () => {
    if (loading) return;
    if (!message.trim()) return;
    if (speaking) {
      Speech.stop();
      setSpeaking(false);
    }
    const plan = await getUserDetail();
    if (plan) {
      setLoading(true);
      const newMessage: Message = { id: String(messages.length + 1), text: { response: message }, sender: "user" };
      setMessages([...messages, newMessage]);
      setMessage("");
      try {
        const response = await axios.post("https://ai.innovativetech.dev/ask", { question: message });
        if (response.status !== 200) throw new Error("Failed to fetch response");
        plan.name === 'Electrician Free Tier' && await SecureStore.setItemAsync('plan', JSON.stringify({ ...plan, promptCount: plan.promptCount + 1 }));
        setMessages((prev) => [
          ...prev,
          { id: String(prev.length + 1), text: response.data || "I'm sorry, I couldn't generate a response.", sender: 'ai' },
        ]);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log("Error fetching plan at send message:", error.response.data);
      }
    }
  };

  //--------------- upload
  // Function to handle PDF upload
  const uploadPDF = async () => {
    if (speaking) {
      Speech.stop();
      setSpeaking(false);
    }
    const plan = await getUserDetail();
    if (plan) {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled) return;
      const file = result.assets[0];

      const formData = new FormData();
      formData.append("file", { uri: file.uri, name: file.name, type: file.mimeType } as any);
      setMessages([...messages, { id: String(messages.length + 1), text: { response: "File uploading..." }, sender: 'user' }]);
      try {
        const response = await fetch("https://ai.innovativetech.dev/upload", {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (!response.ok) throw new Error("Upload failed");
        plan.name === 'Free Tier' && await SecureStore.setItemAsync('plan', JSON.stringify({ ...plan, promptCount: plan.promptCount + 1 }));
        setMessages([...messages, { id: String(messages.length + 1), text: { response: "File uploaded successfully" }, sender: 'user' }]);
        const data: { response: string } = await response.json();
        setMessages((prev) => [...prev, { id: String(prev.length + 1), text: { response: data.response || "PDF uploaded successfully" }, sender: "ai" }]);
      } catch (error) {
        Alert.alert("Error", "Failed to upload file. Please try again.");
      }
    }
  };

  // Function to store chat history when leaving the screen
  const storeChatHistory = async (messagesArray: Message[]) => {
    // if (messages.length === 0) return; // Don't send empty chats
    if (speaking) {
      Speech.stop();
      setSpeaking(false);
    }
    try {
      await apiClient.put("users/chats", {
        chat: messagesArray,
      });
    } catch (error: any) {
      console.log("Failed to save chat history:", error.response.data);
    }
  };


  useEffect(() => {
    messagesRef.current = messages; // Keep ref updated with latest messages
  }, [messages]);

  useEffect(() => {
    const stopSpeechOnLeave = () => {
      if (speaking) {
        Speech.stop();
        setSpeaking(false);
      }
    };

    // Listen for navigation focus changes
    const unsubscribe = navigation.addListener("blur", stopSpeechOnLeave);

    return () => {
      stopSpeechOnLeave(); // Ensure it stops immediately when unmounting
      if (messagesRef.current.length > 0) {
        storeChatHistory(messagesRef.current);
      }
      unsubscribe();
    };
  }, [navigation, speaking]);
  return (
    <SafeAreaView style={styles.area}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={{ flex: 1 }}
      >
        <View style={styles.mainContainer}>
          {/* Top Bar */}
          <View style={styles.topbar}>
            <Ionicons name="settings-outline" size={24} color="white" style={styles.icon} onPress={() => router.navigate("/profile")} />
            <Text style={styles.title}>{pageTitle?.page_title}</Text>
          {/* <Ionicons name="time-outline" size={24} color="white" style={styles.icon} onPress={() => router.navigate("/chats")} /> */}
          <Ionicons
              name="add-circle-outline"
              size={24}
              color="white"
              style={styles.icon}
              onPress={async () => {
                if (messages.length === 0) {
                  Alert.alert("No Messages", "There is no chat to save.");
                  return;
                }
                try {
                  await storeChatHistory(messages);
                  setMessages([]);
                  Alert.alert("Chat Saved", "Your chat has been stored successfully!");
                } catch (error) {
                  Alert.alert("Error", "Failed to save chat. Please try again.");
                }
              }}
            />
          </View>

          {/* Chat Messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={item.sender === "ai" ? styles.responseMessage : styles.userMessage}>
                <Text>
                  <Markdown markdownit={MarkdownIt({ typographer: true })}>{item.text.response}</Markdown>
                </Text>
                {/* {item.sender === "ai" && item.id === messages[messages.length - 1]?.id && (
                  <TouchableOpacity onPress={() => speakText(item.text.response)} style={styles.speakButton}>
                    <Ionicons name={speaking ? "stop-circle-outline" : "volume-high-outline"} size={20} color="black" />
                  </TouchableOpacity>
                )} */}
              </View>
            )}
            contentContainerStyle={[
              styles.messageContainer,
              { paddingBottom: keyboardVisible ? 100 : 20 }, // Adjust padding when keyboard is visible
            ]}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          {/* Typing Animation */}
          {loading && <View style={{ marginVertical: 8 }}><TypingAnimation /></View>}

          {/* Input Box */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask something..."
              placeholderTextColor="#888"
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.iconButton} onPress={sendMessage}>
              <Ionicons name="send" size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={uploadPDF}>
              <Ionicons name="document-attach-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  area: {
    flex: 1,
    // backgroundColor: COLORS.primary,
    // paddingTop: 10,
    // height:100
    // paddingBottom: -32
  },
  speakButton: {
    marginVertical: 5,
    // backgroundColor: "#4A90E2",
    // padding: 2,
    borderRadius: 5,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  mainContainer: { backgroundColor: "#f9f9f9", height: "100%" },
  topbar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.primary, padding: 10 },
  icon: { marginRight: 10 },
  title: { color: "white", fontSize: 18, fontWeight: "bold", },
  messageContainer: { paddingBottom: 20, paddingHorizontal: 10 },
  userMessage: { alignSelf: "flex-end", backgroundColor: COLORS.primary, color: "white", paddingHorizontal: 5, borderRadius: 5, marginVertical: 5, maxWidth: "95%" },
  responseMessage: { alignSelf: "flex-start", backgroundColor: "#fff", color: "#333", padding: 5, borderRadius: 5, marginVertical: 5, maxWidth: "95%" },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 10, borderRadius: 10, margin: 10, marginBottom: 10 },
  input: { flex: 1, padding: 8, fontSize: 16, color: "#333" },
  iconButton: { marginLeft: 10, backgroundColor: "#4A90E2", padding: 10, borderRadius: 8 },
});

export default ElectricalAssistantScreen;
