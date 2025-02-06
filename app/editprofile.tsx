import React, { useCallback, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons"; // For Camera Icon
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { COLORS } from "@/constants";
import { useFocusEffect, useNavigation } from "expo-router";
import apiClient from "@/utils/axios-services";
import { NavigationProp } from "@react-navigation/native";
import { blobToBase64 } from "../utils/helper-apis";
import MainButton from "@/components/MainButton";
import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton";

interface FormData {
  name: string;
  phone: string;
  address: string;
  company: string;
  email: string;
  image: string | null;
}

const ProfileForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    company: "",
    image: null,
    email: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [editLoading, setEditLoading] = useState<boolean>(false);

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
  const fetchUserData = async () => {
    try {
      // Get the user ID from AsyncStorage
      const response = await apiClient.get("/users/s233sa");

      if (response.status != 200) {
        throw new Error("User ID not found in AsyncStorage.");
      }
      setForm({
        name: response.data.data.name,
        phone: response.data.data.phone_number,
        email: response.data.data.email,
        address: response.data.data.address,
        company: response.data.data.org_name,
        image: response.data.data.profile_img,
      });
    } catch (error) {
      console.error("Error fetching user data: ", error);
    } finally {
      setTimeout(() => {
        setLoading(false); // Set loading state to false when the data fetch is complete
      }, 2000);
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );
 
  const validateForm = (): boolean => {
    let newErrors: Partial<FormData> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.company.trim()) newErrors.company = "Company name is required";

    if (!form.image) newErrors.image = "Profile image is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const navigation = useNavigation<NavigationProp<any>>();

  // Submit Form
  const handleSubmit = async () => {

    // Alert.alert('Success', 'Form submitted successfully!');
    // if (!validateForm()) {
    setEditLoading(true);
    const {
      name: fullName,
      phone: phoneNumber,
      address,
      company: companyName,
      image: profilePicture,
    } = form;
    const password = "111";
    const nickname = "nickname";
    try {
      const img = await blobToBase64(profilePicture);

      const profilePictureBase64 = `data:image/jpeg;base64,${img.img}`;
      const user = {
        name: fullName,
        phone_number: phoneNumber,
        address,
        org_name: companyName,
        profile_img: {
          b64Img: profilePictureBase64,
          name: img.name,
          type: img.type,
        },
      };
      const userId = await apiClient.put("/users/profile/uiy9798y8987", user);
      if (!userId) {
        throw new Error("User ID not found in AsyncStorage.");
      }
      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile: ", error);
      Alert.alert("Error", "There was an issue updating the profile.");
    } finally {
      setEditLoading(false);
    }
    // }
    // else {
    //   Alert.alert("Please fill in the form correctly.");
    // }
  };
  const colors = { background: "white" };

  return loading ? (
    <ProfileSkeleton />
  ) : (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <Header title="" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Profile Image Picker */}
          <View style={styles.profileContainer}>
            <TouchableOpacity style={styles.imagePicker}>
              {form.image && (
                <Image
                  source={{ uri: form.image }}
                  style={styles.profileImage}
                />
              )}
              {/* // : (
                    //     <Ionicons name="camera" size={32} color="#555" />
                    // )} */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <Ionicons name="camera-outline" size={22} color="white" />
            </TouchableOpacity>
            {errors.image && (
              <Text style={styles.errorText}>{errors.image}</Text>
            )}
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
            label="Email"
            style={styles.input}
            readOnly
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            placeholder="Enter email"
            error={errors.email}
            keyboardType="numeric"
          />

          {/* Submit Button */}
          {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity> */}
          <MainButton
            isLoading={editLoading}
            title="Save Changes"
            filled
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    color: "#CCCCCC",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "relative",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    // borderColor: COLORS.primary,
    // borderWidth: 1,
    boxShadow: "rgba(112, 167, 239, 0.88) 0px 3px 8px",
  },
  editIcon: {
    position: "absolute",
    top: 90,
    right: 120,
    backgroundColor: "grey",
    borderRadius: 12,
    paddingBottom: 1,
    paddingHorizontal: 2,
  },
  editText: {
    fontSize: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileForm;
