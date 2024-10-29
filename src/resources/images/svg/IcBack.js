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
      <G clipPath="url(#clip0_22_63)">
        <Path
          d="M.378 9.378a1.288 1.288 0 000 1.82l6.428 6.428a1.288 1.288 0 001.82-1.82l-4.238-4.235h12.326a1.284 1.284 0 100-2.571H4.392l4.23-4.235a1.288 1.288 0 00-1.82-1.82L.374 9.374l.004.004z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_22_63">
          <Path fill={color} d="M0 0H18V20.5714H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
