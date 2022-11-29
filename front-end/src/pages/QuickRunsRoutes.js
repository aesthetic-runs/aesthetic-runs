import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "./style.css";

class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: { lat: 40.756795, lng: -73.954298 }
    };
  }

  render() {
    const apiIsLoaded = (map, maps) => {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      const origin = { lat: 40.756795, lng: -73.954298 };
      const destination = { lat: 41.756795, lng: -78.954298 };

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING
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
      <div>
        <div style={{ height: "400px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "YOUR_API_KEY"
            }}
            defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
            defaultZoom={10}
            center={this.state.currentLocation}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
          />
        </div>
      </div>
    );
  }
}
export default GoogleMaps;

//"use strict";

// function initialize() {
//     window.load(function(){
//         //Here is my logic now
//     });
//  };

{/* <script src="https://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"></script>

let DirectionsService = new window.google.maps.DirectionsService();

function calcRoute() {

    var waypts = [];

    for (var i in window.owt.stores.spotStore.data.map) {
        waypts.push({
            location:  new window.google.maps.LatLng(12.3, -33.6),
            stopover:true
        });
        console.log(waypts);
    }
    var request = {
        origin: new window.google.maps.LatLng(50.82788, 3.26499),
        destination: new window.google.maps.LatLng(50.82788, 3.26499),
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: window.google.maps.DirectionsTravelMode.DRIVING
    };

    window.directionsService.route(request, function(response, status) {
        if (status == window.google.maps.DirectionsStatus.OK) {
            window.directionsDisplay.setDirections(response);
        }
    });
}
; */}

/* Object.defineProperty(exports, "__esModule", { value: true });
function initMap() {
    var markerArray = [];
    // Instantiate a directions service.
    var directionsService = new window.google.maps.DirectionsService();
    // Create a map and center it on Manhattan.
    var map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: { lat: 40.771, lng: -73.974 },
    });
    // Create a renderer for directions and bind it to the map.
    var directionsRenderer = new window.google.maps.DirectionsRenderer({ map: map });
    // Instantiate an info window to hold step text.
    var stepDisplay = new window.google.maps.InfoWindow();
    // Display the route between the initial start and end selections.
    calculateAndDisplayRoute(directionsRenderer, directionsService, markerArray, stepDisplay, map);
    // Listen to change events from the start and end lists.
    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsRenderer, directionsService, markerArray, stepDisplay, map);
    };
    document.getElementById("start").addEventListener("change", onChangeHandler);
    document.getElementById("end").addEventListener("change", onChangeHandler);
}
function calculateAndDisplayRoute(directionsRenderer, directionsService, markerArray, stepDisplay, map) {
    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.
    directionsService
        .route({
        origin: document.getElementById("start").value,
        destination: document.getElementById("end").value,
        travelMode: window.google.maps.TravelMode.WALKING,
    })
        .then(function (result) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        document.getElementById("warnings-panel").innerHTML =
            "<b>" + result.routes[0].warnings + "</b>";
        directionsRenderer.setDirections(result);
        showSteps(result, markerArray, stepDisplay, map);
    })
        .catch(function (e) {
        window.alert("Directions request failed due to " + e);
    });
}
function showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = (markerArray[i] =
            markerArray[i] || new window.google.maps.Marker());
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
    }
}
function attachInstructionText(stepDisplay, marker, text, map) {
    window.google.maps.event.addListener(marker, "click", function () {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}

window.initMap = initMap; */
