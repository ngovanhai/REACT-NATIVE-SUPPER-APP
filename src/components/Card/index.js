import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Spacing, shadow } from "@resources";

const Card = ({ style, children, ...props }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};
export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: Spacing.padding,
    borderRadius: 8,
    ...shadow(5, 2, 10, "#000", 0.2),
  },
});
