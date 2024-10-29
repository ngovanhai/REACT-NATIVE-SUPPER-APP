import React, { useCallback, useEffect } from 'react';
import {
  Dimensions,
  StatusBar, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScaledImage from 'mainam-react-native-scaleimage'
import * as Animatable from 'react-native-animatable';
import { Routes } from '@resources';
import { Appearance } from 'react-native';
import { IMG } from '@images';
import { Spacing } from '@resources';
import { useRoute } from '@react-navigation/native';
import { openApp } from '../../utils/app-utils';
const DEVICE_WIDTH = Dimensions.get("window").width;

const MyScaleImage = Animatable.createAnimatableComponent(ScaledImage);

const SplashScreen = ({
  navigation
}) => {
  const { auth } = useSelector(state => state.auth);
  const { inited } = useSelector(state => state.application);
  const route = useRoute();
  const { auth: { logout } } = useDispatch();
  const params = route.params || {};
  const { appId } = params;

  useEffect(() => {
    if (appId) {
      const timeout = setTimeout(() => {
        console.log(appId);
        openApp({ appId: appId, devMode: false });
      }, 3000);
    }
  }, [appId])

  if (appId)
    return null;


  useEffect(() => {
    if (!inited)
      return;
    const timeout = setTimeout(() => {
      // if (!auth)
      //   logout();
      // else {
      //   if (route.name == Routes.splashScreen) {
      return navigation.replace(Routes.tabs);
      // }
      // }
    }, 3000);
    Appearance.setColorScheme('light');
    return () => {
      clearTimeout(timeout);
    }
  }, [inited, auth, route])

  return (
    <View
      style={{ flex: 1, backgroundColor: '#000', position: 'relative', display: "flex", alignItems: 'center', justifyContent: 'center' }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ScaledImage source={IMG.BgHeader} width={DEVICE_WIDTH} style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <ScaledImage source={IMG.BgFooter} width={DEVICE_WIDTH} style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
      <MyScaleImage
        animation="bounceInLeft"
        delay={500}
        duration={3000}
        source={(
          IMG.IsofHLogo
        )}
        width={120}
      />
      <MyScaleImage
        animation="bounceInRight"
        delay={500}
        duration={3000}
        source={(
          IMG.IsofHSlogan
        )}
        style={{ marginTop: Spacing.p10 }}
        width={120}
      />
    </View>
  )
}

export default SplashScreen;