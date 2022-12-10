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

      //origin is set to Columbus Circle, 848 Columbus Cir, New York, NY 10019
      const origin = { lat: 40.768411, lng: -73.981885 };

      //waypoint are set to multiple locations for the Lincoln Center 1 mile run
      const waypt = [
        {
          //Lincoln Center for the Performing Arts, Lincoln Center Plaza, New York, NY 10023
          location: { lat: 40.772692, lng: -73.983425 },
          stopover: true,
        },
      ];

      //destination is set to to Strawberry Fields, New York, NY 10023
      const destination = { lat: 40.775967, lng: -73.97474 };

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
