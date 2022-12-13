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
    var rendererOptions = {
      map: map,
      suppressMarkers: true,
    };

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer(
      rendererOptions
    );
    directionsRenderer.setMap(map);

    const image1 =
      "https://i.imgur.com/tRYdMxp.png";
    new window.google.maps.Marker({
      position: { lat: 40.754459, lng: -74.002129 },
      map,
      title:
        "The Vessel: The Vessel is a structure and visitor attraction built as part of the Hudson Yards Redevelopment Project in Manhattan, New York City, New York. ",
      icon: {
        size: new window.google.maps.Size(40, 35),
        scaledSize: new window.google.maps.Size(40, 35),
        url: image1,
      },
    }); //The Vessel

    const image2 =
      "https://media.chelseapiers.com/images/gc/2019/500x500/DSC_7685-500x500.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.748997, lng: -74.008566 },
      map,
      title:
        "Chelsea Piers: Chelsea Piers is a series of piers in Chelsea, on the West Side of Manhattan in New York City.",
      icon: {
        size: new window.google.maps.Size(35, 35),
        scaledSize: new window.google.maps.Size(35, 35),
        url: image2,
      },
    }); //Chelsea Piers

    const image3 =
      "http://cdn.cnn.com/cnnnext/dam/assets/210524225200-02-little-island-ny-0525.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.742104, lng: -74.010025 },
      map,
      title:
        "Little Island: Little Island at Pier 55 is an artificial island park in the Hudson River west of Manhattan in New York City, adjoining Hudson River Park. Designed by Heatherwick Studio, it is near the intersection of West Street and 13th Street in the Meatpacking District and Chelsea neighborhoods of Manhattan.",
      icon: {
        size: new window.google.maps.Size(40, 35),
        scaledSize: new window.google.maps.Size(40, 35),
        url: image3,
      },
    }); //Little Island

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
      <Box sx={{ maxWidth: "40vw", marginLeft: "1vw" }}>
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
