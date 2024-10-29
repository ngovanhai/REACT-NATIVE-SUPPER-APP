import cacheUtils from '@utils/cache-utils';
import { CACHE_KEY } from '../resources/strings';
import { NativeModules } from 'react-native';
const { ConnectNativeModule } = NativeModules;
import messageUtils from '@utils/message-utils';
import { hideLoading, showLoading } from '..';

export const openApp = async (option) => {
    showLoading();
    try {
        let { appId, devMode, app } = option;
        if (!app) {
            const listApp = await cacheUtils.read("", CACHE_KEY.LIST_APP, []);
            app = listApp.find(item => item.appId == appId);
        }
        if (app) {
            app.bundleUrl = (app.bundleUrl || "").replace("&dev=true", "&dev=false")
            // nếu là dev mode thì sử dụng trực tiếp url file bundle, với ios thì load trực tiếp
            // với android thì sẽ tải bundle về rồi load
            if (devMode) {
                ConnectNativeModule?.openApp(
                    app.bundleName,
                    null, //bundleFile
                    app.bundleUrl,// 
                    {
                        "appType": "miniapp"
                        // text: input,
                    },
                    true,
                    (arr) => {
                        messageUtils.error(JSON.stringify(arr));
                    },
                );
            } else {
                // nếu không phải là dev mode thì sẽ check xem đã tải file bundle về chưa
                const bundleFile = ConnectNativeModule?.getBundleFile(
                    app.appId
                );
                //nếu có file bundle rồi  thì mở app
                if (bundleFile) {
                    await ConnectNativeModule?.openApp(
                        app.bundleName,
                        bundleFile, //bundleFile
                        "",// 
                        {
                            "appType": "miniapp"
                        },
                        false,
                        () => {
                            messageUtils.error(JSON.stringify(arr));
                        },
                    );
                } else {
                    // ngược lại thì tiến hành tải bundle về
                    const bundleFile = await ConnectNativeModule?.downloadBundle(
                        app.appId, //asset path
                        app.bundleUrl,
                        true
                    );
                    // nếu tải thành công thì mở app về
                    await ConnectNativeModule?.openApp(
                        app.bundleName,
                        bundleFile, //bundleFile
                        "",// 
                        {
                            "appType": "miniapp"
                        },
                        false,
                        () => {
                            messageUtils.error(JSON.stringify(arr));
                        },
                    );
                }
            }
        } else {
            messageUtils.error("Không có thông tin ứng dụng có appId " + appId);
        }
    } catch (error) {
        messageUtils.error(error?.message);
    } finally {
        hideLoading();
    }
}

export const downloadApp = (appId, isUpdate) => {
    return new Promise(async (resolve, reject) => {
        try {
            const listApp = await cacheUtils.read("", CACHE_KEY.LIST_APP, []);
            const app = listApp.find(item => item.appId == appId);
            if (app) {
                app.bundleUrl = (app.bundleUrl || "").replace("&dev=true", "")
                messageUtils.success("Đang tiến hành tải app " + app.appName);
                const s = await ConnectNativeModule?.downloadBundle(
                    app.appId, //asset path
                    app.bundleUrl,
                    isUpdate
                );
                app.updatedDate = new Date().toString();
                await cacheUtils.save("", CACHE_KEY.LIST_APP, listApp);
                setTimeout(() => {
                    messageUtils.success(isUpdate ? `Cập nhật app ${app.appName} thành công` : `Download app ${app.appName} thành công`)
                }, 500);
                resolve(listApp);
            } else {
                messageUtils.error("Không có thông tin ứng dụng có appId " + appId);
                reject()
            }
        } catch (error) {
            messageUtils.error(error?.message);
            reject(error);
        }
    });
}
