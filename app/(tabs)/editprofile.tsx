import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; // For Camera Icon
import InputField from '@/components/InputField';

interface FormData {
    name: string;
    phone: string;
    address: string;
    company: string;
    age: string;
    image: string | null;
}

const ProfileForm: React.FC = () => {
    const [form, setForm] = useState<FormData>({
        name: '',
        phone: '',
        address: '',
        company: '',
        age: '',
        image: null,
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    // Function to Pick an Image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setForm({ ...form, image: result.assets[0].uri });
        }
    };

    // Form Validation
    const validateForm = (): boolean => {
        let newErrors: Partial<FormData> = {};

        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10,15}$/.test(form.phone)) {
            newErrors.phone = 'Enter a valid phone number';
        }
        if (!form.address.trim()) newErrors.address = 'Address is required';
        if (!form.company.trim()) newErrors.company = 'Company name is required';
        if (!form.age.trim()) {
            newErrors.age = 'Age is required';
        } else if (isNaN(Number(form.age)) || Number(form.age) < 1 || Number(form.age) > 100) {
            newErrors.age = 'Enter a valid age (1-100)';
        }
        if (!form.image) newErrors.image = 'Profile image is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit Form
    const handleSubmit = () => {
        if (validateForm()) {
            Alert.alert('Success', 'Form submitted successfully!');
        }
    };

    return (
        <View style={styles.container}>
            {/* Profile Image Picker */}
            <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.imagePicker}>
                    {form.image && (
                        <Image source={{ uri: form.image }} style={styles.profileImage} />
                    )}
                    {/* // : (
                    //     <Ionicons name="camera" size={32} color="#555" />
                    // )} */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                    <Ionicons name="camera-outline" size={22} color="white" />
                </TouchableOpacity>
                {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}
            </View>
            {/* Input Fields */}
            <InputField
                label="Name"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
                placeholder="Enter Name"
                error={errors.name}
            />
            <InputField
                label="Phone"
                value={form.phone}
                onChangeText={(text) => setForm({ ...form, phone: text })}
                placeholder="Enter Phone Number"
                error={errors.phone}
                keyboardType="phone-pad"
            />
            <InputField
                label="Address"
                value={form.address}
                onChangeText={(text) => setForm({ ...form, address: text })}
                placeholder="Enter Address"
                error={errors.address}
            />
            <InputField
                label="Company"
                value={form.company}
                onChangeText={(text) => setForm({ ...form, company: text })}
                placeholder="Enter Company Name"
                error={errors.company}
            />
            <InputField
                label="Age"
                value={form.age}
                onChangeText={(text) => setForm({ ...form, age: text })}
                placeholder="Enter Age"
                error={errors.age}
                keyboardType="numeric"
            />

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    imagePicker: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editIcon: {
        position: 'absolute',
        top: 80,
        right: 130,
        backgroundColor: 'grey',
        borderRadius: 12,
        paddingBottom: 1,
        paddingHorizontal: 2,
    },
    editText: {
        fontSize: 12,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileForm;
