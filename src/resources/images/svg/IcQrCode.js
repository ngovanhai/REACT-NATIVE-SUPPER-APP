import React from "react";
import Svg, { Path, G, ClipPath, Defs } from "react-native-svg";
import { Colors } from "@resources";
export default ({ color = Colors.tab_inactive_color, ...props }) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_5308_43892)">
      <Path
        d="M3 10a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v6zm2-4.8c0-.11.09-.2.2-.2h3.6c.11 0 .2.09.2.2v3.6a.2.2 0 01-.2.2H5.2a.2.2 0 01-.2-.2V5.2z"
        fill={color}
      />
      <Path
        d="M3 10a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v6zm2-4.8c0-.11.09-.2.2-.2h3.6c.11 0 .2.09.2.2v3.6a.2.2 0 01-.2.2H5.2a.2.2 0 01-.2-.2V5.2z"
        fill={color}
        fillOpacity={0.25}
      />
      <Path
        d="M3 20a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1H4a1 1 0 00-1 1v6zm2-4.8c0-.11.09-.2.2-.2h3.6c.11 0 .2.09.2.2v3.6a.2.2 0 01-.2.2H5.2a.2.2 0 01-.2-.2v-3.6z"
        fill={color}
      />
      <Path
        d="M3 20a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1H4a1 1 0 00-1 1v6zm2-4.8c0-.11.09-.2.2-.2h3.6c.11 0 .2.09.2.2v3.6a.2.2 0 01-.2.2H5.2a.2.2 0 01-.2-.2v-3.6z"
        fill={color}
        fillOpacity={0.25}
      />
      <Path
        d="M14 3a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1h-6zm5 5.8a.2.2 0 01-.2.2h-3.6a.2.2 0 01-.2-.2V5.2c0-.11.09-.2.2-.2h3.6c.11 0 .2.09.2.2v3.6z"
        fill={color}
      />
      <Path
        d="M14 3a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1h-6zm5 5.8a.2.2 0 01-.2.2h-3.6a.2.2 0 01-.2-.2V5.2c0-.11.09-.2.2-.2h3.6c.11 0 .2.09.2.2v3.6z"
        fill={color}
        fillOpacity={0.25}
      />
      <Path d="M21 19h-2v2h2v-2z" fill={color} />
      <Path d="M21 19h-2v2h2v-2z" fill={color} fillOpacity={0.25} />
      <Path d="M15 13h-2v2h2v-2z" fill={color} />
      <Path d="M15 13h-2v2h2v-2z" fill={color} fillOpacity={0.25} />
      <Path d="M17 15h-2v2h2v-2z" fill={color} />
      <Path d="M17 15h-2v2h2v-2z" fill={color} fillOpacity={0.25} />
      <Path d="M15 17h-2v2h2v-2z" fill={color} />
      <Path d="M15 17h-2v2h2v-2z" fill={color} fillOpacity={0.25} />
      <Path d="M17 19h-2v2h2v-2z" fill={color} />
      <Path d="M17 19h-2v2h2v-2z" fill={color} fillOpacity={0.25} />
      <Path d="M19 17h-2v2h2v-2z" fill={color} />
      <Path d="M19 17h-2v2h2v-2z" fill={color} fillOpacity={0.25} />
      <Path d="M19 13h-2v2h2v-2z" fill={color} />
      <Path d="M19 13h-2v2h2v-2z" fill={color} fillOpacity={0.25} />
      <Path d="M21 15h-2v2h2v-2z" fill={color} />
      <Path d="M21 15h-2v2h2v-2z" fill={color} fillOpacity={0.25} />
    </G>
    <Defs>
      <ClipPath id="clip0_5308_43892">
        <Path fill="#fff" d="M0 0H24V24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);