import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Spacing } from '../../../resources';
import { SVG } from '../../../resources/images';
import ScaledImage from 'mainam-react-native-scaleimage';
import { openApp } from '../../../utils/app-utils';

export default function ProjectItem({ item, onShowAction, ...props }) {
    const onOpenApp = () => {
        openApp({ appId: item.appId, devMode: false, app: item })
    }
    return <TouchableOpacity onPress={onOpenApp}>
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#303f9f", "#81c784"]}
            style={{ marginBottom: Spacing.p5, borderRadius: 3 }}
        >
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.p5 }}>
                <ScaledImage uri={item.appIcon} width={50} style={{ minWidth: 50 }} />
                <View style={{ flex: 1, marginHorizontal: Spacing.p5, height: 40, borderLeftColor: "#ACA", borderLeftWidth: 1, paddingLeft: Spacing.p5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ ...Fonts.font13w700, color: Colors.white, flex: 1 }}>{item.appName}</Text>
                        <TouchableOpacity style={{ width: 20, alignItems: 'center' }} onPress={onShowAction(item)}>
                            <SVG.IcOption color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ ...Fonts.font12w400, color: "#ACA", marginTop: Spacing.p10 }}>Ngày cập nhật: {item.updatedDate.toDateObject().format("dd/MM/yyyy HH:mm:ss")}</Text>
                </View>
            </View>
        </LinearGradient>
    </TouchableOpacity>
}
