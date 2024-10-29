package com.isofh.miniapp;

import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.content.pm.ShortcutInfoCompat;
import androidx.core.content.pm.ShortcutManagerCompat;
import androidx.core.graphics.drawable.IconCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.isofh.superapp.MainActivity;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class ConnectNativeModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;
    private static final Map<String, ReactContext> _reactContexts = new HashMap<>();
    public static Callback _closeCallback = null;


    public ConnectNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }


    @ReactMethod
    public void openApp(String bundleName, String bundleFile, String bundleUrl, ReadableMap initProps,
                        boolean devLoad, Callback callback) throws MalformedURLException {
        Intent intent = new Intent(reactContext, MiniAppActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        Bundle bundle = new Bundle();
        bundle.putString("bundleName", bundleName);
        bundle.putBoolean("devLoad", devLoad);
        bundle.putBundle("initProps", Arguments.toBundle(initProps));
        if (devLoad) {
            File cacheFile = downloadBundle("com.isofh.dev", bundleUrl, true);
            if(cacheFile==null)
            {
                callback.invoke("Tải bundle không thành công");
                return;
            }
//            String content = FileUtils.readFromFile(reactContext, cacheFile);
//            URL url = new URL(bundleUrl);
//            String server = url.getProtocol() + "://" + url.getHost() + ":" + url.getPort();
//            content = content.replace("\"httpServerLocation\": \"/assets", "\"httpServerLocation\": \"" + server + "/assets");
//            File newFile = new File(cacheFile.getParentFile(), "android.bundle");
//            FileUtils.writeToFile(reactContext, newFile, content);
//            bundle.putString("bundleFile", newFile.getAbsolutePath());
            bundle.putString("bundleFile", cacheFile.getAbsolutePath());
        } else {
            bundle.putString("bundleFile", bundleFile);
        }
        intent.putExtras(bundle);
        reactContext.startActivity(intent);
        addBridge(bundleName);
        _closeCallback = callback;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getBundleFile(String appId) {

        File cacheDir = this.reactContext.getCacheDir();

        // Create a directory for the specific appId within the cache directory
        File appDir = new File(cacheDir, appId);
        if (!appDir.exists()) {
            appDir.mkdirs();
        }

        // Tạo file trong thư mục cache để lưu trữ file bundle
        File cacheFile = new File(appDir, "index.bundle");

        // Kiểm tra nếu file đã tồn tại, không cần tải lại
        if (cacheFile.exists()) {
            return cacheFile.getAbsolutePath();
        }
        return null;
    }


    @ReactMethod(isBlockingSynchronousMethod = true)
    public Boolean deleteBundleFile(String appId) {
        try {
            File cacheDir = this.reactContext.getCacheDir();
            // Create a directory for the specific appId within the cache directory
            File appDir = new File(cacheDir, appId);
            if (appDir.exists()) {
                // Tạo file trong thư mục cache để lưu trữ file bundle
                File cacheFile = new File(appDir, "index.bundle");
                // Kiểm tra nếu file đã tồn tại, không cần tải lại
                if (cacheFile.exists()) {
                    return cacheFile.delete();
                }
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @ReactMethod
    public void downloadBundle(String appId, String bundleUrl, Boolean isUpdate, Promise promise) {
        try {
            File cacheFile = downloadBundle(appId, bundleUrl, isUpdate);
            if (cacheFile != null && cacheFile.exists())
                promise.resolve(cacheFile.getAbsolutePath());
            else
                promise.reject(new Exception("Download bundle không thành công"));
        } catch (Exception e) {
            promise.reject(e);
        }
    }


    @ReactMethod
    public void addShortcutToHomeScreen(String id, String iconBase64, String shortName, Promise promise) {
        {
            byte[] iconData = Base64.decode(iconBase64, Base64.DEFAULT);
            if (ShortcutManagerCompat.isRequestPinShortcutSupported(reactContext)) {
                ShortcutInfoCompat shortcutInfo = new ShortcutInfoCompat.Builder(reactContext, id)
                        .setIntent(new Intent(reactContext, MainActivity.class).setAction(Intent.ACTION_MAIN).putExtra("shortcutId", id)) // !!! intent's action must be set on oreo
                        .setShortLabel(shortName)
//                        .setIcon(IconCompat.createWithResource(reactContext, R.drawable.ic_launcher))
                        .setIcon(IconCompat.createWithBitmap(BitmapFactory.decodeByteArray(iconData, 0, iconData.length)))
                        .build();
                ShortcutManagerCompat.requestPinShortcut(reactContext, shortcutInfo, null);
                promise.resolve(true);
            } else {
                promise.reject(new Throwable("Shortcut is not supported by your launcher"));
                // Shortcut is not supported by your launcher
            }
        }
    }

    @ReactMethod
    public String getShortcutId() {
        {
            return MainActivity.shortcutId;
        }
    }

    @ReactMethod
    public void sendMessage(String bundleName, ReadableMap msg, Callback callback) {
        ReactContext reactContext = _reactContexts.get(bundleName);
        WritableMap result = Arguments.createMap();
        if (reactContext != null) {
            WritableMap map = Arguments.createMap();
            map.merge(msg);
            pushEvent(reactContext, "EventMessage", map);
            result.putString("msg", "Send message ok!");
        } else {
            result.putString("msg", "Cannot find this bundle name " + bundleName);
        }
        callback.invoke(result);
    }


    @ReactMethod
    public void addBridge(String bundleName) {
        _reactContexts.put(bundleName, reactContext);
    }

    @ReactMethod
    public void closeApp(String bundleName) {
        if (_closeCallback == null) {
            return;
        }
        MiniAppActivity.close();
        _closeCallback = null;
        _reactContexts.remove(bundleName);
    }

    @ReactMethod
    public void getBundleNames(Promise promise) {
        if (_reactContexts.keySet().toArray() != null) {
            String[] bundleNames = Objects.requireNonNull(_reactContexts.keySet().toArray(new String[0]));
            WritableArray arrays = Arguments.fromArray(bundleNames);
            promise.resolve(arrays);
        } else {
            promise.reject(new Throwable("No listeners"));
        }
    }

    private void pushEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public String getName() {
        return "ConnectNativeModule";
    }

    private File downloadBundle(String appId, String urlStr, Boolean isUpdate) {
        try {
            // Get the cache directory of the ReactContext
            File cacheDir = this.reactContext.getCacheDir();

            // Create a directory for the specific appId within the cache directory
            File appDir = new File(cacheDir, appId);
            if (appDir.exists())
                appDir.delete();
            appDir.mkdirs();

            // Tạo file trong thư mục cache để lưu trữ file bundle
            File cacheFile = new File(appDir, "index.bundle");
            File cacheFileZip = new File(appDir, "android.zip");

            Boolean isZipFile = urlStr.endsWith(".zip");

            // Kiểm tra nếu file đã tồn tại, không cần tải lại
            if (cacheFile.exists() && !isUpdate) {
                return cacheFile;
            }

            URL url = new URL(urlStr);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

            // Mở kết nối đến URL và tạo InputStream để đọc dữ liệu
            InputStream inputStream = urlConnection.getInputStream();

            // Tạo FileOutputStream để ghi dữ liệu vào file trong thư mục cache
            FileOutputStream outputStream = new FileOutputStream(isZipFile ? cacheFileZip : cacheFile);

            // Đọc dữ liệu từ InputStream và ghi vào FileOutputStream
            byte[] buffer = new byte[1024];
            int len;
            while ((len = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, len);
            }

            // Đóng các luồng
            inputStream.close();
            outputStream.close();
            if (isZipFile) {
                if (UnzipUtil.unzipFile(reactContext, appId, cacheFileZip.getAbsolutePath(), appDir.getAbsolutePath()))
                    return cacheFile;
            }
            return cacheFile;
        } catch (Exception e) {
            Log.e("DownloadError", "Error downloading bundle: " + e.getMessage());
            return null;
        }
    }

}