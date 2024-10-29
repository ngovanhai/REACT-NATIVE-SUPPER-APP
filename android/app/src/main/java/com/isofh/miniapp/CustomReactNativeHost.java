package com.isofh.miniapp;

import android.app.Activity;
import android.app.Application;

import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.PackageList;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactInstanceManagerBuilder;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JSBundleLoader;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.devsupport.DevServerHelper;
import com.facebook.react.shell.MainReactPackage;

import java.util.ArrayList;
import java.util.List;

public class CustomReactNativeHost extends ReactNativeHost {
    private final Activity activity;

    protected CustomReactNativeHost(Application application, Activity activity) {
        super(application);
        this.activity= activity;
    }
    // Implement necessary constructors

    @Override
    protected ReactInstanceManager createReactInstanceManager() {
        ReactInstanceManagerBuilder builder = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setCurrentActivity(this.activity)
//                .setJSMainModulePath("index")
//                .setBundleAssetName("")
//                .setJSBundleLoader(JSBundleLoader.createRemoteDebuggerBundleLoader(createRemoteDebuggerBundleLoader"http://192.168.1.7:8082/index.bundle?platform=android&dev=true&minify=false",""))
                .addPackages(getPackages())
                .setBundleAssetName(null)
                .setJavaScriptExecutorFactory(new HermesExecutorFactory())
                .setJSBundleFile(getJSBundleFile())
                // Add any additional packages or configurations needed
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .setUseDeveloperSupport(true);
        ReactInstanceManager x = builder.build();
                //.downloadBundleResourceFromUrlSync("","");
        return x;
    }

    @Override
    protected String getJSBundleFile() {
        return "http://10.0.50.33:8082/index.bundle?platform=android&dev=true&minify=false";
    }

    @Override
    public boolean getUseDeveloperSupport() {
        return true;
    }

    @Override
    protected List<ReactPackage> getPackages() {
        ArrayList<ReactPackage> packages = new PackageList(this.getApplication()).getPackages();
        // Packages that cannot be autolinked yet can be added manually here, for example:
        packages.add(new ConnectNativePackage());
        return packages;
    }
}