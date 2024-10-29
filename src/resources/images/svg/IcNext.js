import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M5.65006 16.59L10.2301 12L5.65006 7.41L7.06006 6L13.0601 12L7.06006 18L5.65006 16.59Z"
            fill="#0762F7"
        />
        <Path
            d="M10.94 16.59L15.52 12L10.94 7.41L12.35 6L18.35 12L12.35 18L10.94 16.59Z"
            fill="#0762F7"
        />
    </Svg>
);
export default SVGComponent;