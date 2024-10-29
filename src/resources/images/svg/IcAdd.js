import * as React from "react";
import Svg, { Path } from "react-native-svg";
export default IcAdd = ({ color, ...props }) => (
    <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=" from-lazy"
        {...props}
    >
        <Path
            d="M12.817 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm1-9h3v2h-3v3h-2v-3h-3v-2h3V8h2v3z"
            fill={color}
        />
    </Svg>
);