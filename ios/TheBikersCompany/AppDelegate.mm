#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>
#import <RNFBDynamicLinksAppDelegateInterceptor.h>
//#import <TSBackgroundFetch/TSBackgroundFetch.h>
//#import <GoogleNavigation/GoogleNavigation.h> // Add this line

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [RNFBDynamicLinksAppDelegateInterceptor sharedInstance];
  [GMSServices provideAPIKey:@"AIzaSyD2iCn1XM8zHTlJSYwPSnDAJM83m4PyBV4"]; // add this line using the api key obtained from Google Console
//  [[TSBackgroundFetch sharedInstance] didFinishLaunching];
  self.moduleName = @"TheBikersCompany";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  [FIRApp configure];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
