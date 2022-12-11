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

const QuickRunEmpireState = () => {
  const apiIsLoaded = (map, maps) => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    //origin is set to NYU College of Dentistry, 345 E 24th St, New York, NY 10010
    const origin = { lat: 40.738164, lng: -73.978216 };

    //waypoint are set to multiple locations for the Empire State 2 mile run
    const waypt = [
      {
        //The Morgan Library & Museum, 225 Madison Ave, New York, NY 10016
        location: { lat: 40.749226, lng: -73.981397 },
        stopover: true,
      },
      {
        //Empire State Building, 20 W 34th St., New York, NY 10001
        location: { lat: 40.748817, lng: -73.985428 },
        stopover: true,
      },
      {
        //The Museum at FIT, 227 W 27th St, New York, NY 10001
        location: { lat: 40.7466, lng: -73.994193 },
        stopover: true,
      },
    ];

    //destination is set to to Eataly NYC Flatiron, 200 5th Ave, New York, NY 10010
    const destination = { lat: 40.742213, lng: -73.989588 };

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
      label: "Start at NYU College of Dentistry, 345 E 24th St.",
      description: `Head northwest on E 24th St toward 2nd Ave and then turn right. `,
    },
    {
      label: "Create an ad group",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      label: "Create an ad",
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
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
                  index === 2 ? (
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
      {/* <div style={{ width: "50vw" }}>
        <p>Quick Run Empire State Building Route - 2 miles!</p>
        <p>
          Origin (A): NYU College of Dentistry, 345 E 24th St, New York, NY
          10010
        </p>
        <p>Directions: </p>
        <p>Head northwest on E 24th St toward 2nd Ave - 0.6 mi</p>
        <p>Turn right -318 ft</p>
        <p>Turn left toward E 26th St/Madison Square N - 56 ft</p>
        <p>Turn right toward E 26th St/Madison Square N - 33 ft</p>
        <p>Turn right toward E 26th St/Madison Square N - 30 ft</p>
        <p>Turn left toward E 26th St/Madison Square N - 269 ft</p>
        <p>Turn left onto E 26th St/Madison Square N - 46 ft</p>
        <p>Turn right onto 5th Ave - 0.4 mi </p>

        <p>
          *Landmark B: Empire State Building, 20 W 34th St., New York, NY 10001
        </p>
        <p>Head northeast on 5th Ave toward W 34th St. - 154 ft</p>
        <p>Turn right onto E 34th St - 0.1 mi</p>
        <p>Turn left onto Madison Ave - 0.1 mi</p>
        <p>Turn right - 66 ft</p>
        <p>Walk for 59 ft</p>

        <p>
          *Landmark C: The Morgan Library & Museum, 225 Madison Ave, New York,
          NY 10016
        </p>
        <p>Walk for 59 ft</p>
        <p>Head northwest toward Madison Ave - 66 ft</p>
        <p>Turn left onto Madison Ave - 384 ft</p>
        <p>Turn right onto E 35th St - 0.5 mi</p>
        <p>Turn left onto 7th Ave/Fashion Ave - 0.4 mi</p>

        <p>*Landmark D: The Museum at FIT, 227 W 27th St, New York, NY 10001</p>
        <p>Head southwest on 7th Ave toward W 26th St - 180 ft</p>
        <p>Turn left onto W 26th St - 0.3 mi</p>
        <p>Turn right onto Broadway - 0.1 mi</p>
        <p>Turn right onto 5th Ave - 164 ft</p>

        <p>
          Destination (Landmark E): Eataly NYC Flatiron, 200 5th Ave, New York,
          NY 10010
        </p>
      </div> */}
    </div>
  );
};

export default QuickRunEmpireState;

//         <div style={{ width: "50vw" }}>
//           <p>Quick Run Empire State Building Route - 2 miles!</p>
//           <p>Origin (A): NYU College of Dentistry, 345 E 24th St, New York, NY 10010</p>
//           <p>Directions: </p>
//           <p>Head northwest on E 24th St toward 2nd Ave - 0.6 mi</p>
//           <p>Turn right -318 ft</p>
//           <p>Turn left toward E 26th St/Madison Square N - 56 ft</p>
//           <p>Turn right toward E 26th St/Madison Square N - 33 ft</p>
//           <p>Turn right toward E 26th St/Madison Square N - 30 ft</p>
//           <p>Turn left toward E 26th St/Madison Square N - 269 ft</p>
//           <p>Turn left onto E 26th St/Madison Square N - 46 ft</p>
//           <p>Turn right onto 5th Ave - 0.4 mi </p>

//           <p>*Landmark B: Empire State Building, 20 W 34th St., New York, NY 10001</p>
//           <p>Head northeast on 5th Ave toward W 34th St. - 154 ft</p>
//           <p>Turn right onto E 34th St - 0.1 mi</p>
//           <p>Turn left onto Madison Ave - 0.1 mi</p>
//           <p>Turn right - 66 ft</p>
//           <p>Walk for 59 ft</p>

//           <p>*Landmark C: The Morgan Library & Museum, 225 Madison Ave, New York, NY 10016</p>
//           <p>Walk for 59 ft</p>
//           <p>Head northwest toward Madison Ave - 66 ft</p>
//           <p>Turn left onto Madison Ave - 384 ft</p>
//           <p>Turn right onto E 35th St - 0.5 mi</p>
//           <p>Turn left onto 7th Ave/Fashion Ave - 0.4 mi</p>

//           <p>*Landmark D: The Museum at FIT, 227 W 27th St, New York, NY 10001</p>
//           <p>Head southwest on 7th Ave toward W 26th St - 180 ft</p>
//           <p>Turn left onto W 26th St - 0.3 mi</p>
//           <p>Turn right onto Broadway - 0.1 mi</p>
//           <p>Turn right onto 5th Ave - 164 ft</p>

//           <p>Destination (Landmark E): Eataly NYC Flatiron, 200 5th Ave, New York, NY 10010</p>

// export default GoogleMaps;
