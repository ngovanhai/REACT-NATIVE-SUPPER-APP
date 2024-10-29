import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Spacing } from "@resources";

export function useWidthHeight() {
  const [value, setValue] = useState({
    width: Spacing.widthScreen,
    height: Spacing.heightScreen,
  });

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window: { width, height } }) => {
      if (width > height) {
        setValue({
          width: Spacing.widthScreen,
          height: Spacing.heightScreen,
        });
      } else {
        setValue({
          width: Spacing.heightScreen,
          height: Spacing.widthScreen,
        });
      }
    });
  }, []);
  return {
    widthScreen: value.width,
    heightScreen: value.height,
  };
}
