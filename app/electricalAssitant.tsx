import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import apiClient from "@/utils/axios-services";
import { Image } from "expo-image";
import Markdown, { MarkdownIt } from "react-native-markdown-display";
import * as SecureStore from 'expo-secure-store';

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
  async function getUserDetail() {
    if (!message.trim()) return;
    const userPlan = await SecureStore.getItemAsync('plan');
    if (userPlan) {
      
      const plan = JSON.parse(userPlan);
      console.log(plan, "pppppppppppppppppppppp");
      const currentDate = new Date().toISOString().split('T')[0];
      const lastPromptDate = plan.lastPromptDate.split('T')[0];
      // Check if the last prompt date is different from the current date
      if (lastPromptDate !== currentDate) {
        plan.promptCount = 0;
        plan.lastPromptDate = new Date().toISOString();
        await SecureStore.setItemAsync('user', JSON.stringify(plan));
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


  // Scroll to bottom when messages update
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Function to send text message
  const sendMessage = async () => {
    const plan = await getUserDetail();
    if (plan) {
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
      } catch (error: any) {
        console.log(error.response.data, "-----------------");
      }
    }
  };

  //--------------- upload
  // Function to handle PDF upload
  const uploadPDF = async () => {
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
    return () => {
      storeChatHistory(messagesRef.current);
    };
  }, [navigation]);
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.mainContainer}>
        <View style={styles.topbar}>
          <Ionicons
            name="settings-outline"
            size={24}
            color="white"
            style={styles.icon}
            onPress={() => router.navigate("/profile")}
          />
          <Text style={styles.title}>{pageTitle?.page_title}</Text>
          <Ionicons name="time-outline" size={24} color="white" style={styles.icon} onPress={() => router.navigate("/chats")} />
        </View>

        <FlatList
          ref={flatListRef} // Attach the ref
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={item.sender === "ai" ? styles.responseMessage : styles.userMessage}>
              <Text>
                {/* {item.text.response} */}
                <Markdown
                  markdownit={
                    MarkdownIt({ typographer: true })
                  }
                >
                  {item.text.response}
                </Markdown>
              </Text>
              {/* {item.text.retrieved_hyperlinks && item.text.retrieved_hyperlinks.map((link: any, index: number) => {
                // Improved regex to handle various `<a>` formats
                const match = link.match(/<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/is);

                if (!match) return null; // Skip if format is incorrect

                const [, url, linkText] = match; // Extract URL and text

                return (
                  <TouchableOpacity key={index} onPress={() => Linking.openURL(url)}>
                    <Text style={{ color: "blue", textDecorationLine: "underline" }}>{linkText.trim()}</Text>
                  </TouchableOpacity>
                );
              })} */}
              {/* {item.text.retrieved_images && item.text.retrieved_images.length > 0 && <View style={{ marginTop: 30 }}>
                {
                  item.text.retrieved_images.map((img: any, index: number) => {
                    return (
                      <Image
                        source={{ uri: img.image_url }}
                        resizeMode="contain"
                        alt={img.image_name}
                        style={{ width: "auto", height: 200 }}
                        key={index}
                      />
                    )
                  })
                }
              </View>
              } */}
            </View>
          )}
          contentContainerStyle={styles.messageContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })} // Auto-scroll on new content
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })} // Auto-scroll on layout change
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask something..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.iconButton} onPress={sendMessage}>
            <Ionicons name="send" size={18} color="white" />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.iconButton}> */}
          <TouchableOpacity style={styles.iconButton} onPress={uploadPDF}>
            <Ionicons name="document-attach-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* // </ScrollView> */}
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  area: {
    // flex: 1,
    backgroundColor: COLORS.primary,
    // paddingTop: 10,
    // height:100
    paddingBottom: -32
  },
  mainContainer: { backgroundColor: "#f0f0f0", height: "100%" },
  topbar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.primary, padding: 10 },
  icon: { marginRight: 10 },
  title: { color: "white", fontSize: 18, fontWeight: "bold", },
  messageContainer: { paddingBottom: 20, paddingHorizontal: 10 },
  userMessage: { alignSelf: "flex-end", backgroundColor: COLORS.primary, color: "white", paddingHorizontal: 5, borderRadius: 5, marginVertical: 5, maxWidth: "95%" },
  responseMessage: { alignSelf: "flex-start", backgroundColor: "#ddd", color: "#333", paddingHorizontal: 5, borderRadius: 5, marginVertical: 5, maxWidth: "95%" },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 10, borderRadius: 10, margin: 10 },
  input: { flex: 1, padding: 8, fontSize: 16, color: "#333" },
  iconButton: { marginLeft: 10, backgroundColor: "#4A90E2", padding: 10, borderRadius: 8 },
});

export default ElectricalAssistantScreen;
