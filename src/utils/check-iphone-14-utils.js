import { Dimensions, Platform, StatusBar } from 'react-native';
const iphone14Screen = {
  basic: 844,
  pro: 852,
  plus: 926,
  max: 932,
};

export const isIphone14 = () => {
  const dimen = Dimensions.get('screen');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimen.height === iphone14Screen['basic'] ||
      dimen.height === iphone14Screen['max'] ||
      dimen.height === iphone14Screen['plus'] ||
      dimen.height === iphone14Screen['pro'])
  );
};

export const ifIPhone14 = (iphone14Style, regularStyle) => {
  return isIphone14() ? iphone14Style : regularStyle;
};
export const getStatusBarHeightDynamicIsland = (safe = true) => {
  return Platform.select({
    ios: ifIPhone14(safe ? 59 : 44, 34),
    android: StatusBar.currentHeight,
    default: 0,
  });
};
export function getBottomSpace14() {
  return isIphone14() ? 34 : 0;
}
