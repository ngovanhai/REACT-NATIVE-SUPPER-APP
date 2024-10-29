import React, {
  memo,
  Fragment,
  forwardRef,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Routes, Colors, Fonts } from '@resources';
import { SVG } from "@images";
import ScaleImage from 'mainam-react-native-scaleimage';
import { IMG } from '@images';

const TabBarBottom = forwardRef(({ state, navigation, descriptors }, ref) => {

  return (
    <Fragment>
      <View style={styles.root}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const onPress = () => {
            if (!isFocused) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          let children;
          switch (route.name) {
            case Routes.homeScreen:
              children = <SVG.IcTrangChu color={isFocused ? Colors.tab_active_color : Colors.tab_inactive_color} />
              break;
            case Routes.libraryScreen:
              children = <SVG.IcLibrary color={isFocused ? Colors.tab_active_color : Colors.tab_inactive_color} />
              break;
            default:
              children = <Fragment />;
              break;
          }

          return (<Fragment key={route.key}
          >
            <TouchableOpacity
              key={route.key}
              style={styles.viewIcon}
              onPress={onPress}
            >
              {children}
              <Text
                style={[
                  styles.textTitle,
                ]}
              >
                {options?.tabBarLabel}
              </Text>
            </TouchableOpacity>
            {
              index == 0 && <ScaleImage source={IMG.IviLogo} width={60} style={{ marginTop: -12, marginHorizontal: 20 }} />
            }
          </Fragment>
          );

        })}
      </View>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    backgroundColor: "#000",
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: -10
  },
  viewIcon: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 2,
    minHeight: 60,
    marginVertical: 8,
  },
  textTitle: {
    ...Fonts.font11w400,
    color: Colors.white,
    marginTop: 7,
    textAlign: 'center',
  },
});

export default memo(TabBarBottom);
