import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, router } from 'expo-router';
import MainButton from '@/components/MainButton';
import { COLORS, images, SIZES } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from '@/utils/axios-services';
import { Image } from 'expo-image';

type Nav = {
    navigate: (value: string) => void
};
const HomeScreen = () => {
    const { navigate } = useNavigation<Nav>();
    const colors = { background: "white" };
    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    {/* <TouchableOpacity onPress={() => navigate.}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity> */}
                    <Text style={styles.title}></Text>
                    <TouchableOpacity onPress={() => navigate('profile')}>
                        <Ionicons name="settings-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.centered}>
                    <View style={styles.imgContainer}>
                        <Image
                            source={images.logo}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    {/* <MainButton
                        title="Start Chat with Electrical Assistant"
                        filled
                        onPress={() => {
                            router.push({
                                pathname: '/electricalAssitant',
                                params: { title: JSON.stringify({ page_title: "Electrical Assistant" }) }, // Pass title as a parameter
                            });
                        }}
                        style={styles.button}
                    /> */}
                    <MainButton
                        title="Start a new chat"
                        filled
                        onPress={() => {
                            router.push({
                                pathname: '/electricalAssitant',
                                params: { title: JSON.stringify({ page_title: "Electrical Assistant" }) }, // Pass plan as a parameter
                            });
                        }}
                        style={styles.button}
                    />
                    <MainButton
                        title="Previous Chats"
                        filled
                        onPress={() => {
                            navigate('chats');
                        }}
                        style={styles.hButton}
                    />
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    centered: {
        justifyContent: "center",
        alignItems: "center",
    },
    imgContainer: {
        width: "50%",
        marginBottom: 20
    },
    logo: {
        width: "auto",
        height: 170,
        marginBottom: 20,
    },
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    button: {
        marginVertical: 6,
        width: SIZES.width - 32,
        borderRadius: 30,
    },
    hButton: {
        marginVertical: 6,
        width: SIZES.width - 32,
        borderRadius: 30,
        backgroundColor: COLORS.gray2
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        // paddingTop: 20,
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
        textAlign: "center",
        fontSize: 30,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default HomeScreen;
