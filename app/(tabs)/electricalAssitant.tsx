import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
// import * as DocumentPicker from "expo-document-picker";

type Message = {
  id: string;
  text: string;
  sender: boolean; // false = user, true = AI
};

const ElectricalAssistantScreen: React.FC = () => {
  const { title } = useLocalSearchParams();
  const pageTitle = title ? JSON.parse(title as string) : "";

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null); // Ref for FlatList

  // Scroll to bottom when messages update
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Function to send text message
  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage: Message = { id: String(messages.length + 1), text: message, sender: false };
    setMessages([...messages, newMessage]);
    setMessage("");

    try {
      const response = await axios.post("https://ai.innovativetech.dev/ask", { question: message });
      if (response.status !== 200) throw new Error("Failed to fetch response");
      setMessages((prev) => [
        ...prev,
        { id: String(prev.length + 1), text: response.data.response || "I'm sorry, I couldn't generate a response.", sender: true }
      ]);
    } catch (error: any) {
      console.log(error, "-----------------");
    }
  };

  //--------------- upload
  // Function to handle PDF upload
  // const uploadPDF = async () => {
  //   const result = await DocumentPicker.getDocumentAsync({
  //     type: "application/pdf",
  //   });

  //   if (result.canceled) return;
  //   const file = result.assets[0];

  //   const formData = new FormData();
  //   formData.append("file", { uri: file.uri, name: file.name, type: file.mimeType } as any);

  //   setMessages([...messages, { id: String(messages.length + 1), text: "Uploading PDF...", sender: false }]);

  //   try {
  //     const response = await fetch("https://ai.innovativetech.dev/upload", {
  //       method: "POST",
  //       body: formData,
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     if (!response.ok) throw new Error("Upload failed");

  //     const data: { message: string } = await response.json();
  //     setMessages((prev) => [...prev, { id: String(prev.length + 1), text: data.message || "PDF uploaded successfully", sender: true }]);
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to upload file. Please try again.");
  //   }
  // };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topbar}>
        <Ionicons name="time-outline" size={24} color="white" style={styles.icon} />
        <Text style={styles.title}>{pageTitle?.page_title}</Text>
      </View>

      <FlatList
        ref={flatListRef} // Attach the ref
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={item.sender ? styles.responseMessage : styles.userMessage}>{item.text}</Text>
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
        <TouchableOpacity style={styles.iconButton}>
        {/* <TouchableOpacity style={styles.iconButton} onPress={uploadPDF}> */}
          <Ionicons name="document-attach-outline" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#f0f0f0", padding: 10 },
  topbar: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.primary, padding: 15, borderRadius: 10 },
  icon: { marginRight: 10 },
  title: { color: "white", fontSize: 18, fontWeight: "bold", flex: 1 },
  messageContainer: { paddingBottom: 20 },
  userMessage: { alignSelf: "flex-end", backgroundColor: COLORS.primary, color: "white", padding: 10, borderRadius: 8, marginVertical: 5, maxWidth: "85%" },
  responseMessage: { alignSelf: "flex-start", backgroundColor: "#ddd", color: "#333", padding: 10, borderRadius: 8, marginVertical: 5, maxWidth: "85%" },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 10, borderRadius: 10, marginTop: 10 },
  input: { flex: 1, padding: 8, fontSize: 16, color: "#333" },
  iconButton: { marginLeft: 10, backgroundColor: "#4A90E2", padding: 10, borderRadius: 8 },
});

export default ElectricalAssistantScreen;





// const email = require("../assets/icons/email.png");
// const ElectricalAssitantScreen = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([
//     { sender:true,id: "1", text: "Hello! How can I assist you?" },
//     {sender:false, id: "2", text: "What do you need help with today?" },
//   ]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       setMessages([
//         ...messages,
//         { id: String(messages.length + 1), text: message,sender:false },
//       ]);
//       setMessage("");
//     }
//   };
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.topbar}>
//         <Ionicons
//           name="time-outline"
//           size={24}
//           color="white"
//           style={styles.icon}
//         />
//         <Text style={styles.title}>Electrical Assistant</Text>
//         <Image source={chat} style={styles.logo} />
//       </View>
//       <View style={styles.chatContainer}>
//         <FlatList
//           data={messages}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <Text style={item.sender ? styles.message:styles.receiver}>{item.text}</Text>
//           )}
//           contentContainerStyle={styles.messageContainer}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Chat with engineer..."
//           placeholderTextColor="#888"
//           value={message}
//           onChangeText={setMessage}
//         />
//         <TouchableOpacity style={styles.iconButton} onPress={sendMessage}>
//           <Ionicons name="send" size={24} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton}>
//           <Ionicons name="mic" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   messageContainer: {
//     flexGrow: 1,
//     padding: 10,
//   },
//   message: {
//     backgroundColor: COLORS.primary,
//     color: "white",
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//     alignSelf: "flex-start",
//   },
//   mainContainer: {
//     flex: 1,
//     backgroundColor: COLORS.black,
//   },
//   chatContainer: {
//     flex: 1,
//     backgroundColor: COLORS.black,
//   },
//   topbar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.primary,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     justifyContent: "space-between",
//   },
//   icon: {
//     marginRight: 10,
//   },
//   title: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   logo: {
//     width: 30,
//     height: 30,
//     resizeMode: "contain",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.primary,
//     padding: 10,
//     borderRadius: 25,
//     margin: 10,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     padding: 10,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   iconButton: {
//     padding: 10,
//   },
//   receiver:{
//     backgroundColor:COLORS.gray,
//     color: "white",
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//     alignSelf: "flex-end",
//   }
// });

// export default ElectricalAssitantScreen;
