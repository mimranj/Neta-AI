import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Header";
import { COLORS } from "@/constants";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { Image, Text } from "react-native";
const SettingSkeleton = () => {
  const colorMode = "light";
  const dark = false;
  return (
    <Skeleton.Group show={true}>
      <SafeAreaView style={[styles.area]}>
        <Header title="" />
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.profileContainer}>
              <Skeleton colorMode={colorMode} height={150} width={150}>
                <Image
                  source={{ uri: "userData?.profile_img" }} // Replace with actual image URL
                  style={styles.profileImageSkele}
                />
              </Skeleton>
            </View>
            {/* Placeholder card content */}
            <Skeleton colorMode={colorMode} height={20} width={100}>
              <View style={styles.menuContainer}></View>
            </Skeleton>
            <Skeleton colorMode={colorMode} height={20} width={100}>
              <View style={styles.menuContainer}></View>
            </Skeleton>
            <Skeleton colorMode={colorMode} height={20} width={100}></Skeleton>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            <Skeleton colorMode={colorMode} height={40}>
              <Text style={styles.contentView}></Text>
            </Skeleton>
            <Skeleton colorMode={colorMode} height={40}>
              <Text  style={styles.contentView}></Text>
            </Skeleton>
            <Skeleton colorMode={colorMode} height={40}>
              <Text  style={styles.contentView}></Text>
            </Skeleton>
            <Skeleton colorMode={colorMode} height={40}>
              <Text  style={styles.contentView}></Text>
            </Skeleton>
          </View>
        </View>
      </SafeAreaView>
    </Skeleton.Group>
  );
};

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  contentView:{
    marginBottom:50,
  },
  padded: {
    padding: 16,
  },
  SkeletonContainer: {
    backgroundColor: "#F6F6F6",
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    marginTop: 50,
  },
  placeholder: {
    backgroundColor: "#ccc",
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  header: {
    backgroundColor: "#2196F3", // Blue Background
    paddingVertical: 40,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.2)",
  },
  profileContainer: {
    marginBottom: 20,
    position: "relative",
  },
  profileImageSkele: {
    width: 150,
    height: 150,
    borderRadius: 40,
    borderWidth: 3,
    backgroundColor: "#ccc",
    borderColor: "transparent",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
  },
  editText: {
    fontSize: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
  },
  userEmail: {
    fontSize: 14,
    color: "white",
  },
  userStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
  menuContainer: {
    padding: 15,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "grey",
    gap: 5,
  },
  menuArrow: {
    fontSize: 14,
    color: "gray",
  },
  logoutItem: {
    marginTop: 20,
  },
  logoutText: {
    fontSize: 18,
    color: "red",
    fontWeight: "500",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default SettingSkeleton;
