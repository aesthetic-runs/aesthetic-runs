import React from "react";
import './landing.css';
// import background from "./img/ARbackground.jpeg";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
//import CardContent from "@mui/material/CardContent";
//import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// function App() {
//   return (
//     <div style={{ backgroundImage: `url(${background})` }}>
//       Aesthetic Runs
//     </div>
//   );
// }

function Landing() {
  return (
    <div style={{ 
      width: "100%",
      height: "700px",
      //backgroundImage: `url("https://media.timeout.com/images/101705309/image.jpg")`,
      backgroundImage: `url("https://wallpaperaccess.com/full/123346.jpg")`,
    }}>

    <Stack
      sx={{ pt: 20 }}
      direction="row"
      spacing={2}
      justifyContent="center"
    >
    </Stack>

    <Typography
      component="h1"
      variant="h2"
      align="center"
      color="text.primary"
      >
      Aesthetic Runs
    </Typography>
    <Stack
      sx={{ pt: 6 }}
      direction="row"
      spacing={2}
      justifyContent="center"
    >
              {/* <Button variant="contained">Sign up!</Button> */}
    <Button
      component={RouterLink}
      to="/Registration"
      variant="contained"
    >
      Sign up!
    </Button>
    </Stack>
    </div>
  );
}

export default Landing;