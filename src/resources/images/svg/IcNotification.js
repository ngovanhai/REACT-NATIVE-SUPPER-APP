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
            <G clipPath="url(#clip0_10_55)">
                <Path
                    d="M9 0C8.29 0 7.714.575 7.714 1.286v.771a6.431 6.431 0 00-5.142 6.3v.756a7.733 7.733 0 01-1.949 5.126l-.297.334a1.29 1.29 0 00-.213 1.382c.205.462.667.76 1.173.76h15.428a1.288 1.288 0 00.96-2.142l-.297-.334a7.726 7.726 0 01-1.948-5.127v-.755c0-3.11-2.21-5.705-5.143-6.3v-.771C10.286.575 9.71 0 9 0zm1.82 19.82a2.573 2.573 0 00.752-1.82H6.429c0 .683.269 1.338.751 1.82a2.572 2.572 0 001.82.751c.683 0 1.338-.269 1.82-.75z"
                    fill={color}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_10_55">
                    <Path fill={color} d="M0 0H18V20.5714H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default SvgComponent