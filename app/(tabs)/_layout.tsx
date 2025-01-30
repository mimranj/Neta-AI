import { Stack, Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ffd33d',
                headerStyle: {
                    backgroundColor: '#1EADFF',
                },

                headerShown: false,
                headerShadowVisible: true,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: 'white',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: 'About',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
                    ),
                }}
            />
            <Stack>
                <Stack.Screen name="home" />
                <Stack.Screen name="profile" />
                <Stack.Screen name="editprofile" />
                <Stack.Screen name="subscription" />

            </Stack>
        </Tabs>
    );
}
