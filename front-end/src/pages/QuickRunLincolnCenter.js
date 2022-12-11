// import React, { Component } from "react";
// import GoogleMapReact from "google-map-react";

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

//       //origin is set to Columbus Circle, 848 Columbus Cir, New York, NY 10019
//       const origin = { lat: 40.768411, lng: -73.981885 };

//       //waypoint are set to multiple locations for the Lincoln Center 1 mile run
//       const waypt = [
//         {
//           //Lincoln Center for the Performing Arts, Lincoln Center Plaza, New York, NY 10023
//           location: { lat: 40.772692, lng: -73.983425 },
//           stopover: true,
//         },
//       ];

//       //destination is set to to Strawberry Fields, New York, NY 10023
//       const destination = { lat: 40.775967, lng: -73.97474 };

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
//         <GoogleMapReact
//           bootstrapURLKeys={{
//             key: process.env.REACT_APP_GOOGLE_MAPS,
//           }}
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

const QuickRunLincolnCenter = () => {
  const apiIsLoaded = (map, maps) => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    //origin is set to Columbus Circle, 848 Columbus Cir, New York, NY 10019
    const origin = { lat: 40.768411, lng: -73.981885 };

    //waypoint are set to multiple locations for the Lincoln Center 1 mile run
    const waypt = [
      {
        //Lincoln Center for the Performing Arts, Lincoln Center Plaza, New York, NY 10023
        location: { lat: 40.772692, lng: -73.983425 },
        stopover: true,
      },
    ];

    //destination is set to to Strawberry Fields, New York, NY 10023
    const destination = { lat: 40.775967, lng: -73.97474 };

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
      label: "Start at Columbus Circle, 848 Columbus Cir, New York, NY 10019",
      description: `Head northwest on Broadway`,
    },
    {
      label: "Walk up Broadway and turn left on W 62nd St",
    },
    {
      label: "Continue on 62nd st and turn right onto Lincoln Center Plaza",
    },
    {
      label: "LANDMARK B: Lincoln Center for the Performing Arts - Lincoln Center Plaza, New York, NY 10023",
    },
    {
      label: `Exit and head northeast on Lincoln Center Plaza and turn right on W 65th st`,
    },
    {
      label: `Enter Central Park where 65th st meets Central Park West`,
    },
    {
      label: `Continue taking a left along West Dr`,
    },
    {
      label: "LANDMARK C: Strawberry Fields, New York, NY 10023",
      //description: `Learn more about Strawberry Fields`,
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
                  index === 9 ? (
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
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default QuickRunLincolnCenter;
