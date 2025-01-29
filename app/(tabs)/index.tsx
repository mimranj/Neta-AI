import { View, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import ImageViewer from '@/components/ImageViewer';
import PrimaryButton from '@/components/PrimaryButton';
import { COLORS, FONTS, SIZES } from '@/constants';
import { useNavigation } from 'expo-router';
const PlaceholderImage = require("@/assets/images/adaptive-icon copy.png");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dotsContainer: {
    marginBottom: 20,
    marginTop: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 22,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    height: 360,
  },
  titleContainer: {
    marginVertical: 18,
    alignItems: 'center',
  },
  title: {
    ...FONTS.h3,
    color: COLORS.white,
    textAlign: "center",
  },
  subTitle: {
    ...FONTS.h3,
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 8,
  },
  description: {
    ...FONTS.body3,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 16
  },
  nextButton: {
    width: SIZES.width - 44,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    marginTop: 22
  },
  skipButton: {
    width: SIZES.width - 44,
    marginBottom: SIZES.padding,
    backgroundColor: 'transparent',
    borderColor: COLORS.primary
  },
});

type Nav = {
  navigate: (value: string) => void
}
export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const { navigate } = useNavigation<Nav>();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.subTitle}>Neta App</Text>
        </View>

        <Text style={styles.description}>
          Welcome to Neta, a great friend to chat with you
        </Text>

        {/* <View style={styles.dotsContainer}>
          {progress < 1 && <DotsView progress={progress} numDots={4} />}
        </View> */}

        <PrimaryButton
          title="Next"
          filled
          onPress={() => navigate('onboarding2')}
          style={styles.nextButton}
        />
        <PrimaryButton
          title="Skip"
          onPress={() => navigate('login')}
          textColor={COLORS.primary}
          style={styles.skipButton}
        />
      </View>
    </View>
  );
}