import React from "react";
import Svg, { Path } from "react-native-svg";

export default ({ size = 24, color = "#27272A" }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M4.293 18.293a1 1 0 101.414 1.414L12 13.414l6.293 6.293a1 1 0 001.414-1.414L13.414 12l6.293-6.293a1 1 0 00-1.414-1.414L12 10.586 5.707 4.293a1 1 0 10-1.414 1.414L10.586 12l-6.293 6.293z"
      fill={color}
    />
  </Svg>
);