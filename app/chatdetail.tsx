import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import apiClient from "@/utils/axios-services";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Markdown, { MarkdownIt } from "react-native-markdown-display";
import { Image } from "expo-image";
import { COLORS } from "@/constants";

const ChatDetailScreen = () => {
    const navigation = useNavigation();

    const { chatId } = useLocalSearchParams();
    const { chat_id } = chatId ? JSON.parse(chatId as string) : "";

    const [chat, setChat] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchChat = async () => {
            try {
                const response = await apiClient.get(`users/chats/${chat_id}`);
                console.log("-------------", response.data, "----------------");

                setChat(response.data.chat.messages || []);
            } catch (error) {
                console.error("Error fetching chat details:", error);
            }
            setLoading(false);
        };
        fetchChat();
    }, [chatId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#007bff" style={{ flex: 1 }} />;
    }

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.mainContainer}>
                <View style={styles.topbar}>
                    <Ionicons
                        name="arrow-back-circle-outline"
                        size={24}
                        color="white"
                        style={styles.icon}
                        onPress={navigation.goBack}
                    />
                    <Text style={styles.title}>Previous Chat </Text>
                    <Ionicons name="time-outline" size={24} color="white" style={styles.icon} />
                </View>

                <FlatList
                    // ref={flatListRef} // Attach the ref
                    data={chat}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={item.sender === "ai" ? styles.responseMessage : styles.userMessage}>
                            <Text>
                                {/* {item.text.response} */}
                                <Markdown
                                    markdownit={
                                        MarkdownIt({ typographer: true }).disable(['link'])
                                    }
                                >{item.text.response}</Markdown>
                            </Text>
                            {item.text.retrieved_hyperlinks && item.text.retrieved_hyperlinks.map((link: any, index: number) => {
                                // Improved regex to handle various `<a>` formats
                                const match = link.match(/<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/is);

                                if (!match) return null; // Skip if format is incorrect

                                const [, url, linkText] = match; // Extract URL and text

                                return (
                                    <TouchableOpacity key={index} onPress={() => Linking.openURL(url)}>
                                        <Text style={{ color: "blue", textDecorationLine: "underline" }}>{linkText.trim()}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                            {item.text.retrieved_images && item.text.retrieved_images.length > 0 && <View style={{ marginTop: 30 }}>
                                {
                                    item.text.retrieved_images.map((img: any, index: number) => {
                                        return (
                                            <Image source={{ uri: img.image_url }} alt={img.image_name} style={{ width: 280, height: 280 }} key={index} />
                                        )
                                    })
                                }
                            </View>
                            }
                        </View>
                    )}
                    contentContainerStyle={styles.messageContainer}
                // onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })} // Auto-scroll on new content
                // onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })} // Auto-scroll on layout change
                />
            </View>

            {/* // </ScrollView> */}
        </SafeAreaView>
    );
};

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

export default ChatDetailScreen;
