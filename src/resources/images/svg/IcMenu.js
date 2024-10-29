import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const SvgComponent = ({ color = "#000", ...props }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={21}
            viewBox="0 0 18 21"
            fill="none"
            {...props}
        >
            <Path
                d="M0 3.857c0-.711.575-1.286 1.286-1.286h15.428c.711 0 1.286.575 1.286 1.286 0 .711-.575 1.286-1.286 1.286H1.286A1.284 1.284 0 010 3.857zm0 6.429C0 9.574.575 9 1.286 9h15.428C17.425 9 18 9.574 18 10.286c0 .71-.575 1.285-1.286 1.285H1.286A1.284 1.284 0 010 10.286zm18 6.428c0 .711-.575 1.286-1.286 1.286H1.286A1.284 1.284 0 010 16.714c0-.711.575-1.286 1.286-1.286h15.428c.711 0 1.286.575 1.286 1.286z"
                fill={color}
            />
        </Svg>
    )
}

export default SvgComponent