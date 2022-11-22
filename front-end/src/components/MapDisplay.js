import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import TextField from "@mui/material/TextField";
import axios from "axios";

const MapDisplay = () => {
  const mapStyles = {
    height: "93vh",
    width: "100%",
  };

  const [currentPosition, setCurrentPosition] = useState({});
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();
    axios
      .get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin
          .split(" ")
          .join("+")}&destination=${destination
          .split(" ")
          .join("+")}&key=AIzaSyBdpVegJQwfCCXq-chjswygW1rBbhBE0Gs`
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      {/* <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className="form-group">
                  <label htmlFor="ORIGIN">Origin</label>
                  <TextField htmlFor="ORIGIN" label="ORIGIN"/>
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

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
    </div>
  );
};

export default MapDisplay;

// https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyBdpVegJQwfCCXq-chjswygW1rBbhBE0Gs
