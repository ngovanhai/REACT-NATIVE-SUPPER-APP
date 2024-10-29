//
//  ConnectNativeModule.m
//  SuperApp
//
//  Created by Nguyen Trai on 26/04/2023.
//
#import "ConnectNativeModule.h"
#import "Promise.h"
#import <React/RCTRootView.h>
#import "SSZipArchive.h"
#import <React/RCTBridgeDelegate.h>

@implementation ConnectNativeModule

static NSMutableDictionary *emitters;
static NSMutableDictionary *promises;
static NSMutableDictionary *whiteList;

static UIViewController *vc;
static RCTResponseSenderBlock closeCallBack;

RCT_EXPORT_MODULE()

__attribute__((constructor)) static void initialize() {
  if (emitters == nil)
    emitters = [[NSMutableDictionary alloc] init];
  if (promises == nil)
    promises = [[NSMutableDictionary alloc] init];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[ @"EventMessage", @"EventRequest" ];
}
NSURL *jsCodeLocation;
RCT_EXPORT_METHOD(openApp
                  : (NSString *)bundleName bundleFile
                  : (NSString *)bundleFile bundleUrl
                  : (NSString *)bundleUrl initProps
                  : (NSDictionary *)initProps devLoad
                  : (BOOL)devLoad callback
                  : (RCTResponseSenderBlock)callback) {
  //    NSURL *jsCodeLocation;
  //    jsCodeLocation = [NSURL URLWithString:bundleUrl];

  dispatch_async(dispatch_get_main_queue(), ^{
    RCTRootView *rootView;
    if(devLoad)
    {
      jsCodeLocation = [NSURL URLWithString:bundleUrl];
      RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self
                                                launchOptions:nil];
      RCTLoadAndExecuteErrorBlock callbackError = ^(NSError *error) {
         NSLog(@"Error lỗi khi load bundle url: %@", error.localizedDescription);
            [self closeApp:bundleName];
            if(callback!=nil)
            {              
              NSArray* errArr = @[[@"Error lỗi khi load bundle url " stringByAppendingString:error.localizedDescription]];
              callback(errArr);
            }
         };
      
      [bridge setOnError:callbackError];
      rootView = [[RCTRootView alloc] initWithBridge:bridge
                                   moduleName:bundleName
                               initialProperties:initProps];
    }else{
      jsCodeLocation = [NSURL fileURLWithPath:bundleFile];
      rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:bundleName initialProperties:initProps launchOptions:nil];
    }
    
    
    vc = [[UIViewController alloc] init];
    [vc setModalPresentationStyle:UIModalPresentationFullScreen];
    [emitters setObject:self forKey:bundleName];
    vc.view = rootView;
    [[UIApplication sharedApplication].delegate.window.rootViewController
        presentViewController:vc
                     animated:YES
                   completion:nil];
    closeCallBack = callback;
  });
}

//nam.mn method override RCTBridgeDelegate được set cho bridge của load từ bundle.
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
  return jsCodeLocation;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getBundleFile
                  : (NSString *)appId) {
  @try {
    // Tạo đường dẫn đầy đủ của thư mục lưu trữ tệp
    NSString *documentsDirectory = [NSSearchPathForDirectoriesInDomains(
                                                                        NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
    NSString *folderPath =
    [documentsDirectory stringByAppendingPathComponent:appId];
    NSString *filePath =
    [folderPath stringByAppendingPathComponent:@"index.bundle"];
    
    // Kiểm tra xem tệp đã tồn tại hay chưa
    if([[NSFileManager defaultManager] fileExistsAtPath:filePath])
      return filePath;
    return nil;
  } @catch (NSException *exception) {
    NSString *error =
        [NSString stringWithFormat:@"Exception caught: %@", exception.reason];
    NSLog(error);
    return nil;
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(deleteBundleFile
                  : (NSString *)appId) {
  @try {
    // Tạo đường dẫn đầy đủ của thư mục lưu trữ tệp
  //TypeError: Cannot read property 'render' of undefined, js engine: hermes    
    NSString *documentsDirectory = [NSSearchPathForDirectoriesInDomains(
                                                                        NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
    NSString *folderPath = [documentsDirectory stringByAppendingPathComponent:appId];
    NSString *filePath =    [folderPath stringByAppendingPathComponent:@"index.bundle"];
    
    // Kiểm tra xem tệp đã tồn tại hay chưa
    if([[NSFileManager defaultManager] fileExistsAtPath:filePath]) {
      NSError *error;
      // Xóa tệp
      if([[NSFileManager defaultManager] removeItemAtPath:filePath error:&error]) {
        NSLog(@"File deleted successfully.");
        return @(YES);
      } else {
        NSLog(@"Error deleting file: %@", error.localizedDescription);
        return @(NO);
      }
    } else {
      NSLog(@"File does not exist at path: %@", filePath);
      return @(YES);
    }
  } @catch (NSException *exception) {
    NSString *error =
        [NSString stringWithFormat:@"Exception caught: %@", exception.reason];
    NSLog(error);
    return @(NO);
  }
}

RCT_EXPORT_METHOD(downloadBundle:(NSString *)appId
                  bundleUrl:(NSString *)bundleUrl
                  isUpdate: (BOOL)isUpdate
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        @try {
            if (bundleUrl != nil && ![bundleUrl isKindOfClass:[NSNull class]] && bundleUrl.length > 0) {
                // Tạo đường dẫn đầy đủ của thư mục lưu trữ tệp
                NSString *documentsDirectory = [NSSearchPathForDirectoriesInDomains(
                    NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
                NSString *folderPath = [documentsDirectory stringByAppendingPathComponent:appId];
                NSString *filePath = [folderPath stringByAppendingPathComponent:@"index.bundle"];

                // Kiểm tra xem thư mục đã tồn tại chưa, nếu chưa thì tạo mới
                if (![[NSFileManager defaultManager] fileExistsAtPath:folderPath]) {
                    [[NSFileManager defaultManager] createDirectoryAtPath:folderPath
                                              withIntermediateDirectories:YES
                                                               attributes:nil
                                                                    error:nil];
                }
                NSLog(@"%@", folderPath);
                NSLog(@"%@", filePath);
              

                // Check if the file already exists
                if ([[NSFileManager defaultManager] fileExistsAtPath:filePath]) {
                    if (isUpdate) {
//                        // If devLoad is true, remove the existing file and download again
//                        NSError *removeError;
//                        [[NSFileManager defaultManager] removeItemAtPath:filePath error:&removeError];
//                        if (removeError) {
//                            NSString *removeErrorMessage = [NSString stringWithFormat:@"Error removing existing bundle: %@", removeError.localizedDescription];
//                            NSLog(@"%@", removeErrorMessage);
//                            reject(@"REMOVE_ERROR", removeErrorMessage, nil);
//                            return;
//                        }
                    } else {
                        // If devLoad is false, resolve with the existing file path
                        resolve(filePath);
                        return;
                    }
                }
              
              if ([[NSFileManager defaultManager] fileExistsAtPath:folderPath]) {
                NSError *removeError;
                [[NSFileManager defaultManager] removeItemAtPath:folderPath error:&removeError];
              }
              [[NSFileManager defaultManager] createDirectoryAtPath:folderPath
                                              withIntermediateDirectories:YES
                                                               attributes:nil
                                                                    error:nil];
                // Start downloading the bundle
                NSURL *url = [NSURL URLWithString:bundleUrl];
                NSURLSession *session = [NSURLSession sharedSession];
                NSURLSessionDownloadTask *downloadTask = [session downloadTaskWithURL:url
                                                                       completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error) {
                  if (error) {
                          NSString *errorMessage = [NSString stringWithFormat:@"Error downloading bundle: %@", error.localizedDescription];
                          NSLog(@"%@", errorMessage);
                          reject(@"DOWNLOAD_ERROR", errorMessage, nil);
                  } else {
                      // Get suggested file name from the URL response
                      NSString *suggestedFileName = [response suggestedFilename];
                      NSString *downloadedFilePath = [folderPath stringByAppendingPathComponent:suggestedFileName];

                      // Move the downloaded file to the desired location
                      NSError *moveError;
                      [[NSFileManager defaultManager] moveItemAtURL:location
                                                              toURL:[NSURL fileURLWithPath:downloadedFilePath]
                                                              error:&moveError];

                      if (moveError) {
                          NSString *moveErrorMessage = [NSString stringWithFormat:@"Error moving bundle: %@", moveError.localizedDescription];
                          NSLog(@"%@", moveErrorMessage);
                          reject(@"MOVE_ERROR", moveErrorMessage, nil);
                      } else {
                          // Check if the file is a zip archive
                          NSString *fileExtension = [downloadedFilePath pathExtension];
                          if ([fileExtension isEqualToString:@"zip"]) {
                              // Unzip the downloaded file
                              NSString *unzipFolderPath = [downloadedFilePath stringByDeletingLastPathComponent];
                              NSError *unzipError;
                              [SSZipArchive unzipFileAtPath:downloadedFilePath toDestination:unzipFolderPath overwrite:YES password:nil error:&unzipError];
                              if (unzipError) {
                                  NSString *unzipErrorMessage = [NSString stringWithFormat:@"Error unzipping bundle: %@", unzipError.localizedDescription];
                                  NSLog(@"%@", unzipErrorMessage);
                                  reject(@"UNZIP_ERROR", unzipErrorMessage, nil);
                              } else {
                                  // Resolve with the path of index.bundle file
                                  NSString *indexBundlePath = [unzipFolderPath stringByAppendingPathComponent:@"index.bundle"];
                                if ([[NSFileManager defaultManager] fileExistsAtPath:indexBundlePath]) {
                                  NSLog(@"TRUE");
                                }else{
                                  NSLog(@"FALSE");
                                }
                                  resolve(indexBundlePath);
                              }
                          } else {
                              // Rename the file to index.bundle if it's not a zip file
                              NSString *indexBundlePath = [folderPath stringByAppendingPathComponent:@"index.bundle"];
                              NSError *renameError;
                              [[NSFileManager defaultManager] moveItemAtPath:downloadedFilePath toPath:indexBundlePath error:&renameError];
                              if (renameError) {
                                  NSString *renameErrorMessage = [NSString stringWithFormat:@"Error renaming bundle: %@", renameError.localizedDescription];
                                  NSLog(@"%@", renameErrorMessage);
                                  reject(@"RENAME_ERROR", renameErrorMessage, nil);
                              } else {
                                  resolve(indexBundlePath);
                              }
                          }
                      }
                  }
                }];

                [downloadTask resume];
            } else {
                // Xử lý khi bundleUrl là null hoặc rỗng
                NSString *error = @"Bundle URL is null or empty.";
                NSLog(@"%@", error);
                reject(@"TASK_FAILURE", error, nil);
            }
        } @catch (NSException *exception) {
            // Handle exceptions
            NSString *error = [NSString stringWithFormat:@"Exception caught: %@", exception.reason];
            reject(@"EXCEPTION", error, nil);
        }
    });
}

RCT_EXPORT_METHOD(closeApp : (NSString *)bundleName) {
  @try {
    dispatch_async(dispatch_get_main_queue(), ^{
      [vc dismissViewControllerAnimated:YES completion:nil];
      vc = nil;
      closeCallBack = nil;
    });
    [emitters removeObjectForKey:bundleName];

  } @catch (NSException *e) {
    NSLog(@"Exception: %@", e);
  } @finally {
    NSLog(@"finally");
  }
}

RCT_EXPORT_METHOD(addBridge : (NSString *)bundleName) {
  [emitters setObject:self forKey:bundleName];
}

RCT_EXPORT_METHOD(sendMessage
                  : (NSString *)bundleName msg
                  : (NSDictionary *)msg callback
                  : (RCTResponseSenderBlock)callback) {
  RCTEventEmitter *emitter = [emitters objectForKey:bundleName];
  NSMutableDictionary *result = [NSMutableDictionary new];
  if (emitter) {
    [emitter sendEventWithName:@"EventMessage" body:msg];
    [result setObject:@"Send message ok!" forKey:@"msg"];
  } else {
    NSString *str = @"[sendMessage] Cannot find this bundle name ";
    str = [str stringByAppendingString:bundleName];
    [result setObject:str forKey:@"msg"];
  }
  callback(@[ result ]);
}

RCT_EXPORT_METHOD(replyResponse
                  : (NSString *)requestId response
                  : (NSDictionary *)response callback
                  : (RCTResponseSenderBlock)callback) {
  Promise *promise = [promises objectForKey:requestId];
  NSMutableDictionary *result = [NSMutableDictionary new];
  if (promise) {
    promise.resolve(response);
    [promises removeObjectForKey:requestId];
    [result setObject:@"Reply response ok!" forKey:@"msg"];
  } else {
    NSString *str = @"[replyResponse] Cannot find promise with id ";
    str = [str stringByAppendingString:requestId];
    [result setObject:str forKey:@"msg"];
  }
  callback(@[ result ]);
}

RCT_REMAP_METHOD(getBundleNames, resolver
                 : (RCTPromiseResolveBlock)resolve rejecter
                 : (RCTPromiseRejectBlock)reject) {
  NSArray *arr = [emitters allKeys];
  if (arr.count > 0) {
    resolve(arr);
  } else {
    NSError *nsError = [NSError errorWithDomain:@"Error " code:0 userInfo:nil];
    reject(@"Error", @"No listeners", nsError);
  }
}

@end
