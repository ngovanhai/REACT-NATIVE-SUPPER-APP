import { ModalConfirm, ModalLoading } from "@components/index";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import RootNavigation from "@navigators/index";
import { _navigator } from "@navigators/NavigationService";
import { NavigationContainer } from "@react-navigation/native";
import fonts from "@resources/fonts";
import React, { useEffect } from "react";

import {
  Alert,
  Animated,
  LogBox,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import codePush from "react-native-code-push";
import FlashMessage from "react-native-flash-message";
import Provider from '@redux-store/Provider';
import messaging from "@react-native-firebase/messaging";
import { Routes } from "./resources";

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 15 * 60,
};

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.placeholderTextColor = "#BBB";
Animated.Text.defaultProps = TextInput.defaultProps || {};
Animated.Text.defaultProps.allowFontScaling = false;

export const refModalLoading = React.createRef(null);
export const refModalConfirm = React.createRef(null);
export const refModalSelect = React.createRef(null);

export const showLoading = () => {
  refModalLoading.current?.show();
}
export const hideLoading = () => {
  refModalLoading.current?.hide();
}
export const showConfirm = ({
  title,
  message,
  cancelText,
  acceptText,
  showInput,
  showText,
  placeholder,
  onOk,
  ...data
}, callback) => {
  refModalConfirm.current && refModalConfirm.current.show({
    title,
    message,
    cancelText,
    acceptText,
    showInput,
    showText,
    placeholder,
    onOk,
    ...data
  }, callback)
}

const App = ({ appId }) => {
  useEffect(() => {
    setDefaultText();
    LogBox.ignoreAllLogs();
    checkApplicationPermission();
  }, []);
  const checkApplicationPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log("User has notification permissions enabled.");
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log("User has provisional notification permissions.");
    } else {
      console.log("User has notification permissions disabled");
    }
  };

  const setDefaultText = () => {
    let components = [Text, TextInput];
    let fontFamily;
    for (let i = 0; i < components.length; i++) {
      const TextRender = components[i].render;
      components[i].render = function (...args) {
        let origin = TextRender.call(this, ...args);
        if (
          origin.props &&
          origin.props.style &&
          origin.props.style.fontWeight
        ) {
          fontFamily = fonts[`${origin.props.style.fontWeight}`];
          return React.cloneElement(origin, {
            style: StyleSheet.flatten([
              origin.props.style,
              {
                fontFamily: fonts[`${origin.props.style.fontWeight}`],
                fontWeight: undefined,
              },
            ]),
          });
        }
        return React.cloneElement(origin, {
          style: StyleSheet.flatten([
            origin.props.style,
            { fontFamily: fonts["500"] },
          ]),
        });
      };
    }
  };
  return (
    <Provider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <NavigationContainer
        linking={{
          prefixes: ["isofh://"],
          config: {
            screens: {
              "splashScreen": {
                path: 'openApp/:appId'
              },
            }
          }
        }}
        ref={_navigator}
      >
        <RootNavigation appId={appId} />
        <FlashMessage
          floating={true}
          style={{ marginTop: 30 }}
          position="top"
        />

        <ModalConfirm
          ref={(ref) => {
            refModalConfirm.current = ref;
          }}
        />
        <ModalLoading
          ref={(ref) => {
            refModalLoading.current = ref;
          }}
        />
      </NavigationContainer>
    </Provider>
  );
};

export default codePush(codePushOptions)(App);
