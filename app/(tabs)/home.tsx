import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dropdown from '@/components/Dropdown';
import { useNavigation } from 'expo-router';

type Nav = {
    navigate: (value: string) => void
};
const HomeScreen = () => {
    const { navigate } = useNavigation<Nav>();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleAssistantSelect = (value: string | null) => {
        setIsDropdownOpen(false);
        // if (value) {
        //     navigation.navigate('chat', { assistant: value });
        // }
        Alert.alert('Assistant Selected', `You selected: ${value}`);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* <TouchableOpacity onPress={() => navigate.}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity> */}
                <Text style={styles.title}>Neta</Text>
                <TouchableOpacity onPress={() => navigate('profile')}>
                    <Ionicons name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <Dropdown options={['Electrical Assistant', 'Estimate Assistant']} onSelect={handleAssistantSelect} />
            </View>
            <Text style={styles.welcomeText}>Welcome to {'\n'} <Text style={styles.highlight}>Neta</Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        // paddingHorizontal: 20,
        paddingTop: 20,
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
    dropdownText: {
        fontSize: 16,
        color: 'black',
    },
    welcomeText: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 200,
        fontWeight: 'bold',
        color: '#1EADFF',
    },
    highlight: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default HomeScreen;
