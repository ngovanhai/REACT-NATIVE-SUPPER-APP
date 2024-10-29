package com.isofh.miniapp;

import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.PackageList;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

import java.util.ArrayList;

public class MiniAppActivity
        extends ReactActivity
        implements DefaultHardwareBackBtnHandler {

    private static MiniAppActivity mInstance;
    private String mMainComponentName;
    private static ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            Thread.setDefaultUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {
                @Override
                public void uncaughtException(@NonNull Thread thread, @NonNull Throwable throwable) {
                            Log.d("TAG", "uncaughtException: " + throwable.getMessage());
                }
            });
            mInstance = this;
            Bundle bundle = getIntent().getExtras();
            assert bundle != null;
            mMainComponentName = bundle.getString("bundleName", "");
            boolean devLoad = bundle.getBoolean("devLoad");
            String bundleFile = bundle.getString("bundleFile");
            Bundle initProps = bundle.getBundle("initProps");
            ReactRootView mReactRootView = new ReactRootView(this);
            mReactInstanceManager =
                    ReactInstanceManager
                            .builder()
                            .setApplication(getApplication())
                            .setJavaScriptExecutorFactory(new HermesExecutorFactory())
                            .setCurrentActivity(this)
                            .setJSBundleFile(bundleFile)
                            .setJSMainModulePath("index")
                            .addPackages(getPackages())
                            .setUseDeveloperSupport(false) //với android thì không để true ở đây được.
                            .setInitialLifecycleState(LifecycleState.RESUMED)
                            .build();
            mReactRootView.startReactApplication(
                    mReactInstanceManager,
                    mMainComponentName,
                    initProps
            );
            setContentView(mReactRootView);
        } catch (com.facebook.jni.CppException e) {
            if (ConnectNativeModule._closeCallback != null) {
                ConnectNativeModule._closeCallback.invoke(e.getMessage());
            }
            this.finish();
        } catch (Exception e) {
            if (ConnectNativeModule._closeCallback != null) {
                ConnectNativeModule._closeCallback.invoke(e.getMessage());
            }
            this.finish();
        }
    }

    public ArrayList<ReactPackage> getPackages() {
        ArrayList<ReactPackage> packages = new PackageList(this.getApplication()).getPackages();
        // Packages that cannot be autolinked yet can be added manually here, for example:
        packages.add(new ConnectNativePackage());
        return packages;
    }

    @Override
    protected String getMainComponentName() {
        return mMainComponentName;
    }

    public static void close() {
        if (mInstance != null) mInstance.finish();
        mInstance = null;
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }
}
