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
            d="M18.3499 7.41L13.7699 12L18.3499 16.59L16.9399 18L10.9399 12L16.9399 6L18.3499 7.41Z"
            fill="#0762F7"
        />
        <Path
            d="M13.06 7.41L8.48002 12L13.06 16.59L11.65 18L5.65002 12L11.65 6L13.06 7.41Z"
            fill="#0762F7"
        />
    </Svg>
);
export default SVGComponent;