import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapDisplay = () => {
  const mapStyles = {
    height: "93vh",
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
  }, []);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS;

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
