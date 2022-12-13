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

const PopularRunCentralPark = () => {
  const isLastStep = useRef(false);
  const apiIsLoaded = (map, maps) => {

    var rendererOptions = {
      map: map,
      suppressMarkers: true
    }

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer(rendererOptions);
    directionsRenderer.setMap(map);

    const image1 = "https://www.fitnyc.edu/images/cer/master-brand-button.jpg";
    const beachMarker1 = new window.google.maps.Marker({
      position: { lat: 40.79939, lng: -73.952404 },
      map,
      title: "Central Park North (110 St): 110th Street is a street in the New York City borough of Manhattan. It is commonly known as the boundary between Harlem and Central Park, along which it is known as Central Park North.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image1
    },
    }); //Central Park North (110 St)

    const image2 = "https://www.fitnyc.edu/images/cer/master-brand-button.jpg";
    const beachMarker2 = new window.google.maps.Marker({
      position: { lat: 40.79765, lng: -73.956022 },
      map,
      title: "North Woods Loch Waterfall: The Loch, known for its three waterfalls, is the long, narrow watercourse that flows through the Ravine in the North Woods.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image2
    },
    }); //North Woods Loch Waterfall, Central Park, Loch Walking Path, New York, NY 10025

    const image3 = "https://www.fitnyc.edu/images/cer/master-brand-button.jpg";
    const beachMarker3 = new window.google.maps.Marker({
      position: { lat: 40.79508, lng: -73.959318 },
      map,
      title: "Glen Span Arch: Glen Span Arch, carrying the West Drive across 102nd Street, serves as a gateway to the wooded and secluded Loch to the northeast.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image3
    },
    }); //Glen Span Arch, W 102nd St, New York, NY 10025

    const image4 = "https://www.fitnyc.edu/images/cer/master-brand-button.jpg";
    const beachMarker4 = new window.google.maps.Marker({
      position: { lat: 40.787578, lng: -73.962631 },
      map,
      title: "Jacqueline Kennedy Onassis Reservoir: The Jacqueline Kennedy Onassis Reservoir, also known as Central Park Reservoir, is a decommissioned reservoir in Central Park in the borough of Manhattan, New York City, stretching from 86th to 96th Streets. It covers 106 acres and holds over 10⁹ US Gal. of water.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image4
    },
    }); //Jacqueline Kennedy Onassis Reservoir, New York, NY 10128

    const image5 = "https://www.moma.org/assets/visit/entrance-image--museum-crop-7516b01003659172f2d9dbc7a6c2e9d9.jpg";
    const beachMarker5 = new window.google.maps.Marker({
      position: { lat: 40.781274, lng: -73.962803 },
      map,
      title: "Museum of Modern Art: Founded in 1929, The Museum of Modern Art (MoMA) in midtown Manhattan was the first museum devoted to the modern era.",
      icon: {
        size: new window.google.maps.Size(40, 35),
        scaledSize: new window.google.maps.Size(40, 35),
        url: image5
    },
    }); //The Metropolitan Museum of Art, 1000 5th Ave, New York, NY 10028

    const image6 = "https://www.fitnyc.edu/images/cer/master-brand-button.jpg";
    const beachMarker6 = new window.google.maps.Marker({
      position: { lat: 40.783029, lng: -73.974219 },
      map,
      title: "American Museum of Natural History: The American Museum of Natural History is a natural history museum on the Upper West Side of Manhattan in New York City.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image6
    },
    }); //American Museum of Natural History, 200 Central Park West, New York, NY 10024

    const image7 = "https://www.fitnyc.edu/images/cer/master-brand-button.jpg";
    const beachMarker7 = new window.google.maps.Marker({
      position: { lat: 40.775945, lng: -73.970957 },
      map,
      title: "Bethesda Fountain: Bethesda Terrace and Fountain are two architectural features overlooking the southern shore of the Lake in New York City's Central Park. The fountain, with its Angel of the Waters statue, is located in the center of the terrace.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image7
    },
    }); //Bethesda Fountain, New York, NY 10024

    const image8 = "https://www.fitnyc.edu/images/cer/master-brand-button.jpg";
    const beachMarker8 = new window.google.maps.Marker({
      position: { lat: 40.771785, lng: -73.974819 },
      map,
      title: "Sheep Meadow: Sheep Meadow is a 15-acre meadow near the southwestern section of Central Park, between West 66th and 69th Streets in Manhattan, New York City. It is adjacent to Central Park Mall to the east, The Ramble and Lake to the north, West Drive to the west, and Heckscher Playground and Ballfields to the south.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image8
    },
    }); //Sheep Meadow, 1802 65th Street Transverse, New York, NY 10065

    const image9 = "https://www.fitnyc.edu/images/cer/master-brand-button.jpg";
    const beachMarker9 = new window.google.maps.Marker({
      position: { lat: 40.76873, lng: -73.974476 },
      map,
      title: "Wollman Rink: Wollman Rink is a public ice rink in the southern part of Central Park, Manhattan, New York City. It is named after the Wollman family who donated the funds for its original construction. The rink is open for ice skating from late October to early April.",
      icon: {
        size: new window.google.maps.Size(40, 30),
        scaledSize: new window.google.maps.Size(40, 30),
        url: image9
    },
    }); //Wollman Rink, Central Park S, New York, NY 10019

    const image10 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQojINAyZbTCMaTgTNDBKyvGMPo7SjL07jBHjhdkc2bS9el1Xad7bNPxpiKNzILzrIHwSQ&usqp=CAU";
    const beachMarker10 = new window.google.maps.Marker({
      position: { lat: 40.769055, lng: -73.981686 },
      map,
      title: "Columbus Circle: Columbus Circle is a traffic circle and heavily trafficked intersection in the New York City borough of Manhattan, located at the intersection of Eighth Avenue, Broadway, Central Park South, and Central Park West, at the southwest corner of Central Park.",
      icon: {
        size: new window.google.maps.Size(40, 35),
        scaledSize: new window.google.maps.Size(40, 35),
        url: image10
    },
    }); //Columbus Circle, 848 Columbus Cir, New York, NY 10019

    //origin is set to Central Park North (110 St)
    const origin = { lat: 40.79939, lng: -73.952404 };

    //waypoint are set to multiple locations for the Central park run
    const waypt = [
      {
        //North Woods Loch Waterfall, Central Park, Loch Walking Path, New York, NY 10025
        location: { lat: 40.79765, lng: -73.956022 },
        stopover: true,
      },
      {
        //Glen Span Arch, W 102nd St, New York, NY 10025
        location: { lat: 40.79508, lng: -73.959318 },
        stopover: true,
      },
      {
        //Jacqueline Kennedy Onassis Reservoir, New York, NY 10128
        location: { lat: 40.787578, lng: -73.962631 },
        stopover: true,
      },
      {
        //The Metropolitan Museum of Art, 1000 5th Ave, New York, NY 10028
        location: { lat: 40.781274, lng: -73.962803 },
        stopover: true,
      },
      {
        //American Museum of Natural History, 200 Central Park West, New York, NY 10024
        location: { lat: 40.783029, lng: -73.974219 },
        stopover: true,
      },
      {
        //Bethesda Fountain, New York, NY 10024
        location: { lat: 40.775945, lng: -73.970957 },
        stopover: true,
      },
      {
        //Sheep Meadow, 1802 65th Street Transverse, New York, NY 10065
        location: { lat: 40.771785, lng: -73.974819 },
        stopover: true,
      },
      {
        //Wollman Rink, Central Park S, New York, NY 10019
        location: { lat: 40.76873, lng: -73.974476 },
        stopover: true,
      },
    ];

    //destination is set to Columbus Circle, 848 Columbus Cir, New York, NY 10019
    const destination = { lat: 40.769055, lng: -73.981686 };

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
      label: "Start at Central Park North (110 St)",
      description: `Head southeast on Central Park N toward Lenox Ave/Malcolm X Blvd`,
    },
    {
      label:
        "LANDMARK B: North Woods Loch Waterfall, Central Park, Loch Walking Path, New York, NY 10025",
      //description: `Learn more about Chelsea Piers`,
    },
    {
      label: `Turn right onto Malcolm X Blvd then take a slight left onto Loch Walking Path`,
    },
    {
      label: `Head southwest on Loch Walking Path`,
    },
    {
      label: `LANDMARK C: Glen Span Arch, W 102nd St, New York, NY 10025`,
    },
    {
      label: `Continue to follow the Loch Walking Path and turn left onto Central Park West`,
    },
    {
      label: `Head southwest on Central Park West toward W 101st St`,
    },
    {
      label: `Turn left at W 96th St and then turn right onto Shuman Running Track`,
    },
    {
      label: `LANDMARK D: Jacqueline Kennedy Onassis Reservoir, New York, NY 10128`,
      description: "Head west on Shuman Running Track",
    },
    {
      label: `Turn right toward Bridle Path then immediately turn left onto the Bridle Path`,
    },
    {
      label: `Merge into 86th St Transverse and then turn right on 84th St`,
    },
    {
      label: `Continue south 84th St and turn right onto 5th Ave/Museum Mile`,
    },
    {
      label: `LANDMARK E: The Metropolitan Museum of Art, 1000 5th Ave, New York, NY 10028h`,
      description: "Head southwest on 5th Ave/Museum Mile toward E 82nd St",
    },
    {
      label: `Turn left towards and onto Great Lawn Oval`,
    },
    {
      label: `Turn right at Bridle Path, then turn left onto Central Park West`,
    },
    {
      label: `LANDMARK F: American Museum of Natural History, 200 Central Park West, New York, NY 10024`,
      description: "Head southwest on Central Park West toward W 77th St",
    },
    {
      label: `Turn left onto W 77th St, then turn right towards Oak Bridge`,
    },
    {
      label: `Turn right toward Bow Bridge and continue onto Bow Bridge`,
    },
    {
      label: `LANDMARK G: Bethesda Fountain, New York, NY 10024`,
      description: "Head south toward The Mall",
    },
    {
      label: `Turn right onto The Mall and follow on the Nell Singer Lilac Walk`,
    },
    {
      label: `LANDMARK H: Sheep Meadow, 1802 65th Street Transverse, New York, NY 10065`,
    },
    {
      label: `Head south on Nell Singer Lilac Walk and turn right toward Center Drive`,
    },
    {
      label: `Turn left onto Center Drive then turn left onto W 59th St/Central Park S`,
    },
    {
      label: `LANDMARK I: Wollman Rink, Central Park S, New York, NY 10019`,
    },
    {
      label: `Head northwest on W 59th St/Central Park S then take the crosswalk`,
    },
    {
      label: `LANDMARK J: Columbus Circle, 848 Columbus Cir, New York, NY 10019`,
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
                  index === 25 ? (
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

export default PopularRunCentralPark;
