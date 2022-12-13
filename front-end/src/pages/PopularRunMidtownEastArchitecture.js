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

const PopularRunMidtownEastArchitecture = () => {
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
      "https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY4ODE0MzA5NjU1MTkzMDkz/grand-central-terminal-gettyimages-176608565.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.753294, lng: -73.977161 },
      map,
      title:
        "Grand Central Terminal: Grand Central Terminal is a commuter rail terminal located at 42nd Street and Park Avenue in Midtown Manhattan, New York City.",
      icon: {
        size: new window.google.maps.Size(35, 35),
        scaledSize: new window.google.maps.Size(35, 35),
        url: image1,
      },
    }); //Grand Central

    const image2 =
      "https://files.ecatholic.com/6783/pictures/2022/5/19-0316-1357.jpg?t=1652113529000";
    new window.google.maps.Marker({
      position: { lat: 40.759523, lng: -73.976239 },
      map,
      title:
        "St. Patrick's Cathedral: St. Patrick's Cathedral is a Catholic cathedral in the Midtown Manhattan neighborhood of New York City. It is the seat of the Archbishop of New York as well as a parish church.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image2,
      },
    }); //St. Patrick's Cathedral

    const image3 =
      "https://www.moma.org/assets/visit/entrance-image--museum-crop-7516b01003659172f2d9dbc7a6c2e9d9.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.762339, lng: -73.977354 },
      map,
      title:
        "Museum of Modern Art: Founded in 1929, The Museum of Modern Art (MoMA) in midtown Manhattan was the first museum devoted to the modern era.",
      icon: {
        size: new window.google.maps.Size(40, 35),
        scaledSize: new window.google.maps.Size(40, 35),
        url: image3,
      },
    }); //MOMA

    const image4 =
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_862/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/qvhi1a1hsxjuu0w1et61/RadioCityMusicHallStageDoorTourinNewYork.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.761248, lng: -73.980097 },
      map,
      title:
        "Radio City Music Hall: Radio City Music Hall is an entertainment venue and theater at 1260 Avenue of the Americas, within Rockefeller Center, in the Midtown Manhattan neighborhood of New York City. Nicknamed 'The Showplace of the Nation', it is the headquarters for the Rockettes.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image4,
      },
    }); //Radio City Music Hall

    const image5 =
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0c/07/df/66.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.753749, lng: -73.978702 },
      map,
      title:
        "Summit One Vanderbilt: SUMMIT One Vanderbilt blends elements of art, technology, architecture, and thrill to take the concept of “observation deck” to entirely new heights.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image5,
      },
    }); //Summit One Vanderbilt

    const image6 =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Chrysler_building-_top.jpg/220px-Chrysler_building-_top.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.752094, lng: -73.975402 },
      map,
      title:
        "Chrysler Building: The Chrysler Building is an Art Deco skyscraper on the East Side of Manhattan in New York City, at the intersection of 42nd Street and Lexington Avenue in Midtown Manhattan.",
      icon: {
        size: new window.google.maps.Size(30, 35),
        scaledSize: new window.google.maps.Size(30, 35),
        url: image6,
      },
    }); //Chrysler Building

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
      label:
        "Start at Grand Central Terminal, 89 E 42nd St, New York, NY 10017",
      description: `Head north on Vanderbilt Ave`,
    },
    {
      label: "Walk up north on Vanderbilt Ave and turn left on 47th St",
    },
    {
      label:
        "Walk along 47th St, turn right on 5th Ave, and walk up north until 52nd St",
    },
    {
      label: "LANDMARK B: St. Patrick's Cathedral, 5th Ave, New York, NY 10022",
    },
    {
      label:
        "Walk up north on 5th Ave, turn left onto 55th St, and walk straight",
    },
    {
      label: `LANDMARK C: The Museum of Modern Art, 11 W 53rd St, New York, NY 10019`,
    },
    {
      label:
        "Walk up out along 55th St, turn left on 6th Ave, and walk south until 52nd St",
    },
    {
      label:
        "LANDMARK D: Radio City Music Hall, 1260 6th Ave, New York, NY 10020",
    },
    {
      label: "Walk east along 52nd St and turn right on Madison Ave",
    },
    {
      label: "Walk south down Madison Ave from 52nd St until 44th St",
    },
    {
      label: `LANDMARK E: SUMMIT One Vanderbilt, 45 E 42nd St, New York, NY 10017`,
    },
    {
      label:
        "Walk eastwards on 43rd St until crossing the street and reaching the corner of Lexington Ave",
    },
    {
      label: `LANDMARK F: Chrysler Building, 405 Lexington Ave, New York, NY 10174`,
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
                  index === 12 ? (
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

export default PopularRunMidtownEastArchitecture;
