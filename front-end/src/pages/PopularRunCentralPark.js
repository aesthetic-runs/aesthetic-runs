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

const PopularRunCentralPark = () => {
  const apiIsLoaded = (map, maps) => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

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
      label: "LANDMARK B: North Woods Loch Waterfall, Central Park, Loch Walking Path, New York, NY 10025",
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
            <Typography>Total route distance: 5 miles</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default PopularRunCentralPark;


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

//       //origin is set to Central Park North (110 St)
//       const origin = { lat: 40.79939, lng: -73.952404 };

//       //waypoint are set to multiple locations for the Statue of Liberty run
//       const waypt = [
//         {
//           //North Woods Loch Waterfall, Central Park, Loch Walking Path, New York, NY 10025
//           location: { lat: 40.79765, lng: -73.956022 },
//           stopover: true,
//         },
//         {
//           //Glen Span Arch
//           location: { lat: 40.79508, lng: -73.959318 },
//           stopover: true,
//         },
//         {
//           //Jacqueline Kennedy Onassis Reservoir, New York, NY 10128
//           location: { lat: 40.787578, lng: -73.962631 },
//           stopover: true,
//         },
//         {
//           //The Metropolitan Museum of Art, 1000 5th Ave, New York, NY 10028
//           location: { lat: 40.781274, lng: -73.962803 },
//           stopover: true,
//         },
//         {
//           //American Museum of Natural History, 200 Central Park West, New York, NY 10024
//           location: { lat: 40.783029, lng: -73.974219 },
//           stopover: true,
//         },
//         {
//           //Bethesda Fountain, New York, NY 10024
//           location: { lat: 40.775945, lng: -73.970957 },
//           stopover: true,
//         },
//         {
//           //Sheep Meadow, 1802 65th Street Transverse, New York, NY 10065
//           location: { lat: 40.771785, lng: -73.974819 },
//           stopover: true,
//         },
//         {
//           //Wollman Rink, Central Park S, New York, NY 10019
//           location: { lat: 40.76873, lng: -73.974476 },
//           stopover: true,
//         },
//       ];

//       //destination is set to Columbus Circle, 848 Columbus Cir, New York, NY 10019
//       const destination = { lat: 40.769055, lng: -73.981686 };

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
//             Popular Run: Central Park - 5 miles
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