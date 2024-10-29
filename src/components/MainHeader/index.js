import React, { memo } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import ScaleImage from "mainam-react-native-scaleimage";
import {
  Spacing,
  Fonts,
  Colors,
  shadow,
  ImageSize,
  Styles,
  Routes,
} from "@resources";
import NavigationService from "@navigators/NavigationService";
import { noop } from "lodash";
import { SVG, IMG } from "@images";

const MainHeader = ({
  leftIcon,
  rightIcon = <View />,
  showBackground,
  disableTitle,
  TitleComp = null,
  style,
  title,
  leftStyle,
  disableBack = false,
  leftAction = () => NavigationService.pop(),
  rightAction,
  isSearchBar = false,
  onChangeText,
  value,
  onSubmitEditing,
  placeholder,
  iconRightInput,
  tintColor = Colors.white,
  headerBottom,
}) => {
  const ViewWraper = showBackground ? ImageBackground : View;
  const LeftIcon = leftIcon ? LeftIconTemplate[leftIcon] : <View />;
  const RightIconSearch = () => {
    return (
      <TouchableOpacity style={styles.btnRight}>
        <ScaleImage
          source={iconRightInput}
          height={ImageSize.image12}
          style={[
            styles.iconRight,
            {
              tintColor: tintColor,
            },
          ]}
        />
      </TouchableOpacity>
    );
  };
  const onRightAction = () => {
    if (rightAction) {
      rightAction();
    } else {
      NavigationService.navigate(Routes.hsba);
    }
  };
  return (
    <ViewWraper style={[styles.header1]} source={IMG.BgHeader}>
      <View style={[styles.header, style]}>
        <TouchableOpacity
          onPress={disableBack ? noop : leftAction}
          style={[styles.left, leftStyle]}
        >
          {!disableBack && LeftIcon}
        </TouchableOpacity>
        {!disableTitle && TitleComp ? (
          TitleComp
        ) : (
          <Text style={styles.title}>{disableTitle ? "" : title}</Text>
        )}
        <TouchableOpacity
          // disabled={!rightIcon}
          onPress={onRightAction}
          style={styles.right}
        >
          {rightIcon}
        </TouchableOpacity>
      </View>
      {headerBottom}
    </ViewWraper>
  );
};

const styles = StyleSheet.create({
  container: { height: 89 },
  left: {
    position: "absolute",
    left: Spacing.padding,
    bottom: Spacing.padding,
    zIndex: 1,
    padding: Spacing.p5,
  },
  left2: {
    position: "absolute",
    bottom: Spacing.padding,
    zIndex: 2,
    padding: Spacing.bottom0,
    right: 55,
    left: 50,
  },
  right: {
    position: "absolute",
    right: Spacing.padding,
    bottom: Spacing.padding,
    zIndex: 2,
    padding: Spacing.p5,
  },
  header1: {
    alignItems: "center",
    backgroundColor: Colors.transparent,
    minHeight: 70,
    justifyContent: "flex-end",
  },
  header: {
    width: "100%",
    alignItems: "center",
    paddingVertical: Spacing.padding,
    backgroundColor: Colors.transparent,
    minHeight: 70,
    justifyContent: 'center',
  },
  backHead2: {
    paddingTop: 10,
    width: ImageSize.imageMedium,
    resizeMode: "contain",
    height: ImageSize.imageMedium,
  },
  ingore: {
    ...Fonts.font16bold,
    color: Colors.white,
  },
  iconRight: {},
  btnRight: {
    right: Spacing.p10,
  },
  title: {
    ...Fonts.font16w500,
    color: Colors.white,
  },
});
const LeftIconTemplate = {
  close: (
    <View>
      <Image style={styles.backHead2} source={IMG.IcClose} />
    </View>
  ),
  back: <SVG.IcBack></SVG.IcBack>,
  ignore: (
    <View>
      <Text style={styles.ingore}>Để sau</Text>
    </View>
  ),
};

export default memo(MainHeader);
