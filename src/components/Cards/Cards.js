import {
  Container,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Avatar,
} from "@mui/material";
import React from "react";

const Cards = () => {
  return (
    <Container
      id="ContainerID"
      maxWidth="lg"
      sx={{
        pt: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          pb: 3,
        }}
      >
        Articles
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} xl={4} lg={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://www.bing.com/th?id=OVFT.vNFSD0ifAJGceWqJce5wIi&pid=News&h=367&w=700"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                my: "10px",
                mx: 0,
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto+compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                <Box sx={{ ml: 2 }}>
                  <Typography gutterBottom variant="subtitle2" component="p">
                    Author
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="p"
                    color="textSecondary"
                  >
                    Date
                  </Typography>
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cards;
