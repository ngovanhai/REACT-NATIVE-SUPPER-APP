import React from "react";
import { Routes } from "@resources";
import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import MainTabs from "./MainTabs";
import HomeDrawer from "@components/HomeDrawer";

const MainDrawer = ({ route }) => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      initialParams={Routes.mainTab}
      screenOptions={{
        drawerType: 'front',
        headerShown: false,
        headerMode: 'screen',
        navigationOptions: ({ navigation }) => ({
          gesturesEnabled: false,
          swipeEnabled: false,
          drawerLockMode: 'locked-closed'
        }),
        overlayColor: '#00000020',
        drawerBackgroundColor: 'transparent', // or 'rgba(0,0,0,0)'
        drawerPosition: 'left',
    
      }}
      drawerContent={(props) => <HomeDrawer {...props} />}
    >
      <Drawer.Screen
        initialRouteName={route.params}
        name={Routes.mainTab}
        component={MainTabs}
      />
    </Drawer.Navigator >
  );
};
export default MainDrawer;
