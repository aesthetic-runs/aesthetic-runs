import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Link as RouterLink } from "react-router-dom";

function Landing() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("https://wallpaperaccess.com/full/123346.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Stack
        sx={{ pt: "35vh" }}
        direction="row"
        spacing={2}
        justifyContent="center"
      ></Stack>

      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
      >
        AESTHETIC RUNS
      </Typography>
      <Stack sx={{ pt: 6 }} direction="row" spacing={2} justifyContent="center">
        {/* <Button variant="contained">Sign up!</Button> */}
        <Button component={RouterLink} to="/Registration" variant="contained">
          Sign up
        </Button>
        <Button component={RouterLink} to="/Login" variant="contained">
          Login
        </Button>
      </Stack>
    </div>
  );
}

export default Landing;
