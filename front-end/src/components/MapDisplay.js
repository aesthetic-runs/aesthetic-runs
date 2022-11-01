import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapDisplay = () => {
  const mapStyles = {
    height: "95vh",
    width: "100%",
  };

  const [currentPosition, setCurrentPosition] = useState({});

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  });

  return (
    <LoadScript googleMapsApiKey="AIzaSyD2ZqM9SXOQXWChW4D6Mb_wd9fvSpgvsSM">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={currentPosition}
      >
        {currentPosition.lat && <Marker position={currentPosition} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDisplay;
