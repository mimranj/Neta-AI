import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Menu, Provider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState('Select an Assistant');
    const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleAssistantSelect = (value: string | null) => {
        setSelectedAssistant(value);
        setIsDropdownOpen(false);
        if (value) {
            navigation.navigate('chat', { assistant: value });
        }
    };
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const assistantOptions = [
        { label: 'Electrical Assistant', value: 'electrical' },
        { label: 'Estimate Assistant', value: 'estimate' },
      ];
    //   const handleSelection = (option) => {
    //     setSelected(option);
    //     closeMenu();

    //     if (option === 'Electrical Assistant') {
    //       navigation.navigate('ElectricalAssistant');
    //     } else if (option === 'Estimate Assistant') {
    //       navigation.navigate('EstimateAssistant');
    //     }
    //   };
    const renderDropdown = () => (
        <Modal
            transparent={true}
            animationType="fade"
            visible={isDropdownOpen}
            onRequestClose={() => setIsDropdownOpen(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setIsDropdownOpen(false)}
            />
            <View
                style={styles.dropdownListContainer}
            >
                <FlatList
                    data={assistantOptions}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleAssistantSelect(item.value)}
                        >
                            <Text style={styles.dropdownItemText}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </Modal>
    );

    return (
        <View>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Neta</Text>
                    <TouchableOpacity>
                        <Ionicons name="settings-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {renderDropdown()}

                {/* Dropdown */}
                {/* <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu} style={styles.dropdown}>
              <Text style={styles.dropdownText}>{selected}</Text>
              <Ionicons name="chevron-down" size={20} color="black" />
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => handleSelection('Electrical Assistant')} title="Electrical Assistant" />
          <Menu.Item onPress={() => handleSelection('Estimate Assistant')} title="Estimate Assistant" />
        </Menu> */}

                {/* Welcome Text */}
                <Text style={styles.welcomeText}>Welcome to {'\n'} <Text style={styles.highlight}>Neta</Text></Text>
            </View>
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
    dropdown: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    dropdownText: {
        fontSize: 16,
        color: 'black',
    },
    welcomeText: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 50,
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
    dropdownListContainer: {
        position: 'absolute',
        top: '50%',
        left: '10%',
        width: '80%',
        borderRadius: 8,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
    },
    dropdownItemText: {
        fontSize: 16,
    },
});

export default HomeScreen;
