import React, { useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Routes } from "@resources";
import TabBarBottom from "./TabBarBottom";
import { HomeScreen, LibraryScreen } from "../containers";

const MainTab = createBottomTabNavigator();
export const bottomRef = React.createRef();

const MainTabs = ({ route }) => {
  const tabBar = useCallback(
    (props) => <TabBarBottom ref={bottomRef} {...props} />,
    [],
  );
  return (
    <MainTab.Navigator
      initialParams={Routes.homeScreen}
      tabBar={tabBar}
      screenOptions={{
        tabBarStyle: {
          margin: 20,
          position: 'absolute',
          backgroundColor: 'transparent', // made bottom tabbar transparent
        },
      }}
    >
      <MainTab.Screen
        initialRouteName={route.params}
        name={Routes.homeScreen}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Project",
        }}
      />
      <MainTab.Screen
        initialRouteName={route.params}
        name={Routes.libraryScreen}
        component={LibraryScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Library",
        }}
      />
    </MainTab.Navigator>
  );
};
export default MainTabs;
