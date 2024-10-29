import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { useSelector } from "react-redux";

import styles from "./index.style";
import { Metrics } from "../../resources";

const ActionSheet = (props, ref) => {
  const refCallback = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (callback) => {
      refCallback.current = callback;
      setState({ show: true })
    }
  }));

  const handleOnPressAction = (item, index) => () => {
    setState({ show: false, data: { item, index } });
  };

  useEffect(() => {
    if (!state.isVisible && state.data) {
      refCallback.current && refCallback.current(state.data.item, state.data.index);
    }
  }, [state.isVisible, state.data])
  let actions = props.actions || [];
  if (!actions && !actions.length) {
    return null;
  }
  let dismissAction = props.dismissAction;
  if (dismissAction === undefined) {
    dismissAction = -1;
  }
  return (
    <ReactNativeModal
      onBackdropPress={props.onBackdropPress}
      isVisible={state.show}
      style={[styles.contentContainer]}
      onModalHide={props.onModalHide}
      backdropOpacity={0.4}
    >
      <KeyboardAvoidingView
        enabled={Platform.OS == "ios"}
        keyboardVerticalOffset={Platform.OS == "android" ? -500 : 0}
        behavior="padding"
        style={{
          width: Math.min(Metrics.screenWidth, 500),
          alignSelf: "center",
        }}
      >
        {props.children && (
          <View style={[styles.datepickerContainer]}>
            <View
            // onStartShouldSetResponderCapture={_handleUserTouchInit}
            >
              {props.children}
            </View>
          </View>
        )}

        <View style={styles.actionsArea}>
          {actions.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                underlayColor="#ebebeb"
                style={[
                  styles.actionButton,
                  index == 0
                    ? {
                      borderTopWidth: 0,
                    }
                    : {},
                ]}
                onPress={handleOnPressAction(item, index)}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    index === dismissAction ? styles.dismissAction : {},
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </KeyboardAvoidingView>
    </ReactNativeModal>
  );
}

export default forwardRef(ActionSheet)