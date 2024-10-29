import React, { useRef } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import Modal from "react-native-modal";
import { forwardRef } from "react";
import { useState } from "react";
import { useImperativeHandle } from "react";
import { Card, Button } from "@components";
import { Fonts, Colors, Spacing } from "@resources";
// eslint-disable-next-line react/display-name
const ModalConfirm = forwardRef(({ }, ref) => {
  const refCallback = useRef(null);
  const refOk = useRef(null);
  const [state, _setState] = useState({
    show: false,
    title: "iSofH Super App",
  });
  const setState = (data = {}) => {
    _setState((preState) => {
      return { ...preState, ...data };
    });
  };

  const getCurrentLoadingState = () => {
    return state.show;
  };
  useImperativeHandle(ref, () => ({
    show: (
      {
        message,
        cancelText,
        acceptText,
        messageIsText = true,
        title = "iSofH Super App",
        showInput = false,
        showText = true,
        placeholder = "",
        onOk
        , ...data
      },
      callback
    ) => {
      refCallback.current = callback;
      refOk.current = onOk;
      setState({
        show: true,
        message,
        acceptText,
        cancelText,
        title,
        messageIsText,
        showInput,
        showText,
        valueInput: "",
        placeholder, ...data
      });
    },
    hide: () => {
      setState({ show: false });
    },
    getCurrentLoadingState: getCurrentLoadingState,
  }));
  const onClose = (value) => async () => {
    if (value) {
      if (state.showInput && !state.valueInput) {
        setState({ message: state.messageError });
        return;
      }
      if (refOk.current) {
        const isValid = await refOk.current(state.valueInput);
        if (!isValid) {
          setState({ show: true })
          return false;
        }
      }
      setState({
        show: false,
      });
      refCallback.current && refCallback.current(value);
    } else {
      setState({
        show: false,
      });
    }
  };
  const onChangeInput = value => {
    setState({ valueInput: value })
  }
  return (
    <Modal isVisible={state.show} transparent={true}>
      <Card style={{ alignItems: "flex-start" }}>
        <Text
          style={{ color: Colors.black, ...Fonts.font14w600, lineHeight: 20 }}
        >
          {state.title}
        </Text>
        {state.showText && (state?.messageIsText ? (
          <Text
            style={{
              color: Colors.black,
              ...Fonts.font14w400,
              lineHeight: 22,
              marginTop: Spacing.p8,
              marginBottom: Spacing.padding,
              color: Colors.textColor2,
            }}
          >
            {state?.message}
          </Text>
        ) : (
          <View>{state?.message}</View>
        ))}
        {state.showInput && <>
          <TextInput placeholder={state.placeholder} value={state.valueInput} numberOfLines={2} multiline={true} onChangeText={onChangeInput} style={{ borderWidth: 1, borderColor: 'blue', width: '100%', marginBottom: 10, padding: 10, minHeight: 100 }} />
          {!!state.message &&
            <Text style={{ color: Colors.red, marginBottom: Spacing.p10, fontSize: Fonts.font12 }}>{state.message}</Text>
          }
        </>}

        <View style={{ flexDirection: "row" }}>
          <Button
            title={state.cancelText || "Huỷ"}
            style={styles.buttonCancel}
            textStyle={styles.buttonCancelText}
            onPress={onClose(false)}
            color={Colors.white}
            color2={Colors.white}
            buttonStyle={{ padding: 8 }}
          ></Button>
          <Button
            title={state.acceptText || "Đồng ý"}
            style={{
              flex: 1,
              marginLeft: Spacing.p8,
              padding: Spacing.p8,
            }}
            color={Colors.primary}
            onPress={onClose(true)}
            buttonStyle={{ padding: 8 }}
          ></Button>
        </View>
      </Card>
    </Modal>
  );
});
export default ModalConfirm;
const styles = StyleSheet.create({
  loading: {
    width: Spacing.widthScreen / 2,
    height: Spacing.heightScreen / 2,
  },
  wrap: {
    alignItems: "center",
  },
  buttonCancel: {
    flex: 1,
    marginRight: Spacing.p8,
    padding: Spacing.p8,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  buttonCancelText: { color: Colors.textColor2 },
});
