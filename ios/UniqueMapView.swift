import UIKit
import Mapbox
import MapboxNavigation

class UniqueMapView: UIView {
  private var mapView: NavigationMapView!

  override init(frame: CGRect) {
    super.init(frame: frame)
    setupMapView()
  }

  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    setupMapView()
  }

  private func setupMapView() {
    mapView = NavigationMapView(frame: self.bounds)
    mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    self.addSubview(mapView)
    addMarker()
  }

  private func addMarker() {
    let annotation = MGLPointAnnotation()
    annotation.coordinate = CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194)
    annotation.title = "San Francisco"
    mapView.addAnnotation(annotation)
  }
}
