import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  // DirectionsService,
} from "@react-google-maps/api";
// import TextField from "@mui/material/TextField";
// import axios from "axios";

const MapDisplay = () => {
  const mapStyles = {
    height: "93vh",
    width: "100%",
  };

  const [currentPosition, setCurrentPosition] = useState({});
  // const [origin, setOrigin] = useState("");
  // const [destination, setDestination] = useState("");

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS;

  // Old Routing
  // const [distance, setDistance] = useState(0);
  // const [duration, setDuration] = useState(0);

  // const onLoad = React.useCallback(function callback(map) {
  //   // Get directions
  //   const google = window.google;
  //   const directionsService = new google.maps.DirectionsService();

  //   directionsService.route(
  //     {
  //       origin: "Liverpool, UK",
  //       destination: "Oxford, UK",
  //       travelMode: google.maps.TravelMode.WALKING,
  //     },
  //     (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         setDistance(result.routes[0].legs[0].distance.value);
  //         setDuration(result.routes[0].legs[0].duration.value);
  //       } else {
  //         console.error("error fetching directions", result, status);
  //       }
  //     }
  //   );
  // }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}
        >
          {currentPosition.lat && <Marker position={currentPosition} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapDisplay;

// https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyBdpVegJQwfCCXq-chjswygW1rBbhBE0Gs
