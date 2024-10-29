import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { Colors } from "../../colors"

function SvgComponent({ color = Colors.white, ...props }) {
    return (
        <Svg
            width={5}
            height={18}
            viewBox="0 0 5 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#clip0_4_6)">
                <Path
                    d="M2.25 12.656a1.969 1.969 0 100 3.938 1.969 1.969 0 000-3.938zm0-5.625a1.969 1.969 0 100 3.938 1.969 1.969 0 000-3.938zm1.969-3.656a1.969 1.969 0 10-3.938 0 1.969 1.969 0 003.938 0z"
                    fill={color}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_4_6">
                    <Path fill={color} d="M0 0H4.5V18H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default SvgComponent