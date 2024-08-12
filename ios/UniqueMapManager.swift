import Foundation
import React

@objc(UniqueMapManager)
class UniqueMapManager: RCTViewManager {
  override func view() -> UIView! {
    return UniqueMapView()
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
