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
                    display: 'none',
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
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
