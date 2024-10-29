import React, { useEffect } from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
const MainStack = createStackNavigator();
import {
  SplashScreen,
  ScannerScreen
} from "@containers/index";
import { Routes } from "@resources";
import { useDispatch, useSelector } from "react-redux";
import MainTabs from "./MainTabs";
const RootNavigation = ({ navigator, appId }) => {
  const { inited } = useSelector((state) => state.application);

  const { application: { initAppData } } = useDispatch();
  useEffect(() => {
    initAppData();
  }, []);
  if (!inited) return null;
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <MainStack.Screen
        name={Routes.splashScreen}
        component={SplashScreen}
        screenOptions={{ headerShown: false }}
        initialParams={{ appId: appId }}
      />
      <MainStack.Screen
        name={Routes.scannerScreen}
        component={ScannerScreen}
        screenOptions={{ headerShown: false }}
      />
      <MainStack.Screen
        name={Routes.tabs}
        component={MainTabs}
        screenOptions={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

export default RootNavigation;
