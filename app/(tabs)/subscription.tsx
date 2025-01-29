import SubscriptionCard from "@/components/SubscriptionCard";
import React from "react";
import { View, ScrollView } from "react-native";

const SubscriptionScreen = () => {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ marginTop: 20 }}>
                <SubscriptionCard
                    title="Basic Plan"
                    price="9.99"
                    benefits={[
                        "Wide range of workout videos",
                        "Basic progress tracking",
                        "Limited ad-free experience",
                    ]}
                />
                <SubscriptionCard
                    title="Premium Plan"
                    price="19.99"
                    benefits={[
                        "All Basic Benefits",
                        "Expanded library of workouts",
                        "Personalized workout plans",
                        "Ad-free experience",
                        "Live classes and expert-led sessions",
                    ]}
                    isPopular
                />
                <SubscriptionCard
                    title="VIP Plan"
                    price="29.99"
                    benefits={[
                        "All Premium Benefits",
                        "One-on-one sessions with trainers",
                        "Advanced analytics",
                        "In-depth progress tracking",
                        "Fitness challenges and competitions",
                        "Priority customer support",
                    ]}
                />
            </View>
        </ScrollView>
    );
};

export default SubscriptionScreen;
