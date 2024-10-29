import LinearGradient from "react-native-linear-gradient";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Spacing } from "@resources";

export default function Button({
  color = Colors.primary,
  color2,
  textStyle = {},
  title,
  style = {},
  wraperStyle = {},
  buttonStyle,
  onPress,
  margin = 0,
  ...props
}) {
  return (
    <LinearGradient
      {...props}
      colors={[color, color2 || color]}
      style={[styles.btn, style, { padding: 0, margin: margin }]}
    >
      <TouchableOpacity
        style={[{ padding: Spacing.padding, width: "100%" }, buttonStyle]}
        onPress={onPress}
      >
        {props.children ? props.children :
          <Text style={[styles.text, textStyle]}>{title}</Text>}
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    // padding: Spacing.padding,
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "center",
  },
  text: {
    ...Fonts.font16w600,
    color: Colors.white,
    textAlign: "center",
  },
});
