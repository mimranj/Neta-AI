import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Switch, StyleSheet } from 'react-native';

type Nav = {
  navigate: (value: string) => void
};
const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { navigate } = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual image URL
            style={styles.profileImage}
          />
          {/* <TouchableOpacity style={styles.editIcon}>
            <Text style={styles.editText}>✏️</Text>
          </TouchableOpacity> */}
        </View>
        <Text style={styles.userName}>N/A</Text>
        <Text style={styles.userEmail}>N / A</Text>
        <Text style={styles.userStatus}>N/A</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => { navigate('editprofile') }}>
          <Text style={styles.menuText}>
            <Ionicons name="person-circle-outline" size={16} color="grey" />
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => { navigate('subscription') }}>
          <Text style={styles.menuText}>
            <Ionicons name="card-outline" size={16} color="grey" />
            Subscription & Plan
          </Text>
          <Text style={styles.menuArrow}>Go ➡</Text>
        </TouchableOpacity>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>
            <Ionicons name="eye-outline" size={16} color="grey" />
            Dark Mode
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={(value) => setIsDarkMode(value)}
          />
        </View>

        <TouchableOpacity style={styles.logoutItem}>
          <Text style={styles.logoutText}>
            <Ionicons name="log-out-outline" size={16} color="red" />
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  profileContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
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
    fontSize: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
