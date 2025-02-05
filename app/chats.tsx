import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import apiClient from "@/utils/axios-services";
import { router, useNavigation } from "expo-router";

interface Chat {
    _id: string;
    title: string;
    timestamp: string;
}

const ChatsScreen = () => {
    console.log("iiinnnnnnnnnnnnnnnnnnn----------------------");

    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    // Fetch Chats
    const fetchChats = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get("users/chats");
            setChats(response.data.data.chats || []);
        } catch (error) {
            Alert.alert("Error", "Failed to fetch chats.");
        }
        setLoading(false);
    };

    // Delete Chat
    const deleteChat = async (chatId: string) => {
        setLoading(true);
        try {
            await apiClient.delete(`users/chats/${chatId}`);
            setChats((prevChats) => prevChats.filter(chat => chat._id !== chatId));
            Alert.alert("Deleted", "Chat has been deleted successfully.");
        } catch (error) {
            Alert.alert("Error", "Failed to delete chat.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchChats();
    }, []);
    console.log(chats);

    return (
        <View style={styles.container}>
            <FlatList
                data={chats}
                keyExtractor={(item) => item._id}
                refreshing={loading}
                onRefresh={fetchChats}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.chatItem}
                        onPress={() => {
                            router.push({
                                pathname: '/chatdetail',
                                params: { chatId: JSON.stringify({ chat_id: item._id }) }, // Pass plan as a parameter
                            });
                        }}
                    >
                        <View style={styles.chatContent}>
                            <Text style={styles.chatTitle}>{item.title}</Text>
                            <Text style={styles.chatTimestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
                        </View>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteChat(item._id)}>
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f4f4f4", padding: 10 },
    chatItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    chatContent: { flex: 1 },
    chatTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
    chatTimestamp: { fontSize: 12, color: "#666", marginTop: 5 },
    deleteButton: { backgroundColor: "#ff4d4d", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 },
    deleteText: { color: "#fff", fontWeight: "bold" },
});

export default ChatsScreen;
