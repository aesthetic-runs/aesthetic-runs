import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MapDisplay from "../components/MapDisplay";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: { lat: 40.756795, lng: -73.954298 }
    };
  }

  render() {
    const apiIsLoaded = (map, maps) => {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      //origin is set to eataly NYC flatiron location (200 5th Avenue)
      const origin = { lat: 40.742213, lng: -73.98958 };

      //destination is set to empire state building
      const destination = { lat: 40.748817, lng: 73.9857 };

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.WALKING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    };
    return (
      <div>
        <div style={{ height: "400px", width: "100%" }}>
        {/* <div className="Map">
          <MapDisplay />
        </div> */}
          <GoogleMapReact
            bootstrapURLKeys={{
              //key: "YOUR_API_KEY"
              key: "process.env.REACT_APP_GOOGLE_MAPS"
            }}
            defaultCenter={{ lat: 40.742213, lng: -73.98958 }}
            defaultZoom={10}
            center={this.state.currentLocation}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
          />
        </div>
      </div>
    );
  }
}
export default GoogleMaps;

//"use strict";

{/* <script src="https://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"></script>

let DirectionsService = new window.google.maps.DirectionsService();

function calcRoute() {

    var waypts = [];

    for (var i in window.owt.stores.spotStore.data.map) {
        waypts.push({
            location:  new window.google.maps.LatLng(12.3, -33.6),
            stopover:true
        });
        console.log(waypts);
    }
    var request = {
        origin: new window.google.maps.LatLng(50.82788, 3.26499),
        destination: new window.google.maps.LatLng(50.82788, 3.26499),
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: window.google.maps.DirectionsTravelMode.DRIVING
    };

    window.directionsService.route(request, function(response, status) {
        if (status == window.google.maps.DirectionsStatus.OK) {
            window.directionsDisplay.setDirections(response);
        }
    });
}
; */}
