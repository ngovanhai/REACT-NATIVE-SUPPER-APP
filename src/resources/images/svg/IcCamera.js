import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = ({ color = "#000", ...props }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            {...props}
        >
            <Path
                d="M5.242 2.278l-.366 1.097H2.25A2.252 2.252 0 000 5.625v9a2.252 2.252 0 002.25 2.25h13.5a2.252 2.252 0 002.25-2.25v-9a2.252 2.252 0 00-2.25-2.25h-2.626l-.366-1.097a1.683 1.683 0 00-1.6-1.153H6.842c-.727 0-1.37.464-1.6 1.153zM9 6.75a3.375 3.375 0 110 6.75 3.375 3.375 0 010-6.75z"
                fill={color}
            />
        </Svg>
    )
}

export default SvgComponent