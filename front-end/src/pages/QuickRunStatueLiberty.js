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

const QuickRunStatueLiberty = () => {
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
      position: { lat: 40.730827, lng: -73.997214 },
      map,
      title:
        "Washington Square Park: Washington Square Park is a 9.75-acre public park in the Greenwich Village neighborhood of Lower Manhattan, New York City. One of the best known of New York City's public parks, it is an icon as well as a meeting place and center for cultural activity.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image1,
      },
    }); //WSP

    const image2 =
      "https://untappedcities.com/wp-content/uploads/2018/05/Hudson-River-Park-Pier-Manhattan-West-Side-Secrets-NYC.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.721321, lng: -74.013074 },
      map,
      title:
        "Hudson River Park: Hudson River Park runs four miles along Manhattan’s west side attracting over 17 million visits each year. The Park provides an oasis for New Yorkers and visitors alike with a variety of recreational and educational activities.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image2,
      },
    }); //HudsonRiverPark

    const image3 =
      "https://images.immediate.co.uk/production/volatile/sites/7/2021/09/GettyImages-1279734279-24aade8.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.70124, lng: -74.015272 },
      map,
      title:
        "Statue of Liberty: The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States. The copper statue, a gift from the people of France, was designed by French sculptor Frédéric Auguste Bartholdi and its metal framework was built by Gustave Eiffel.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image3,
      },
    }); //State of Liberty

    const image4 = "https://media.timeout.com/images/100326149/image.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.703118, lng: -74.015339 },
      map,
      title:
        "The Battery: The Battery, formerly known as Battery Park, is a 25-acre public park located at the southern tip of Manhattan Island in New York City facing New York Harbor. It is bounded by Battery Place on the north, State Street on the east, New York Harbor to the south, and the Hudson River to the west.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image4,
      },
    }); //The Battery

    const image5 = "http://photos.wikimapia.org/p/00/03/31/99/30_big.jpg";
    new window.google.maps.Marker({
      position: { lat: 40.731319, lng: -73.995094 },
      map,
      title:
        "Weinstein Hall: Freshman Dorm @ NYU. It has a Chick-Fil-A in the lobby.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image5,
      },
    }); //Weinstein Hall

    //origin is set to Washington Square Park, Washington Square, New York, NY 10012
    const origin = { lat: 40.730827, lng: -73.997214 };

    //waypoint are set to multiple locations for the Statue of Liberty run
    const waypt = [
      {
        //Pier 26 at Hudson River Park, Hudson River Greenway, New York, NY 10013
        location: { lat: 40.721321, lng: -74.013074 },
        stopover: true,
      },
      {
        //Statue of Liberty View Point
        location: { lat: 40.70124, lng: -74.015272 },
        stopover: true,
      },
      {
        //The Battery, New York, NY 10004
        location: { lat: 40.703118, lng: -74.015339 },
        stopover: true,
      },
    ];

    //destination is set to Weinstein Hall, 5 University Pl, New York, NY 10003
    const destination = { lat: 40.731319, lng: -73.995094 };

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
        "Start at Washington Square Park, Washington Square, New York, NY 10012",
      description: `Head southwest on Sullivan St toward W 3rd St`,
    },
    {
      label: "Walk down Sullivan St and take a right onto Spring St",
    },
    {
      label: `Walk along Spring St, merge onto the Hudson River runway, and continue walking south`,
    },
    {
      label: "LANDMARK B: Pier 26 at Hudson River Park",
      //description: `Learn more about Strawberry Fields`,
    },
    {
      label: `Head south all the way down West St alongside the Hudson River to the bottom tip of Manhattan`,
    },
    {
      label: `LANDMARK C: Statue of Liberty View Point, Battery Park Underpass, New York, NY 10004`,
    },
    {
      label: `Head northeast and into the park`,
    },
    {
      label: `LANDMARK D: The Battery, New York, NY 10004`,
    },
    {
      label: `Head north all the way up Broadway and turn left on Waverly Place`,
    },
    {
      label: `Walk down Waverly place and turn right onto University Pl`,
    },
    {
      label: `LANDMARK E: Destination - NYU Weinstein Residence Hall`,
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
                  index === 10 ? (
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
            <Typography>Total route distance: 5 miles</Typography>
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

export default QuickRunStatueLiberty;
