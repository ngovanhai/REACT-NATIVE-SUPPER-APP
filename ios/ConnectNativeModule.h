//
//  ConnectNativeModule.h
//  SuperApp
//
//  Created by Nguyen Trai on 26/04/2023.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeDelegate.h>

@interface ConnectNativeModule : RCTEventEmitter <RCTBridgeModule, RCTBridgeDelegate>

@end
