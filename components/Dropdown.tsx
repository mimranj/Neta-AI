import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Dropdown = ({ options, onSelect }: { options: string[]; onSelect: (option: string) => void }) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState('Select an option');

    const handleSelect = (option: string) => {
        setSelected(option);
        setVisible(false);
        onSelect(option);
    };

    return (
        <View style={styles.container}>
            {/* Dropdown Button */}
            <TouchableOpacity style={styles.dropdown} onPress={() => setVisible(!visible)}>
                <Text style={styles.selectedText}>{selected}</Text>
                <Ionicons name={visible ? 'chevron-up' : 'chevron-down'} size={20} color="black" />
            </TouchableOpacity>

            {/* Dropdown Options */}
            {visible && (
                <View style={styles.dropdownList}>
                    {options.map((option, index) => (
                        <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelect(option)}>
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    dropdown: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 3,
    },
    selectedText: {
        fontSize: 16,
        color: 'black',
    },
    dropdownList: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 3,
        zIndex: 1000,
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
        color: 'black',
    },
});

export default Dropdown;
