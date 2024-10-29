import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const SvgComponent = ({ color = "#FFF", ...props }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            {...props}
        >
            <G clipPath="url(#clip0_18_59)">
                <Path
                    d="M14.625 7.313a7.295 7.295 0 01-1.406 4.313l4.45 4.455a1.127 1.127 0 01-1.592 1.592l-4.45-4.454a7.271 7.271 0 01-4.315 1.406A7.311 7.311 0 010 7.312 7.311 7.311 0 017.313 0a7.311 7.311 0 017.312 7.313zm-7.313 5.062a5.06 5.06 0 004.678-7 5.062 5.062 0 10-4.678 7z"
                    fill={color}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_18_59">
                    <Path fill={color} d="M0 0H18V18H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default SvgComponent