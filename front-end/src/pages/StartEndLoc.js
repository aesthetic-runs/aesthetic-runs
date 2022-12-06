import React from "react";
import MapDisplay from "../components/MapDisplay";

//<script src="//maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>

//GOOGLE_API_KEY
let apiKey = process.env.REACT_APP_GOOGLE_MAPS;
alert("Show/paste GOOGLE API KEY");
let map;
let elevator;
let directionsDisplay;
let directionsService;
let drawingManager;
let placeIdArray = [];
let polylines = [];
let coordinates = [];

// let initialLocation;
// let newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
//  browserSupportFlag = new Boolean();

function initialize() {
  let mapOptions = {
    zoom: 17,
    center: { lat: -33.8667, lng: 151.1955 },
  };

  directionsService = new google.maps.DirectionsService();
  let polylineOptionsActual = new google.maps.Polyline({
    strokeColor: "#FF0000",
    strokeOpacity: 0.6,
    strokeWeight: 2,
  });

  directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: polylineOptionsActual,
  });
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsDisplay.setMap(map);

  // Create an ElevationService
  elevator = new google.maps.ElevationService();
  // Adds a Places search box
  // Searching for a place will center the map on that location.
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
    document.getElementById("bar")
  );

  let autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocStart")
  );
  autocomplete.bindTo("bounds", map);
  autocomplete.addListener("place_changed", function () {
    let placeStart = autocomplete.getPlace();
    //alert(placeStart.place_id);
    document.getElementById("startPlaceId").value = placeStart.place_id;
  });

  let autocomplete1 = new google.maps.places.Autocomplete(
    document.getElementById("autocEnd")
  );
  autocomplete1.bindTo("bounds", map);
  autocomplete1.addListener("place_changed", function () {
    let placeEnd = autocomplete1.getPlace();
    //alert(placeEnd.place_id);
    document.getElementById("endPlaceId").value = placeEnd.place_id;
  });

  //Enables the polyline drawing control. Click on the map to start drawing a polyline.
  //Each click will add a new vertice. Double-click to stop drawing.
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYLINE,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYLINE],
    },
    polylineOptions: {
      strokeColor: "#696969",
      strokeWeight: 2,
    },
  });
  drawingManager.setMap(map);

  // Snap-to-road when the polyline is completed.
  drawingManager.addListener("polylinecomplete", function (poly) {
    let path = poly.getPath();
    polylines.push(poly);
    placeIdArray = [];
    runSnapToRoad(path);
  });

  // Clear button. Click to remove all polylines.
  $("#clear").click(function (ev) {
    for (let i = 0; i < polylines.length; ++i) {
      polylines[i].setMap(null);
    }
    polylines = [];
    ev.preventDefault();
    return false;
  });

  //Snap a user-created polyline to roads and draw the snapped path
  function runSnapToRoad(path) {
    let pathValues = [];
    for (let i = 0; i < path.getLength(); i++) {
      pathValues.push(path.getAt(i).toUrlValue());
    }

    $.get(
      "https://roads.googleapis.com/v1/snapToRoads",
      {
        interpolate: true,
        key: apiKey,
        path: pathValues.join("|"),
      },
      function (data) {
        processSnapToRoadResponse(data);
        drawSnappedPolyline();
        //getAndDrawSpeedLimits();
      }
    );
  }

  // Store snapped polyline returned by the snap-to-road method.
  function processSnapToRoadResponse(data) {
    coordinates = [];
    placeIdArray = [];

    for (let i = 0; i < data.snappedPoints.length; i++) {
      let latlng = new google.maps.LatLng(
        data.snappedPoints[i].location.latitude,
        data.snappedPoints[i].location.longitude
      );
      //getElevation(latlng);
      coordinates.push(latlng);
      placeIdArray.push(data.snappedPoints[i].placeId);
    }

    //get Altitude in meters
    getElevation(coordinates);
    document.getElementById("coordinatesArray").value = coordinates;
    document.getElementById("coordPaceIdArray").value = placeIdArray;
  }

  function drawSnappedPolyline() {
    let snappedPolyline = new google.maps.Polyline({
      path: coordinates,
      strokeColor: "black",
      strokeWeight: 3,
    });
    snappedPolyline.setMap(map);
    polylines.push(snappedPolyline);
  }

  // Gets speed limits (for 100 segments at a time) and draws a polyline color-coded by speed limit.
  // Must be called after processing snap-to-road response.
  function getAndDrawSpeedLimits() {
    for (let i = 0; i <= placeIdArray.length / 100; i++) {
      // Ensure that no query exceeds the max 100 placeID limit.
      let start = i * 100;
      let end = Math.min((i + 1) * 100 - 1, placeIdArray.length);

      drawSpeedLimits(start, end);
    }
  }

  // Gets speed limits for a 100-segment path and draws a polyline color-coded by
  // speed limit. Must be called after processing snap-to-road response.
  function drawSpeedLimits(start, end) {
    let placeIdQuery = "";
    for (let i = start; i < end; i++) {
      placeIdQuery += "&placeId=" + placeIdArray[i];
    }

    $.get(
      "https://roads.googleapis.com/v1/speedLimits",
      "key=" + apiKey + placeIdQuery,
      function (speedData) {
        processSpeedLimitResponse(speedData, start);
      }
    );
  }

  // Draw a polyline segment (up to 100 road segments) color-coded by speed limit.
  function processSpeedLimitResponse(speedData, start) {
    let end = start + speedData.speedLimits.length;
    for (let i = 0; i < speedData.speedLimits.length - 1; i++) {
      let speedLimit = speedData.speedLimits[i].speedLimit;
      let color = getColorForSpeed(speedLimit);

      // Take two points for a single-segment polyline.
      let coords = coordinates.slice(start + i, start + i + 2);

      let snappedPolyline = new google.maps.Polyline({
        path: coords,
        strokeColor: color,
        strokeWeight: 6,
      });
      snappedPolyline.setMap(map);
      polylines.push(snappedPolyline);
      //passDataToObjC();
    }
  }

  function getElevation(coordinatesArr) {
    let locations = [];

    // Retrieve the latlng and push it on the array
    for (let i = 0; i < coordinatesArr.length; i++) {
      locations.push(coordinatesArr[i]);
    }

    // Create a LocationElevationRequest object using the array's one value
    let positionalRequest = {
      locations: locations,
    };

    // Initiate the location request
    elevator.getElevationForLocations(
      positionalRequest,
      function (results, status) {
        if (status == google.maps.ElevationStatus.OK) {
          // Retrieve the first result
          if (results) {
            let altitudeArr = [];

            for (let j = 0; j < results.length; j++) {
              altitudeArr.push(results[j].elevation);
            }
            document.getElementById("altitudeArray").value = altitudeArr;
            document.getElementById("dataDisplay").style.display = "block";
            //alert(altitudeArr);
          } else {
            alert("No results found");
          }
        } else {
          alert("Elevation service failed due to: " + status);
        }
      }
    );
  }

  function initMap() {
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    let chicago = new google.maps.LatLng(41.850033, -87.6500523);
    let mapOptions = {
      zoom: 7,
      center: chicago,
    };
    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsRenderer.setMap(map);
  }

  function calcRoute() {
    let start = document.getElementById("autocStart").value;
    let end = document.getElementById("autocEnd").value;

    //alert(start);
    let request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }

  $(window).load(initialize);
}
