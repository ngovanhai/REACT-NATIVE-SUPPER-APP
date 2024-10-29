import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

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
            <G clipPath="url(#clip0_16_55)">
                <Path
                    d="M16.58.763a1.967 1.967 0 00-2.785 0l-1.058 1.055 3.442 3.441 1.058-1.058c.77-.77.77-2.014 0-2.784L16.58.763zM6.06 8.497c-.214.215-.379.478-.474.77l-1.04 3.122a.848.848 0 00.204.865.837.837 0 00.864.204l3.122-1.04c.289-.096.552-.26.77-.475l5.882-5.885-3.445-3.446L6.06 8.497zM3.376 2.25A3.376 3.376 0 000 5.625v9A3.376 3.376 0 003.375 18h9a3.376 3.376 0 003.375-3.375V11.25c0-.622-.503-1.125-1.125-1.125s-1.125.503-1.125 1.125v3.375c0 .622-.503 1.125-1.125 1.125h-9a1.124 1.124 0 01-1.125-1.125v-9c0-.622.503-1.125 1.125-1.125H6.75a1.124 1.124 0 100-2.25H3.375z"
                    fill={color}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_16_55">
                    <Path fill={color} d="M0 0H18V18H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default SvgComponent
