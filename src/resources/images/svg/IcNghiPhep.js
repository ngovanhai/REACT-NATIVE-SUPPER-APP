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
    <G clipPath="url(#clip0_8_59)">
      <Path
        d="M16.956 6.75c1.202 0 3.294 1.02 3.294 2.25 0 1.266-2.092 2.25-3.294 2.25h-4.1l-3.533 6.184c-.2.351-.573.566-.977.566H6.37a.564.564 0 01-.541-.717l1.723-6.033H3.938l-1.52 2.025a.566.566 0 01-.45.225H.493a.491.491 0 01-.474-.63L1.125 9 .018 5.13a.491.491 0 01.475-.63h1.476c.176 0 .344.084.45.225L3.937 6.75h3.618L5.832.717A.56.56 0 016.37 0h1.976c.404 0 .777.218.977.566l3.534 6.184h4.099z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_8_59">
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
