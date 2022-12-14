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

const QuickRunLincolnCenter = () => {
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

    const image1 = "https://i.imgur.com/tRYdMxp.png";
    new window.google.maps.Marker({
      position: { lat: 40.768411, lng: -73.981885 },
      map,
      title:
        "Columbus Circle: Columbus Circle is a traffic circle and heavily trafficked intersection in the New York City borough of Manhattan, located at the intersection of Eighth Avenue, Broadway, Central Park South, and Central Park West, at the southwest corner of Central Park.",
      icon: {
        size: new window.google.maps.Size(40, 35),
        scaledSize: new window.google.maps.Size(40, 35),
        url: image1,
      },
    }); //Columbus Circle

    const image2 =
      "https://www.nycgo.com/images/venues/1080/lincolncenter_joebuglewicz_075__large.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.772692, lng: -73.983425 },
      map,
      title:
        "Lincoln Center: Lincoln Center for the Performing Arts (also simply known as Lincoln Center) is a 16.3-acre (6.6-hectare) complex of buildings in the Lincoln Square neighborhood on the Upper West Side of Manhattan. It has thirty indoor and outdoor facilities and is host to 5 million visitors annually. It houses internationally renowned performing arts organizations including the New York Philharmonic, the Metropolitan Opera, the New York City Ballet, and the Juilliard School.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image2,
      },
    }); //Lincoln Center Performing Arts

    const image3 =
      "https://cdn.shopify.com/s/files/1/1993/6065/files/pasted-image-0-5.png";
    new window.google.maps.Marker({
      position: { lat: 40.775967, lng: -73.97474 },
      map,
      title:
        "Strawberry Fields: Strawberry Fields is a 2.5-acre landscaped section in New York City's Central Park, designed by the landscape architect Bruce Kelly, that is dedicated to the memory of former Beatles member John Lennon. It is named after the Beatles' song 'Strawberry Fields Forever', written by Lennon.",
      icon: {
        size: new window.google.maps.Size(40, 35),
        scaledSize: new window.google.maps.Size(40, 35),
        url: image3,
      },
    }); //Strawberry Fields NY 10023

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
      label:
        "LANDMARK B: Lincoln Center for the Performing Arts - Lincoln Center Plaza, New York, NY 10023",
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
                  index === 7 ? (
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

export default QuickRunLincolnCenter;
