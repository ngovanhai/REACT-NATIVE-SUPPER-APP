import React, { useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, Fonts, Spacing } from '@resources';
import codePushUtils from '@utils/codepush-utils';
import DeviceInfo from 'react-native-device-info';

function HomeDrawer(props) {
  const onUpdate = () => {
    codePushUtils.checkUpdate();
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 50 }}>
      {/* <View style={{ flex: 1 }}>
        {menus.map((item, index) => {
          if (item.active)
            return <TouchableOpacity icon key={index}
              onPress={() => {
                props.navigation.closeDrawer();
                switch (item?.lable) {
                  default:
                    {
                      NavigationService.navigate(item.component, { ...item.params });
                      break;
                    }
                }
              }}
              style={{
                flexDirection: 'row', margin: 15,
                alignItems: 'center',
              }}>
              {item.icon}
              <Text style={{ color: colors.item_account_screen_label_color }}>{item.lable}</Text>
            </TouchableOpacity>
        })}
      </View> */}
      <View style={[styles.containHotline, styles.viewMarginTop]}>
        <Text style={styles.hotline}>Phiên bản {DeviceInfo.getVersion()}</Text>
        <TouchableOpacity onPress={onUpdate}>
          <Text style={[styles.hotline, styles.txtHilight]}>
            Cập nhật
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containHotline: {
    marginVertical: Spacing.p30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.height24,
  },
  hotline: {
    ...Fonts.font14w400,
    color: Colors.grey,
  },
  txtHilight: { textDecorationLine: 'underline', color: Colors.blue, marginLeft: Spacing.p5 },



});

export default HomeDrawer;
