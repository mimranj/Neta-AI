import { COLORS } from "@/constants";
import { Skeleton } from "moti/skeleton";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Header";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

const ProfileSkeleton: React.FC = () => {
  const colors = { background: "white" };
  const colorMode = "light";
  const dark = false;

  return (
    <Skeleton.Group show={true}>
      <Header title="profile" />

      <View style={styles.container}>
        {/* Profile Image Picker */}
        <View style={styles.profileContainer}>
          <Skeleton
            radius="round"
            colorMode={colorMode}
            height={150}
            width={150}
          ></Skeleton>
        </View>

        <View style={styles.menuContainer}>
          <Skeleton colorMode={colorMode} height={20} width={100}>
            <View style={styles.menuContainer}></View>
          </Skeleton>
          <Skeleton colorMode={colorMode} height={50}>
            <Text></Text>
          </Skeleton>

          <Skeleton colorMode={colorMode} height={20} width={100}>
            <View style={styles.menuContainer}></View>
          </Skeleton>
          <Skeleton colorMode={colorMode} height={50}>
            <Text></Text>
          </Skeleton>

          <Skeleton colorMode={colorMode} height={20} width={100}>
            <View style={styles.menuContainer}></View>
          </Skeleton>
          <Skeleton colorMode={colorMode} height={50}>
            <Text></Text>
          </Skeleton>

          <Skeleton colorMode={colorMode} height={20} width={100}>
            <View style={styles.menuContainer}></View>
          </Skeleton>
          <Skeleton colorMode={colorMode} height={50}>
            <Text></Text>
          </Skeleton>
        </View>
        {/* Input Fields */}

        {/* Submit Button */}
        {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity> */}
      </View>
    </Skeleton.Group>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    gap: 10,
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

export default ProfileSkeleton;
