import React, { useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const PopularRunHudsonRiver = () => {
  const isLastStep = useRef(false);
  const apiIsLoaded = (map, maps) => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    //origin is set to Vessel, 20 Hudson Yards, New York, NY 10001
    const origin = { lat: 40.754459, lng: -74.002129 };

    //waypoint are set to multiple locations for the Hudson River run
    const waypt = [
      {
        //Chelsea Piers, 62 Chelsea Piers, New York, NY 10011
        location: { lat: 40.748997, lng: -74.008566 },
        stopover: true,
      },
    ];

    //destination is set to Little Island, Pier55 in Hudson River Park @, W 13th St, New York, NY 10014
    const destination = { lat: 40.742104, lng: -74.010025 };

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
      label: "Start at Vessel, 20 Hudson Yards, New York, NY 10001",
      description: `Head northwest on Hudson Blvd and turn left onto 11th Ave`,
    },
    {
      label: "Walk down 11th Ave and turn right at W 23rd St",
    },
    {
      label: `Cross the road, turn left and merge onto the Hudson River Walkway`,
    },
    {
      label: "LANDMARK B: Chelsea Piers, 62 Chelsea Piers, New York, NY 10011",
      //description: `Learn more about Chelsea Piers`,
    },
    {
      label: `Head south east alongside the Hudson River and then turn right upon Little Island entryway`,
    },
    {
      label: `LANDMARK C: Little Island, Pier55 in Hudson River Park @, W 13th St, New York, NY 10014`,
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (index) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (index === steps.length - 1) {
      isLastStep.current = true;
    } else {
      isLastStep.current = false;
    }
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
                      onClick={(e) => handleNext(index)}
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
            {isLastStep.current && (
              <Button href="/home" sx={{ mt: 1, mr: 1 }}>
                Home
              </Button>
            )}
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default PopularRunHudsonRiver;

//old code but had top container label on it
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

//       //origin is set to Vessel, 20 Hudson Yards, New York, NY 10001
//       const origin = { lat: 40.754459, lng: -74.002129 };

//       //waypoint are set to multiple locations for the Hudson River run
//       const waypt = [
//         {
//           //Chelsea Piers, 62 Chelsea Piers, New York, NY 10011
//           location: { lat: 40.748997, lng: -74.008566 },
//           stopover: true,
//         },
//       ];

//       //destination is set to Little Island, Pier55 in Hudson River Park @, W 13th St, New York, NY 10014
//       const destination = { lat: 40.742104, lng: -74.010025 };

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
//       <div style={{ height: "87vh", width: "100%" }}>
//         <Container maxWidth="40px">
//           <Typography
//             //component="h1"
//             variant="h8"
//             align="center"
//             color="text.primary"
//             gutterBottom
//           >
//             Popular Run: Hudson River Run - 1 mile
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
