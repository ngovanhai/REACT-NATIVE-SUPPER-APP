import React, { useEffect, useRef, useState } from 'react'
import ActivityPanel from '../../components/ActivityPanel'
import Box from './Box';
import { Button } from '../../components';
import { FlatList, NativeModules, Platform, Text, TextInput, TouchableOpacity, View, Linking } from 'react-native';
import { Colors, Routes, Spacing } from '../../resources';
import { SVG } from '../../resources/images';
import dateUtils from 'mainam-react-native-date-utils';
import messageUtils from '@utils/message-utils';
import ProjectItem from './ProjectItem';
import ActionSheet from '../../components/ActionSheet';
// import Shortcuts, { ShortcutItem } from 'react-native-actions-shortcuts';
import cacheUtils from '@utils/cache-utils';
import { CACHE_KEY } from '@strings';
import NavigationService from '../../navigators/NavigationService';
import { downloadApp, openApp } from '../../utils/app-utils';
import { hideLoading, showLoading } from '../..';
import RNFetchBlob from 'rn-fetch-blob';
const { ConnectNativeModule } = NativeModules;


export default function HomeScreen({ route, ...props }) {
    const params = route.params || {};
    const { appId } = params;

    // const [shortcutItems, setShortcutItems] = useState([]);
    const [state, _setState] = useState({ listApp: [], appId: "", bundleUrl: "" });
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };
    // useEffect(() => {
    //     (async () => {
    //         console.log("xxx");
    //         const shortcutItem = await Shortcuts.getInitialShortcut();
    //         console.log("xxx2", shortcutItem);

    //         if (shortcutItem) {
    //             Alert.alert(JSON.stringify(shortcutItem));
    //             // Xử lý shortcut ban đầu
    //         }
    //     })();
    // }, []);


    useEffect(() => {
        // cacheUtils.read("", CACHE_KEY.ACTION_SHORTCUT, []).then(s => {
        //     setShortcutItems(s);
        // })

        cacheUtils.read("", CACHE_KEY.LIST_APP, []).then(s => {
            setState({ listApp: s })
        })
        cacheUtils.read("", CACHE_KEY.BUNDLE_INFO, {}).then(s => {
            setState({ appKey: s.appKey, bundleUrl: s.bundleUrl })
        })

        // const ShortcutsEmitter = new NativeEventEmitter(Shortcuts);

        // // // 1. define the listener
        // function handleShortcut(item) {
        //     const { type, data } = item;
        //     console.log(type, data);
        //     // your handling logic
        // };

        // // 2. add the listener in a `useEffect` hook or `componentDidMount`
        // ShortcutsEmitter.addListener("onShortcutItemPressed", handleShortcut);

        // // 3. remove the listener in a `useEffect` hook or `componentWillUnmount`
        // return () => {
        //     ShortcutsEmitter.removeAllListener("onShortcutItemPressed");
        // }

    }, [])

    const refActionProject = useRef();
    const onScanBundle = () => {
        NavigationService.navigate(Routes.scannerScreen, {
            onScan: data => {
                let json = null;
                try {
                    json = JSON.parse(data);
                    if (!json.bundleName && !json[Platform.OS == "android" ? "bundleAndroid" : "bundleIOS"]) {
                        messageUtils.error(`QR code không hợp lệ`)
                        return;
                    }
                } catch (error) {
                    messageUtils.success(`Đã để mặc định Main component name là '${state.appKey || "APP"}'`)
                    json = {
                        appId: state.appKey || "APP",
                        [Platform.OS == "android" ? "bundleAndroid" : "bundleIOS"]: data
                    }
                }
                let bundleUrl = Platform.OS == "android" ? json.bundleAndroid : json.bundleIOS;
                if (bundleUrl.indexOf("platform=" + (Platform.OS == "android" ? "ios" : "android")) >= 0) {
                    messageUtils.error(`Bundle không dành cho ứng dụng ` + Platform.OS);
                    return;
                }
                setState({
                    bundleUrl: bundleUrl,
                    appKey: json.bundleName
                })
            }
        })
    }
    const onScanProject = () => {
        NavigationService.navigate(Routes.scannerScreen, {
            onScan: data => {
                let json = null;
                try {
                    json = JSON.parse(data);
                    if (!json.appId && !json[Platform.OS == "android" ? "bundleAndroid" : "bundleIOS"] && !json.appName && !json.bundleName) {
                        messageUtils.error(`QR code không hợp lệ`)
                        return;
                    }
                } catch (error) {
                    messageUtils.error(`QR code không hợp lệ`)
                    return;
                }
                let bundleUrl = (Platform.OS == "android") ? json.bundleAndroid : json.bundleIOS;
                if (bundleUrl.indexOf("platform=" + (Platform.OS == "android" ? "ios" : "android")) >= 0) {
                    messageUtils.error(`Bundle không dành cho ứng dụng ` + Platform.OS);
                    return;
                }
                const listApp = [...state.listApp, {
                    bundleName: json.bundleName,
                    appName: json.appName,
                    appId: json.appId,
                    bundleUrl: bundleUrl,
                    updatedDate: new Date().toString(),
                    appIcon: json.appIcon || "https://cdn.icon-icons.com/icons2/2415/PNG/512/react_original_wordmark_logo_icon_146375.png"
                }];
                // const listApp = [...state.listApp, {
                //     bundleName: "APP",
                //     appName: "ISOFH APP ĐI BUỒNG DHY",
                //     appId: "com.isofh.appdibuong.dhy",
                //     bundleUrl: "https://api-mini.isofh.com/api/app/files/com.isofh.appdibuong.dhy/ios.zip",
                //     updatedDate: new Date().toString(),
                //     appIcon: "https://api-mini.isofh.com/api/app/files/com.isofh.appdibuong.dhy/logo/logo.png"
                // }, {
                //     bundleName: "APP",
                //     appName: "ISOFH HRM",
                //     appId: "com.isofh.hrm",
                //     bundleUrl: "https://api-mini.isofh.com/api/app/files/com.isofh.hrm/ios.zip",
                //     updatedDate: new Date().toString(),
                //     appIcon: "https://api-mini.isofh.com/api/app/files/com.isofh.hrm/logo/logo.png"
                // }];
                setState({ listApp })
                cacheUtils.save("", CACHE_KEY.LIST_APP, listApp)
            }
        })
    }
    const PROJECT_ACTION = [
        "Cập nhật",
        "Thêm vào màn hình chính",
        // "Thêm shortcut action",
        // "Xoá shortcut action",
        "Xoá ứng dụng",
        "Huỷ"
    ]
    const onShowAction = (item) => () => {
        refActionProject.current.show(async (action) => {
            switch (action) {
                case "Cập nhật":
                    showLoading();
                    downloadApp(item.appId, true).then(listApp => {
                        setState({ listApp: listApp })
                    }).finally(() => {
                        hideLoading();
                    });
                    break;
                case "Thêm vào màn hình chính":
                    if (Platform.OS == "android") {
                        let appIcon = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
                        try {
                            const response = await RNFetchBlob.fetch('GET', item.appIcon);
                            appIcon = response.base64();
                        } catch (error) {
                            console.log(error);
                        }
                        ConnectNativeModule.addShortcutToHomeScreen(item.appId, appIcon, item.appName);
                    } else {
                        Linking.openURL(`https://mini.isofh.com/shortcut.html?appId=${item.appId}&appName=${item.appName}&appIcon=${item.appIcon}`)
                    }
                    break;
                // case "Xoá shortcut action":
                //     const shortcuts = await Shortcuts.setShortcuts(shortcutItems.filter(item2 => item2.data?.appId != item.appId));
                //     setShortcutItems(shortcuts);
                //     messageUtils.success("Đã xoá shortcut action");
                //     cacheUtils.save("", CACHE_KEY.ACTION_SHORTCUT, shortcuts)
                //     break;
                // case "Thêm shortcut action":
                //     setShortcuts(item.appName, item.appId);
                //     break;
                case "Xoá ứng dụng":
                    const listApp = state.listApp.filter(item2 => item2.appId != item.appId);
                    if (ConnectNativeModule.deleteBundleFile(item.appId)) {
                        console.log("Xoá file bundle thành công");
                    }
                    setState({ listApp });
                    cacheUtils.save("", CACHE_KEY.LIST_APP, listApp);
                    break;
            }
        })
    }
    // const setShortcuts = useCallback(async (appName, appId) => {
    //     if (shortcutItems.find(item => item.data?.appId == appId)) {
    //         messageUtils.error("App đã được thêm action shortcut");
    //         return;
    //     }
    //     const shortcuts = await Shortcuts.setShortcuts([
    //         ...shortcutItems,
    //         {
    //             type: 'open.app' + appId,
    //             title: "Mở app: " + (appName),
    //             iconName: 'ic_launcher',
    //             data: {
    //                 appId: appId,
    //             },
    //         },
    //     ]);
    //     cacheUtils.save("", CACHE_KEY.ACTION_SHORTCUT, shortcuts);
    //     setShortcutItems(shortcuts);
    //     messageUtils.success("Thêm thành công")
    // }, [setShortcutItems, shortcutItems]);

    const onRunDev = () => {
        if (!state.appKey) {
            messageUtils.error("Vui lòng nhập \"Main component name\"")
            return;
        }
        if (!state.bundleUrl) {
            messageUtils.error("Vui lòng nhập địa chỉ \"Bundle file\"")
            return;
        }
        cacheUtils.save("", CACHE_KEY.BUNDLE_INFO, { appKey: state.appKey, bundleUrl: state.bundleUrl })
        openApp({
            appId: "com.isofh.dev", devMode: true, app: {
                bundleUrl: state.bundleUrl,
                bundleName: state.appKey
            }
        })
    }

    return (
        <ActivityPanel title={"ISOFH DEVELOPMENT TOOL"}>
            <View style={{ flex: 1 }}>
                <Box title={"Development server"} style={{ height: 220 }} rightAction={<View>
                    <TouchableOpacity onPress={onScanBundle} s><SVG.IcQrCode color={Colors.white} /></TouchableOpacity>
                </View>}>
                    <Text style={{ color: Colors.white, fontSize: 13, fontWeight: 'bold', marginBottom: Spacing.p5 }}>Main Component Name:</Text>
                    <View style={{ borderRadius: 3, overflow: 'hidden', marginBottom: Spacing.p5, borderWidth: 1, borderColor: Colors.borderColor, padding: Spacing.p5, flex: 1, justifyContent: 'center' }}>
                        <TextInput value={state.appKey} onChangeText={(e) => {
                            setState({ appKey: e })
                        }} style={{ padding: 0, color: Colors.white }} placeholder='Main component name'></TextInput>
                    </View>
                    <Text style={{ color: Colors.white, fontSize: 13, fontWeight: 'bold', marginBottom: Spacing.p5 }}>Bundle file:</Text>
                    <View style={{ borderRadius: 3, overflow: 'hidden', marginBottom: Spacing.p5, borderWidth: 1, borderColor: Colors.borderColor, padding: Spacing.p5, flex: 1, justifyContent: 'center' }}>
                        <TextInput value={state.bundleUrl} onChangeText={(e) => {
                            setState({ bundleUrl: e })
                        }} style={{ padding: 0, color: Colors.white }} placeholder='Nhập địa chỉ hoặc scan qr bundle'></TextInput>
                    </View>
                    <Button title={"Run"} onPress={onRunDev} buttonStyle={{ height: 40, padding: 0, justifyContent: 'center' }}></Button>
                </Box>
                <Box style={{ flex: 1, overflow: 'hidden' }} title={"Project"} rightAction={<View>
                    <TouchableOpacity onPress={onScanProject}><SVG.IcQrCode color={Colors.white} /></TouchableOpacity>
                </View>}>
                    <FlatList data={state.listApp}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return <ProjectItem item={item} onShowAction={onShowAction} />
                        }}
                        keyExtractor={(item, index) => String(index)}
                    />
                </Box>
            </View >
            <ActionSheet
                ref={refActionProject}
                dismissAction={PROJECT_ACTION.length - 1}
                actions={
                    PROJECT_ACTION
                }
            >
            </ActionSheet>

        </ActivityPanel >
    )
}


// import React, { useRef } from 'react';
// import { View, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';

// const App = () => {
//   const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
//   const viewRef = useRef(null);

//   const pan = useRef(new Animated.ValueXY()).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (event, gesture) => {
//         const { moveX, moveY } = gesture;

//         // Kiểm tra xem view có vượt ra khỏi ranh giới của màn hình không
//         const newX = Math.min(Math.max(moveX, 0), screenWidth - 100);
//         const newY = Math.min(Math.max(moveY, 0), screenHeight - 100);

//         pan.setValue({ x: newX, y: newY });
//       },
//       onPanResponderRelease: () => {
//         // Xử lý các hành động khi thả view ở đây nếu cần
//       },
//     })
//   ).current;

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         ref={viewRef}
//         style={[pan.getLayout(), styles.box]}
//         {...panResponder.panHandlers}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   box: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'red',
//     borderRadius: 5,
//   },
// });

// export default App;


// import React, { useState } from 'react';
// import { View, PanResponder, StyleSheet, Dimensions } from 'react-native';

// const CircleMoveApp = () => {
//     const [circleStyles, setCircleStyles] = useState({
//         backgroundColor: 'red',
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         position: 'absolute',
//         top: 0,
//         left: 0
//     });

//     const windowWidth = Dimensions.get('window').width;

//     const panResponder = PanResponder.create({
//         onStartShouldSetPanResponder: () => true,
//         onPanResponderMove: (event, gesture) => {
//             setCircleStyles({
//                 ...circleStyles,
//                 top: gesture.moveY - 25, // Trừ đi nửa chiều cao và rộng để căn giữa
//                 left: gesture.moveX - 25
//             });
//         },
//         onPanResponderRelease: (event, gesture) => {
//             let newLeft = gesture.moveX - 25;

//             // Xác định cạnh gần nhất
//             const edgeX = newLeft < windowWidth / 2 ? 0 : windowWidth - 50;

//             // Di chuyển về mép cạnh gần nhất
//             setCircleStyles({
//                 ...circleStyles,
//                 left: windowWidth - 50
//             });
//         }
//     });

//     return (
//         <View style={styles.container}>
//             <View
//                 style={circleStyles}
//                 {...panResponder.panHandlers}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default CircleMoveApp;