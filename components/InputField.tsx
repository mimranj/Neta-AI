import { COLORS } from '@/constants';
import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
interface InputFieldProps extends TextInputProps {
    label: string;
    error?: string;
}
const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, placeholder, error, keyboardType, ...props }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error ? styles.inputError : {}]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                {...props}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.gray2,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default InputField;
