import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import { Colors } from "@resources";
export default ({
  color = Colors.tab_inactive_color,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={18}
    viewBox="0 0 21 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip0_8_57)">
      <Path
        d="M20.243 8.982c0 .633-.527 1.129-1.125 1.129h-1.125l.025 5.632c0 .095-.008.19-.018.285v.566C18 17.37 17.37 18 16.594 18h-.563c-.038 0-.077 0-.116-.003-.049.003-.098.003-.147.003H13.78c-.777 0-1.406-.63-1.406-1.406V13.5c0-.622-.503-1.125-1.125-1.125H9c-.622 0-1.125.503-1.125 1.125v3.094c0 .777-.63 1.406-1.406 1.406H4.504c-.053 0-.106-.003-.159-.007-.042.004-.084.007-.126.007h-.563c-.777 0-1.406-.63-1.406-1.406v-3.938c0-.031 0-.067.004-.098V10.11H1.125A1.111 1.111 0 010 8.982c0-.316.105-.597.352-.843L9.366.28C9.612.035 9.893 0 10.139 0s.527.07.738.246l8.98 7.893c.28.246.421.527.386.843z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_8_57">
        <Path fill="#fff" d="M0 0H20.25V18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);