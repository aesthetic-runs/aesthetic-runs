import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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

      //origin is set to Vessel, 20 Hudson Yards, New York, NY 10001
      const origin = { lat: 40.754459, lng: -74.002129 };

      //waypoint are set to multiple locations for the Hudson River run
      const waypt = [
        {
          //Chelsea Piers, 62 Chelsea Piers, New York, NY 10011
          location: { lat: 40.748997, lng: -74.008566 },
          stopover: true,
        },
      ];

      //destination is set to Little Island, Pier55 in Hudson River Park @, W 13th St, New York, NY 10014
      const destination = { lat: 40.742104, lng: -74.010025 };

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
      <div style={{ height: "87vh", width: "100%" }}>
        <Container maxWidth="40px">
          <Typography
            //component="h1"
            variant="h8"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Popular Run: Hudson River Run - 1 mile
          </Typography>
        </Container>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS,
          }}
          //containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          //mapElement={<div style={{ height: `100%` }} />}
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
