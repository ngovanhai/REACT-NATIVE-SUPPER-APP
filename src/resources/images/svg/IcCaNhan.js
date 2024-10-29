import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import { Colors } from "@resources/colors";
export default ({ color = Colors.tab_inactive_color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={18}
    viewBox="0 0 21 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip0_8_61)">
      <Path
        d="M2.25 1.125A2.252 2.252 0 000 3.375v11.25a2.252 2.252 0 002.25 2.25H18a2.252 2.252 0 002.25-2.25V3.375A2.252 2.252 0 0018 1.125H2.25zm2.813 9h2.25a2.812 2.812 0 012.812 2.813c0 .309-.253.562-.563.562h-6.75a.564.564 0 01-.562-.563 2.812 2.812 0 012.813-2.812zM3.938 6.75a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zm9-1.125h4.5c.309 0 .562.253.562.563 0 .309-.253.562-.563.562h-4.5a.564.564 0 01-.562-.563c0-.309.253-.562.563-.562zm0 2.25h4.5c.309 0 .562.253.562.563 0 .309-.253.562-.563.562h-4.5a.564.564 0 01-.562-.563c0-.309.253-.562.563-.562zm0 2.25h4.5c.309 0 .562.253.562.563 0 .309-.253.562-.563.562h-4.5a.564.564 0 01-.562-.563c0-.309.253-.562.563-.562z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_8_61">
        <Path fill="#fff" d="M0 0H20.25V18H0z" />
      </ClipPath>
    </Defs>
  </Svg>

);



{/* <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
<Circle cx={12} cy={8} fill="#464646" r={4} />
<Path
  d="M20 19v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1a6 6 0 016-6h4a6 6 0 016 6z"
  fill="#464646"
/>
</Svg> */}
