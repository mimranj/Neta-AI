import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageSourcePropType, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { SIZES, COLORS, } from '../constants';
import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { useTheme } from '../theme/ThemeProvider';
import { Image } from 'expo-image';
// import { icons } from '@/constants/icons';
const back = require("../assets/icons/back.png")
interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const navigation = useNavigation<NavigationProp<any>>();
    // const { colors, dark } = useTheme();
    const dark = false
    const handleClick = () => {
        if (title) {
            navigation.navigate(title)
        } else {
            navigation.goBack()
        }
    }
    return (
        <View style={[styles.container, {
            backgroundColor: dark ? COLORS.dark1 : COLORS.white
        }]}>
            <TouchableOpacity onPress={handleClick}>
                <Image
                    source={back as ImageSourcePropType}
                    contentFit='contain'
                    style={[styles.backIcon,
                        //      {
                        //     tintColor: colors.text
                        // }
                    ]}
                />
            </TouchableOpacity>
            {/* <Text style={[styles.title,
                //  { color: colors.text }
            ]}>{title}</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        width: SIZES.width - 32,
        flexDirection: "row",
        alignItems: "center",
    } as ViewStyle,
    backIcon: {
        width: 24,
        height: 24,
        marginLeft: 16,
    } as ImageStyle,
    title: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.grayTie,
    } as TextStyle,
});

export default Header;