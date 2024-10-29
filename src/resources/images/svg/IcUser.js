import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const SvgComponent = ({ color = "#FFF", ...props }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={21}
            viewBox="0 0 18 21"
            fill="none"
            {...props}
        >
            <G clipPath="url(#clip0_18_61)">
                <Path
                    d="M9 10.286A5.143 5.143 0 109 0a5.143 5.143 0 000 10.285zm-1.836 1.928A7.162 7.162 0 000 19.378c0 .66.534 1.193 1.193 1.193h15.614c.659 0 1.193-.534 1.193-1.193a7.162 7.162 0 00-7.164-7.164H7.164z"
                    fill={color}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_18_61">
                    <Path fill={color} d="M0 0H18V20.5714H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default SvgComponent