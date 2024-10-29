import React, { useRef, useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { forwardRef } from "react";
import { useState } from "react";
import { useImperativeHandle } from "react";
import { LOTTIE } from "@images";

// eslint-disable-next-line react/display-name
const ModalLoading = forwardRef(({ }, ref) => {
  const { width: widthScreen, height: heightScreen } = Dimensions.get("screen");
  const [isVisible, setIsVisible] = useState(false);
  const refVisible = useRef(false);
  const refTimout = useRef();
  const show = () => {
    if (!refVisible.current) {
      refVisible.current = true;
      setIsVisible(true);
    }
  };
  const hide = () => {
    if (refVisible.current) {
      if (refTimout.current) clearTimeout(refTimout.current);
      refTimout.current = setTimeout(() => {
        refVisible.current = false;
        setIsVisible(false);
      }, 200);
    }
  };

  const getCurrentLoadingState = () => {
    return isVisible;
  };

  useImperativeHandle(ref, () => ({
    show: show,
    hide: hide,
    getCurrentLoadingState: getCurrentLoadingState,
  }));
  if (isVisible) {
    return (
      <View style={[styles.wrap, { width: widthScreen, height: heightScreen }]}>
        <LottieView
          style={styles.loading}
          source={LOTTIE.IconLoading}
          autoPlay
          loop
        />
      </View>
    );
  } else {
    return <></>;
  }
});
export default ModalLoading;
const styles = StyleSheet.create({
  loading: {
    width: 50,
    height: 50,
    zIndex: 200000,
    opacity: 1,
  },
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10000,
    backgroundColor: "#000",
    opacity: 0.8,
  },
});
