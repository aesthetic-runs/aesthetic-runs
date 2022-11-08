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

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS;

  //travel mode: Walking mode used
  function checkWalking({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "WALKING",
      }));
  }

  function getOrigin(ref) {
    this.origin = ref;
  }

  function getDestination(ref) {
    this.destination = ref;
  }

  function onClick() {
    if (this.origin.value !== "" && this.destination.value !== "") {
      this.setState(() => ({
        origin: this.origin.value,
        destination: this.destination.value,
      }));
    }
  }

  function onMapClick(...args) {
    console.log("onClick args: ", args);
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={currentPosition}
      >
        {currentPosition.lat && <Marker position={currentPosition} />}

     {/* This is a WIP - checking that origin/destination sections work with Google Maps */}
        <div className="map">
          <div className="map-settings">
            <hr className="mt-0 mb-3" />

            {/* <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <label htmlFor="ORIGIN">Origin</label>
                  <br />
                  <input
                    id="ORIGIN"
                    className="form-control"
                    type="text"
                    ref={this.getOrigin}
                  />
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <label htmlFor="DESTINATION">Destination</label>
                  <br />
                  <input
                    id="DESTINATION"
                    className="form-control"
                    type="text"
                    ref={this.getDestination}
                  />
                </div>
              </div>
            </div> */}

            {/* <div className="form-group custom-control custom-radio mr-4">
              <input
                id="WALKING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={this.state.travelMode === "WALKING"}
                onChange={this.checkWalking}
              />
              <label className="custom-control-label" htmlFor="WALKING">
                Walking
              </label>
            </div> */}
          </div>
        </div>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDisplay;
