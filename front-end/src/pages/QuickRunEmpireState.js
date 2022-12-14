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

const QuickRunEmpireState = () => {
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
      position: { lat: 40.738164, lng: -73.978216 },
      map,
      title:
        "NYU College of Dentistry: The New York University College of Dentistry is the dentistry school of New York University. As the 3rd oldest dentistry school in the United States, it offers both graduate programs and clinical training in oral healthcare.",
      icon: {
        size: new window.google.maps.Size(90, 35),
        scaledSize: new window.google.maps.Size(90, 35),
        url: image1,
      },
    }); //NYU CDentistry

    const image2 =
      "https://www.themorgan.org/sites/default/files/images/about/Library-Ceiling-1.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.749226, lng: -73.981397 },
      map,
      title:
        "Morgan Library & Museum: The Morgan Library & Museum, formerly the Pierpont Morgan Library, is a museum and research library in the Murray Hill neighborhood of Manhattan in New York City.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image2,
      },
    }); //Morgan Library & Museum

    const image3 =
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0d/0d/9a/a1.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.748817, lng: -73.985428 },
      map,
      title:
        "Empire State Building: The Empire State Building is a 102-story Art Deco skyscraper in Midtown Manhattan, New York City. The building was designed by Shreve, Lamb & Harmon and built from 1930 to 1931. Its name is derived from 'Empire State', the nickname of the state of New York.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image3,
      },
    }); //Empire State Building

    const image4 = "https://www.fitnyc.edu/images/cer/master-brand-button.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.7466, lng: -73.994193 },
      map,
      title:
        "Museum at FIT: Rotating exhibits & permanent collection of garments & accessories; free admission.",
      icon: {
        size: new window.google.maps.Size(35, 35),
        scaledSize: new window.google.maps.Size(35, 35),
        url: image4,
      },
    }); //Museum @ FIT

    const image5 =
      "https://www.eataly.com/wp/wp-content/uploads/2016/08/eataly-downtown.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.742213, lng: -73.989588 },
      map,
      title:
        "Eataly NYC Flatiron: Branch of the famed Italian market, offering counters, restaurants & cooking demos.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image5,
      },
    }); //Eataly NYC Flatiron

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
      description: `Head northwest on E 24th St toward 2nd Ave `,
    },
    {
      label:
        "Turn right on Madison Ave and walk through Madison Square Park until exiting on 5th Ave",
    },
    {
      label: `Walking north on Fifth Avenue until 34th street`,
    },
    {
      label:
        "LANDMARK B: Empire State Building - 20 W 34th St., New York, NY 10001",
      description: `Learn more about the Empire State Building: https://www.esbnyc.com/`,
    },
    {
      label: `Turn right 34th street, walk a block, and turn left on Madison Ave`,
    },
    {
      label: `Walk north on Madison Ave until between 36th and 37th Street`,
    },
    {
      label:
        "LANDMARK C: The Morgan Library & Museum - 225 Madison Ave, New York, NY 10016",
      description: `Learn more about The Morgan Library & Museum: https://www.themorgan.org/`,
    },
    {
      label: `Walk back down (south) Madison Ave and turn right on 35th st`,
    },
    {
      label: `Walk straight on 35th until 7th ave and turn left`,
    },
    {
      label: `Walk south on 7th ave until 27th st`,
    },
    {
      label:
        "LANDMARK D: The Museum at FIT - 227 W 27th St, New York, NY 10001",
      description: `Learn more about The Museum at FIT: https://www.fitnyc.edu/museum/index.php`,
    },
    {
      label: `Walk southwest and turn left on W 26th st`,
    },
    {
      label: `Walk along 26th st and turn right onto Broadway`,
    },
    {
      label: `Walk south along Broadway and turn right on Fifth ave until 23rd st`,
    },
    {
      label:
        "LANDMARK E: Eataly NYC Flatiron - 200 5th Ave, New York, NY 10010",
      description: `Learn more about Eataly NYC: https://www.eataly.com/us_en/`,
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
                  index === 14 ? (
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
            <Typography>Total route distance: 2 miles</Typography>
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

export default QuickRunEmpireState;
