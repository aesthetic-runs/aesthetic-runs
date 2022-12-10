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

      //origin is set to Central Park North (110 St)
      const origin = { lat: 40.79939, lng: -73.952404 };

      //waypoint are set to multiple locations for the Statue of Liberty run
      const waypt = [
        {
          //North Woods Loch Waterfall, Central Park, Loch Walking Path, New York, NY 10025
          location: { lat: 40.79765, lng: -73.956022 },
          stopover: true,
        },
        {
          //Glen Span Arch
          location: { lat: 40.79508, lng: -73.959318 },
          stopover: true,
        },
        {
          //Jacqueline Kennedy Onassis Reservoir, New York, NY 10128
          location: { lat: 40.787578, lng: -73.962631 },
          stopover: true,
        },
        {
          //The Metropolitan Museum of Art, 1000 5th Ave, New York, NY 10028
          location: { lat: 40.781274, lng: -73.962803 },
          stopover: true,
        },
        {
          //American Museum of Natural History, 200 Central Park West, New York, NY 10024
          location: { lat: 40.783029, lng: -73.974219 },
          stopover: true,
        },
        {
          //Bethesda Fountain, New York, NY 10024
          location: { lat: 40.775945, lng: -73.970957 },
          stopover: true,
        },
        {
          //Sheep Meadow, 1802 65th Street Transverse, New York, NY 10065
          location: { lat: 40.771785, lng: -73.974819 },
          stopover: true,
        },
        {
          //Wollman Rink, Central Park S, New York, NY 10019
          location: { lat: 40.76873, lng: -73.974476 },
          stopover: true,
        },
      ];

      //destination is set to Columbus Circle, 848 Columbus Cir, New York, NY 10019
      const destination = { lat: 40.769055, lng: -73.981686 };

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
            Popular Run: Central Park - 5 miles
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
