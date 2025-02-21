
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, StyleSheet, Alert, TouchableOpacity, Image, Text } from 'react-native';
import { confirmPlatformPayPayment, PlatformPay, PlatformPayButton, useStripe } from '@stripe/stripe-react-native';
import apiClient from '@/utils/axios-services';
import Fontisto from '@expo/vector-icons/Fontisto';
// import { SearchParams } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';
enum ContactField {
    EmailAddress = "emailAddress",
    Name = "name",
    PhoneNumber = "phoneNumber",
    PhoneticName = "phoneticName",
    PostalAddress = "postalAddress"
}

// Now use it in your configuration
const requiredShippingAddressFields: ContactField[] = [
    ContactField.PostalAddress, // Correct value
    ContactField.Name,
    ContactField.PhoneNumber
];

const SelectedPackageScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    let planData
    const { plan } = useLocalSearchParams();
    const parsedPlan = plan ? JSON.parse(plan as string) : null;
    planData = parsedPlan
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [paymentSheetReady, setPaymentSheetReady] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    const fetchPaymentSheetParams = async () => {
        try {
            const response = await apiClient.post('stripe/payment-intent', {
                amount: parsedPlan?.amount, // Amount in cents
            });
            const { paymentIntent } = response.data;
            setClientSecret(paymentIntent.client_secret);

            const { error } = await initPaymentSheet({
                paymentIntentClientSecret: paymentIntent.client_secret,
                merchantDisplayName: 'Your App',
                googlePay: {
                    merchantCountryCode: 'US', // Your country code
                    testEnv: true, // Set to false in production
                },
            });


            if (error) {
                console.error('Error initializing Payment Sheet:', error.message);
                Alert.alert('Initialization Error', error.message);
                return;
            }
            setPaymentSheetReady(true); // Enable the Payment Sheet button
        } catch (error) {
            console.error('Error initializing payment sheet:', error);
            Alert.alert('Error', 'Failed to initialize payment sheet');
        }
    };

    useEffect(() => {
        fetchPaymentSheetParams();
    }, []);

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert('Payment failed', error.message);
            console.error('Payment Error:', error.message);
            navigation.navigate('profile');
        } else {
            const newSubscription = {
                intent_id: clientSecret,
                name: planData?.title,
                price: parsedPlan?.amount,
                status: 'active',
                start_date: new Date(),
                end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            }
            await SecureStore.setItemAsync('plan', JSON.stringify(newSubscription));
            const response = await apiClient.put('stripe/subscription', { newSubscription });
            Alert.alert('Success', 'Payment completed!');
            console.log('Payment completed successfully');
            navigation.navigate('home');

        }
    };

    const pay = async () => {

        const { error } = await confirmPlatformPayPayment(
            clientSecret,
            {
                googlePay: {
                    testEnv: true,
                    merchantName: 'My merchant name',
                    merchantCountryCode: 'US',
                    currencyCode: 'USD',
                    billingAddressConfig: {
                        format: PlatformPay.BillingAddressFormat.Full,
                        isPhoneNumberRequired: true,
                        isRequired: true,
                    },
                },
                applePay: {
                    merchantCountryCode: 'US',
                    currencyCode: 'USD',
                    shippingMethods: [
                        {
                            label: 'Free Shipping',
                            amount: '0.00',
                            identifier: 'free-shipping',
                            detail: 'Arrives in 5-7 days',
                        },
                    ],
                    requiredShippingAddressFields: requiredShippingAddressFields,
                    cartItems: []
                },
            }
        );

        if (error) {
            Alert.alert(error.code, error.message);
            // Update UI to prompt user to retry payment (and possibly another payment method)
            return;
        }
        const newSubscription = {
            intent_id: clientSecret,
            name: planData?.title,
            price: parsedPlan?.amount,
            status: 'active',
            start_date: new Date(),
            end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        }
        apiClient.put('stripe/subscription', { newSubscription });
        Alert.alert('Success', 'Payment completed!');
        navigation.navigate('home');
    };

    const colors = { background: "white" };
    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={styles.container}>
                <View style={{marginBottom: 20}}>
                    <Header title="" />
                </View>
                {/* Package Details Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{planData?.title}</Text>
                    <View style={styles.cardDescription}>
                        {planData?.description?.map((point: any, index: any) => (
                            <Text key={index} style={styles.cardDescriptionText}>
                                • {point.label}
                            </Text>
                        ))}
                    </View>
                    <Text style={styles.cardPrice}>{planData?.price}</Text>
                </View>

                {/* Payment Buttons */}
                <TouchableOpacity style={styles.button} onPress={openPaymentSheet}>
                    <View style={styles.content}>
                        <Fontisto name="visa" size={24} color="black" />
                        <Text style={styles.text}> Pay</Text>
                    </View>
                </TouchableOpacity>
                <PlatformPayButton
                    type={PlatformPay.ButtonType.Pay}
                    onPress={pay}
                    style={{
                        width: '100%',
                        height: 50,
                        borderWidth: 1,
                        borderColor: '#eee',
                        borderRadius: 4,
                    }}
                />
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.primary,
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
        marginBottom: 20,
        width: SIZES.width,
        // borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        // paddingTop: 50,
        backgroundColor: '#f9f9f9', // Light background for better card contrast
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
        width: '100%',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    cardDescription: {
        marginBottom: 10,
    },
    cardDescriptionText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1aa7ec',
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#1aa7ec',
        borderRadius: 4,
        paddingVertical: 12,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        marginLeft: 10,
    },
});

export default SelectedPackageScreen

