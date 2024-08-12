//import UIKit
//import GoogleMaps
//import GoogleNavigation
//import React
//
//@objc(GoogleNavigationManager)
//class GoogleNavigationManager: NSObject {
//
//  var mapView: GMSMapView!
//  var locationManager: CLLocationManager!
//
//  @objc(startNavigation:destination:resolver:rejecter:)
//  func startNavigation(origin: NSDictionary, destination: NSDictionary, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
//    GMSServices.provideAPIKey("AIzaSyD2iCn1XM8zHTlJSYwPSnDAJM83m4PyBV4")
//
//    locationManager = CLLocationManager()
//    locationManager.requestAlwaysAuthorization()
//    locationManager.delegate = self
//    locationManager.startUpdatingLocation()
//
//    let destinationLat = destination["latitude"] as? CLLocationDegrees ?? 0.0
//    let destinationLon = destination["longitude"] as? CLLocationDegrees ?? 0.0
//    let destinationCoordinate = CLLocationCoordinate2D(latitude: destinationLat, longitude: destinationLon)
//
//    DispatchQueue.main.async {
//      let camera = GMSCameraPosition.camera(withLatitude: destinationLat, longitude: destinationLon, zoom: 14)
//      self.mapView = GMSMapView(frame: UIScreen.main.bounds)
//      self.mapView.camera = camera
//      
//      let companyName = "Your Company Name"
//      GMSNavigationServices.showTermsAndConditionsDialogIfNeeded(withCompanyName: companyName) { termsAccepted in
//        if termsAccepted {
//          self.mapView.isNavigationEnabled = true
//
//          let destinationMarker = GMSMarker(position: destinationCoordinate)
//          destinationMarker.map = self.mapView
//          destinationMarker.title = "Destination"
//
//          if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
//             let rootVC = windowScene.windows.first?.rootViewController {
//            rootVC.view.addSubview(self.mapView)
//            resolver(nil)
//          } else {
//            rejecter("NavigationError", "Root view controller not found", nil)
//          }
//        } else {
//          rejecter("NavigationError", "Terms and conditions not accepted", nil)
//        }
//      }
//    }
//  }
//}
//
//extension GoogleNavigationManager: CLLocationManagerDelegate {
//  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
//    guard let location = locations.last else { return }
//    let originCoordinate = location.coordinate
//
//    let destinationLat = 22.7548
//    let destinationLon = 75.8930
//    let destinationCoordinate = CLLocationCoordinate2D(latitude: destinationLat, longitude: destinationLon)
//
//    let path = GMSMutablePath()
//    path.add(originCoordinate)
//    path.add(destinationCoordinate)
//
//    let polyline = GMSPolyline(path: path)
//    polyline.strokeColor = .blue
//    polyline.strokeWidth = 5.0
//    polyline.map = self.mapView
//
//    let bounds = GMSCoordinateBounds(coordinate: originCoordinate, coordinate: destinationCoordinate)
//    self.mapView.animate(with: GMSCameraUpdate.fit(bounds, withPadding: 50))
//  }
//
//  func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
//    print("Error: \(error.localizedDescription)")
//  }
//}
//
//extension GoogleNavigationManager: RCTBridgeModule {
//  static func moduleName() -> String! {
//    return "GoogleNavigationManager"
//  }
//
//  static func requiresMainQueueSetup() -> Bool {
//    return true
//  }
//}
import UIKit
//import GoogleMaps
//import GoogleNavigation
//import React
//
//@objc(GoogleNavigationManager)
//class GoogleNavigationManager: NSObject {
//
//  var mapView: GMSMapView!
//  var locationManager: CLLocationManager!
//
//  @objc(startNavigation:destination:resolver:rejecter:)
//  func startNavigation(origin: NSDictionary, destination: NSDictionary, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
//    GMSServices.provideAPIKey("AIzaSyD2iCn1XM8zHTlJSYwPSnDAJM83m4PyBV4")
//
//    locationManager = CLLocationManager()
//    locationManager.requestAlwaysAuthorization()
//    locationManager.delegate = self
//    locationManager.startUpdatingLocation()
//
//    let destinationLat = destination["latitude"] as? CLLocationDegrees ?? 0.0
//    let destinationLon = destination["longitude"] as? CLLocationDegrees ?? 0.0
//    let destinationCoordinate = CLLocationCoordinate2D(latitude: destinationLat, longitude: destinationLon)
//
//    DispatchQueue.main.async {
//      let camera = GMSCameraPosition.camera(withLatitude: destinationLat, longitude: destinationLon, zoom: 14)
//      self.mapView = GMSMapView(frame: UIScreen.main.bounds)
//      self.mapView.camera = camera
//      
//      let companyName = "Your Company Name"
//      GMSNavigationServices.showTermsAndConditionsDialogIfNeeded(withCompanyName: companyName) { termsAccepted in
//        if termsAccepted {
//          self.mapView.isNavigationEnabled = true
//
//          let destinationMarker = GMSMarker(position: destinationCoordinate)
//          destinationMarker.map = self.mapView
//          destinationMarker.title = "Destination"
//
//          if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
//             let rootVC = windowScene.windows.first?.rootViewController {
//            rootVC.view.addSubview(self.mapView)
//            resolver(nil)
//          } else {
//            rejecter("NavigationError", "Root view controller not found", nil)
//          }
//        } else {
//          rejecter("NavigationError", "Terms and conditions not accepted", nil)
//        }
//      }
//    }
//  }
//}
//
//extension GoogleNavigationManager: CLLocationManagerDelegate {
//  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
//    guard let location = locations.last else { return }
//    let originCoordinate = location.coordinate
//
//    let destinationLat = 22.7548
//    let destinationLon = 75.8930
//    let destinationCoordinate = CLLocationCoordinate2D(latitude: destinationLat, longitude: destinationLon)
//
//    let path = GMSMutablePath()
//    path.add(originCoordinate)
//    path.add(destinationCoordinate)
//
//    let polyline = GMSPolyline(path: path)
//    polyline.strokeColor = .blue
//    polyline.strokeWidth = 5.0
//    polyline.map = self.mapView
//
//    let bounds = GMSCoordinateBounds(coordinate: originCoordinate, coordinate: destinationCoordinate)
//    self.mapView.animate(with: GMSCameraUpdate.fit(bounds, withPadding: 50))
//  }
//
//  func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
//    print("Error: \(error.localizedDescription)")
//  }
//}
//
//extension GoogleNavigationManager: RCTBridgeModule {
//  static func moduleName() -> String! {
//    return "GoogleNavigationManager"
//  }
//
//  static func requiresMainQueueSetup() -> Bool {
//    return true
//  }
//}
