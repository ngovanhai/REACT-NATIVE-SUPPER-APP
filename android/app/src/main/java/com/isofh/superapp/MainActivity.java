package com.isofh.superapp;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  public static String shortcutId;

  @Override
  protected void onCreate(Bundle savedInstance) {
    // super.onCreate(savedInstance);
    super.onCreate(null);
    // Kiểm tra xem activity có được khởi tạo từ shortcut không
    // if (
    //   getIntent() != null &&
    //   getIntent().getAction() != null &&
    //   getIntent().getAction().equals(Intent.ACTION_MAIN)
    // ) {
    //   // Trích xuất dữ liệu từ Intent
    //   shortcutId = getIntent().getStringExtra("shortcutId");
    // }
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "APP";
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
      this,
      getMainComponentName(),
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
      // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
      DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
    ) {
      @Override
      protected Bundle getLaunchOptions() {
        Bundle initialProperties = new Bundle();
         if (
           getIntent() != null &&
           getIntent().getAction() != null &&
           getIntent().getAction().equals(Intent.ACTION_MAIN)
         ) {
           String shortcutId = getIntent().getStringExtra("shortcutId");
           initialProperties.putString("appId", shortcutId);
         }
        return initialProperties;
      }
    };
  }
}
