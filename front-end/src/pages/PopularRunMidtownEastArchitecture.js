// import React, { Component } from "react";
// import GoogleMapReact from "google-map-react";

// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";

// class GoogleMaps extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       currentLocation: { lat: 40.756795, lng: -73.954298 },
//       key: process.env.REACT_APP_GOOGLE_MAPS,
//     };
//   }

//   render() {
//     const apiIsLoaded = (map, maps) => {
//       const directionsService = new window.google.maps.DirectionsService();
//       const directionsRenderer = new window.google.maps.DirectionsRenderer();
//       directionsRenderer.setMap(map);

//       //origin is set to Grand Central Terminal, 89 E 42nd St, New York, NY 10017
//       const origin = { lat: 40.753294, lng: -73.977161 };

//       //waypoint are set to multiple locations for the Midtown East Architecture run
//       const waypt = [
//         {
//           //St. Patrick's Cathedral, 5th Ave, New York, NY 10022
//           location: { lat: 40.759523, lng: -73.976239 },
//           stopover: true,
//         },
//         {
//           //The Museum of Modern Art, 11 W 53rd St, New York, NY 10019
//           location: { lat: 40.762339, lng: -73.977354 },
//           stopover: true,
//         },
//         {
//           //Radio City Music Hall, 1260 6th Ave, New York, NY 10020
//           location: { lat: 40.761248, lng: -73.980097 },
//           stopover: true,
//         },
//         {
//           //SUMMIT One Vanderbilt, 45 E 42nd St, New York, NY 10017
//           location: { lat: 40.753749, lng: -73.978702 },
//           stopover: true,
//         },
//       ];

//       //destination is set to Chrysler Building, 405 Lexington Ave, New York, NY 10174
//       const destination = { lat: 40.752094, lng: -73.975402 };

//       directionsService.route(
//         {
//           origin: origin,
//           destination: destination,
//           waypoints: waypt,
//           travelMode: window.google.maps.TravelMode.WALKING,
//         },
//         (result, status) => {
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             directionsRenderer.setDirections(result);
//           } else {
//             console.error(`error fetching directions ${result}`);
//           }
//         }
//       );
//     };

//     return (
//       <div style={{ height: "93vh", width: "100%" }}>
//         <Container maxWidth="40px">
//           <Typography
//             //component="h1"
//             variant="h8"
//             align="center"
//             color="text.primary"
//             gutterBottom
//           >
//             Popular Run: Midtown East Architectural Buildings - 2 miles
//           </Typography>
//         </Container>
//         <GoogleMapReact
//           bootstrapURLKeys={{
//             key: process.env.REACT_APP_GOOGLE_MAPS,
//           }}
//           //containerElement={<div style={{ height: `500px`, width: "500px" }} />}
//           //mapElement={<div style={{ height: `100%` }} />}
//           defaultCenter={{ lat: -3.745, lng: -38.523 }}
//           defaultZoom={10}
//           center={this.state.currentLocation}
//           yesIWantToUseGoogleMapApiInternals
//           onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
//         />
//       </div>
//     );
//   }
// }

// export default GoogleMaps;



import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const PopularRunMidtownEastArchitecture = () => {
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
    const destination = { lat: 40.752094, lng: -73.975402 };

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

  const steps = [
    {
      label: "Start at Grand Central Terminal, 89 E 42nd St, New York, NY 10017",
      description: `xxx`,
    },
    {
      label: "LANDMARK B: St. Patrick's Cathedral, 5th Ave, New York, NY 10022",
    },
    {
      label: `LANDMARK C: The Museum of Modern Art, 11 W 53rd St, New York, NY 10019`,
    },
    {
      label: "LANDMARK D: Radio City Music Hall, 1260 6th Ave, New York, NY 10020",
    },
    {
      label: `LANDMARK E: SUMMIT One Vanderbilt, 45 E 42nd St, New York, NY 10017`,
    },
    {
      label: `LANDMARK F: Chrysler Building, 405 Lexington Ave, New York, NY 10174`,
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "93vh",
        width: "100%",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS,
        }}
        defaultCenter={{ lat: -3.745, lng: -38.523 }}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      />
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 5 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Typography>Total route distance: 1 mile</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default PopularRunMidtownEastArchitecture;
