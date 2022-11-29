import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/aesthetic-runs/aesthetic-runs"
      >
        Aesthetic Runs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3];

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Run in style.
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Have your runs be a little more pleasing to the eye.
            </Typography>
            <Stack
              sx={{ pt: 2 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            </Stack>
            <Typography
              variant="h8"
              align="center"
              color="text.secondary"
              paragraph
            >
              Aesthetic Runs aims to tailor personal goals and promote good health and wellbeing while admiring bucket list landmarks and what nature has to offer.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
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
              {/* <Button variant="outlined">Secondary action</Button> */}
            </Stack>

            <Stack
              sx={{ pt: 2 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            </Stack>
          </Container>
        </Box>

        <Container sx={{ py: 4 }} maxWidth="md">
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Check out some popular runs!
          </Typography>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://i.imgur.com/wHgMbjc.jpg"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Greenwich Village
                    </Typography>
                    <Button
                      component={RouterLink}
                      to="/QuickRunsRoutes"
                      variant="contained"
                      >
                      Run the route!
                    </Button>
                    <Typography>
                      {/* This is a media card. You can use this section to describe
                      the content. */}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small">View</Button>
                    <Button size="small">Edit</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Card>
          <CardMedia
            component="img"
            image = "https://png.pngtree.com/background/20210711/original/pngtree-colorful-people-silhouette-running-flying-corporate-culture-poster-background-picture-image_1065029.jpg"
            alt="random"
          />
        </Card>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          {/* Footer */}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {/* Something here to give the footer a purpose! */}
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
