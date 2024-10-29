package com.isofh.miniapp;

import com.facebook.react.devsupport.DevInternalSettings;
import com.facebook.react.devsupport.DevServerHelper;
import com.facebook.react.devsupport.InspectorPackagerConnection;

public class CustomDevServerHelper extends DevServerHelper {
    public CustomDevServerHelper(DevInternalSettings settings, String packageName, InspectorPackagerConnection.BundleStatusProvider bundleStatusProvider) {
        super(settings, packageName, bundleStatusProvider);
    }
//
//    private final String mJSBundleURLForRemote;
//
//    public CustomDevServerHelper(Context context, String packagerPathForRemote) {
//        super(context);
//        mJSBundleURLForRemote = packagerPathForRemote;
//    }
//
//
//    @Override
//    public void downloadBundleFromURL(DevBundleDownloadListener callback) {
//        // Implement logic to download bundle from remote URL
//        // This can be done using a networking library like OkHttp
//        // Here's a simplified example using OkHttp
//        OkHttpClient client = new OkHttpClient();
//        Request request = new Request.Builder()
//                .url(mJSBundleURLForRemote)
//                .build();
//
//        client.newCall(request).enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                callback.onFailure(e);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                if (response.isSuccessful()) {
//                    byte[] bundle = response.body().bytes();
//                    callback.onSuccess(bundle);
//                } else {
//                    callback.onFailure(new IOException("Failed to download bundle"));
//                }
//            }
//        });
//    }
}
