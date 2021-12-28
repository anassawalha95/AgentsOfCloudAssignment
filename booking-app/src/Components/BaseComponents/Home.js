import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
const Home = () => {
  return (
    <>
      <Container>
        <Box
          sx={{
            width: "100%",
            borderColor: "palette.text.secondary",
            borderStyle: "solid",
            borderWidth: "0.5px",
            padding: "2rem",
            marginTop: "2rem",
            borderRadius: "0.7rem",
          }}
        >
          <Typography variant="h3" component="h2">
            Welcome to Our Website
          </Typography>
          <Typography variant="p">
            Feel Free to To Look For What You Need!
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Home;
