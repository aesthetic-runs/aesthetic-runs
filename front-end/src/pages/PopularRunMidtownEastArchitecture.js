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

      //origin is set to Grand Central Terminal, 89 E 42nd St, New York, NY 10017
      const origin = { lat: 40.753294, lng: -73.977161 };

      //waypoint are set to multiple locations for the Midtown East Architecture run
      const waypt = [
        {
          //St. Patrick's Cathedral, 5th Ave, New York, NY 10022
          location: { lat: 40.759523, lng: -73.976239 },
          stopover: true,
        },
        {
          //The Museum of Modern Art, 11 W 53rd St, New York, NY 10019
          location: { lat: 40.762339, lng: -73.977354 },
          stopover: true,
        },
        {
          //Radio City Music Hall, 1260 6th Ave, New York, NY 10020
          location: { lat: 40.761248, lng: -73.980097 },
          stopover: true,
        },
        {
          //SUMMIT One Vanderbilt, 45 E 42nd St, New York, NY 10017
          location: { lat: 40.753749, lng: -73.978702 },
          stopover: true,
        },
      ];

      //destination is set to Chrysler Building, 405 Lexington Ave, New York, NY 10174
      const destination = { lat: 40.752094, lng: -73.975402  };

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
        <Container maxWidth="40px">
            <Typography
              //component="h1"
              variant="h8"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Popular Run: Midtown East Architectural Buildings - 2 miles
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
