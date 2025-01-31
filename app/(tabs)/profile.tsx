import Header from '@/components/Header';
import * as SecureStore from "expo-secure-store";
import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from '@/utils/axios-services';
import SettingSkeleton from '@/components/Skeletons/SettingSkeleton';
 
type Nav = {
  navigate: (value: string) => void
};
type User = {
  name: string;
  email: string;
  org_name: string
  profile_img: string
}
const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true); // To manage loading state

  const { navigate } = useNavigation<Nav>();
  const colors = { background: "white" };

  const fetchUserData = async () => {
    try {
      // Get the user ID from AsyncStorage
      const response = await apiClient.get('/users/s233sa');
      
      if (response.status != 200) {
        throw new Error('User ID not found in AsyncStorage.');
      }
      setUserData({...response.data.data, profile_img:response.data.data.profile.profile_img});
      
    } catch (error) {
      console.error('Error fetching user data: ', error);
    } finally {
      setTimeout(() => {
        setLoading(false); // Set loading state to false when the data fetch is complete
      }, 2000);
    }
  };
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const getTheme = async () => {
  //       const userDetails: any = await SecureStore.getItemAsync("user")
  //       setUserData(JSON.parse(userDetails));
  //     };
  //     getTheme();
  //   }, [])
  // )
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
  }, []))
  return loading ? <SettingSkeleton/>: (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <Header title="" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: userData?.profile_img }} // Replace with actual image URL
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.userName}>{userData?.name || 'N/A'}</Text>
          <Text style={styles.userEmail}>{userData?.email || 'N/A'}</Text>
          <Text style={styles.userStatus}>{userData?.org_name || 'N/A'}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => { navigate('editprofile') }}>
            <View style={styles.list}>
              <Ionicons name="person-circle-outline" size={25} color={COLORS.gray2} />
              <Text style={styles.menuText}>
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => { navigate('subscription') }}>
            <View style={styles.list}>
              <Ionicons name="card-outline" size={25} color={COLORS.gray2} />
              <Text style={styles.menuText}>
                Subscription & Plan
              </Text>
            </View>
            <Text style={styles.menuArrow}>Go ➡</Text>
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <View style={styles.list}>
              <Ionicons name="eye-outline" size={25} color={COLORS.gray2} />
              <Text style={styles.menuText}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={(value) => setIsDarkMode(value)}
            />
          </View>

          <TouchableOpacity style={styles.logoutItem} onPress={async () => {
            await SecureStore.deleteItemAsync("token");
            await SecureStore.deleteItemAsync("user");
            router.replace("/login")
          }}>
            <View style={styles.list}>
              <Ionicons name="log-out-outline" size={25} color="red" />
              <Text style={styles.logoutText}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  header: {
    backgroundColor: '#2196F3', // Blue Background
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)',
  },
  profileContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 2,
  },
  editText: {
    fontSize: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  userEmail: {
    fontSize: 14,
    color: 'white',
  },
  userStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'grey',
    gap: 5,
  },
  menuArrow: {
    fontSize: 14,
    color: 'gray',
  },
  logoutItem: {
    marginTop: 20,
  },
  logoutText: {
    fontSize: 18,
    color: 'red',
    fontWeight: '500',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default ProfileScreen;
