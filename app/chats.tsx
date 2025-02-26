import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import apiClient from "@/utils/axios-services";
import { router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants";
import Header from "@/components/Header";

interface Chat {
    _id: string;
    title: string;
    timestamp: string;
}
type Nav = {
    navigate: (value: string) => void
};
const ChatsScreen = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(false);
    const { navigate } = useNavigation<Nav>();

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

    const colors = { background: "white" };
    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <Header title="" />
            <View style={styles.container}>
                {/* <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigate('home')}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Previous Chats</Text>
                    <Text style={styles.title}></Text>
                </View> */}
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
                                <Text style={styles.deleteText}>
                                    <Ionicons name="trash-bin-outline" size={20} color="white" style={styles.deleteText} onPress={() => router.navigate("/chats")} />
                                </Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#1EADFF',
        padding: 15,
        // borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    container: { flex: 1, backgroundColor: "#f5f5f5" },
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
    deleteButton: { backgroundColor: "#ff4d4d", paddingVertical: 10, paddingHorizontal: 10, borderRadius: 50 },
    deleteText: { color: "#fff", fontWeight: "bold" },
});

export default ChatsScreen;
