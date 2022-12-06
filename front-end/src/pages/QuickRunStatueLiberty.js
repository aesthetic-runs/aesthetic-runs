import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: { lat: 40.756795, lng: -73.954298 },
      key: process.env.REACT_APP_GOOGLE_MAPS,
    };
  }

  render() {
    const apiIsLoaded = (map, maps) => {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      //origin is set to Washington Square Park, Washington Square, New York, NY 10012
      const origin = { lat: 40.730827, lng: -73.997214 };

      //waypoint are set to multiple locations for the Statue of Liberty run
      const waypt = [
        {
          //Pier 26 at Hudson River Park, Hudson River Greenway, New York, NY 10013
          location: { lat: 40.721321, lng: -74.013074 },
          stopover: true,
        },
        {
          //Statue of Liberty View Point
          location: { lat: 40.701240, lng: -74.015272 },
          stopover: true,
        },
        {
          //The Battery, New York, NY 10004
          location: { lat: 40.703118, lng: -74.015339 },
          stopover: true,
        },
      ];

      //destination is set to Weinstein Hall, 5 University Pl, New York, NY 10003
      const destination = { lat: 40.731319, lng: -73.995094 };

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: waypt,
          travelMode: window.google.maps.TravelMode.WALKING,
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
      <div style={{ height: "93vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS,
          }}
          defaultCenter={{ lat: -3.745, lng: -38.523 }}
          defaultZoom={10}
          center={this.state.currentLocation}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
        />
      </div>
    );
  }
}

export default GoogleMaps;
