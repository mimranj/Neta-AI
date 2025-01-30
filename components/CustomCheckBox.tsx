import { COLORS } from "@/constants";
import React from "react";
import { View, Text, Pressable } from "react-native";

const CustomCheckbox = ({ checked, onChange, label }:any) => {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      {/* Checkbox Box */}
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: COLORS.primary,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: checked ? COLORS.primary : COLORS.white,
        }}
      >
        {checked && <Text style={{ color: COLORS.white, fontSize: 12 }}>✓</Text>}
      </View>

      {/* Checkbox Label */}
      {label && <Text style={{ marginLeft: 10 }}>{label}</Text>}
    </Pressable>
  );
};

export default CustomCheckbox;
