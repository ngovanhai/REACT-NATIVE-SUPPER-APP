import React from 'react'
import ActivityPanel from '../../components/ActivityPanel'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { dependencies } from '../../../package.json'
import { Colors, Fonts, Spacing } from '../../resources';
import DeviceInfo from 'react-native-device-info';
import codePushUtils from '@utils/codepush-utils';

export default function LibraryScreen() {
    const packageData = Object.entries(dependencies).map(([name, version]) => ({
        name,
        version,
    })).filter(item => {
        return ![
            "react-native-modal",
            "react-native-calendars",
            "axios",
            "lodash",
            "mainam-react-native-date-utils",
            "mainam-react-native-scaleimage",
            "mainam-react-native-string-utils",
            "mainam-react-native-image-utils",
            "react-native-actionsheet",
            "react-native-animatable",
            "patch-package",
            "postinstall-postinstall",
            "react-native-flash-message",
            "react-native-wheel-picker-android",
            "react-redux",
            "redux",
            "redux-thunk",
            "retry-axios"
        ].includes(item.name)
    });

    const renderPackageItem = ({ item }) => (
        <View style={{ padding: 10 }}>
            <Text style={{ color: Colors.white }}>➜ {`${item.name}: ${item.version}`}</Text>
        </View>
    );
    const renderSeparator = () => <View style={styles.separator} />;
    const onUpdate = () => {
        codePushUtils.checkUpdate();
    }
    return (
        <ActivityPanel title={"ISOFH DEVELOPMENT TOOL"}>
            <View style={{ margin: Spacing.p10, minHeight: 100, borderWidth: 1, borderRadius: 10, borderColor: "#aca", justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}><Text style={{ color: Colors.white }}>App verion {DeviceInfo.getVersion()}</Text>
                    <TouchableOpacity onPress={onUpdate}>
                        <Text style={[styles.hotline, styles.txtHilight]}>
                            Cập nhật
                        </Text>
                    </TouchableOpacity></View>
                <Text style={{ color: Colors.white, padding: Spacing.p5, ...Fonts.font12w400, fontStyle: 'italic' }}>
                    Dưới đây là danh sách các package đã được cài đặt trên ứng dụng. Các miniapp khi sử dụng cần install các package có version tương đương để tránh xung đột
                </Text>
            </View>
            <FlatList data={packageData}
                showsVerticalScrollIndicator={false}
                renderItem={renderPackageItem}
                keyExtractor={(item, index) => String(index)}
                ItemSeparatorComponent={renderSeparator}
            />
        </ActivityPanel>
    )
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 3,
        marginLeft: 25,
        height: 1, // Độ rộng của đường viền
        backgroundColor: '#ccc', // Màu sắc của đường viền
    },
    hotline: {
        ...Fonts.font14w400,
        color: Colors.grey,
    },

    txtHilight: { textDecorationLine: 'underline', color: Colors.blue, marginLeft: Spacing.p5 },

});