import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import Button from "@mui/material/Button";

const Sellers = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:4000/buyers/requests").then((res) => {
      setData(res.data);
    });
  }, []);

  function handleAcception(e) {
    const values = e.currentTarget.value.split(",");

    axios
      .put("http://localhost:4000/sellers/request", {
        service_requester_id: values[0],
        appointment_status: "accepted",
        appointment_id: values[1],
      })
      .then((res) => {
        setData(res.data);
      });
  }

  function handleRejection(e) {
    const values = e.currentTarget.value.split(",");

    axios
      .put("http://localhost:4000/sellers/request", {
        service_requester_id: values[0],
        appointment_status: "rejected",
        appointment_id: values[1],
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {data.length != 0 && (
        <Box mt={"2rem"}>
          <Container>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {data.map((datum, i) => {
                return (
                  <React.Fragment key={i}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt={datum.User.first_name.toUpperCase()}
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alighItems: "center",
                              }}
                            >
                              <Container>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {`${datum.User.title}: ${datum.User.first_name}  ${datum.User.middle_name}  ${datum.User.last_name}, Industry:  ${datum.User.industry_type},`}
                                </Typography>

                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Contacts:{" "}
                                  {` Phone Number: ${datum.User.phone_number} , E-mail:  ${datum.User.email}`}
                                </Typography>
                              </Container>
                              <Container
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                  alighItems: "center",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  sx={{
                                    textTransform: "none",
                                    width: "40%",
                                    bgcolor: "success.light",
                                    "&:hover": {
                                      backgroundColor: "success.dark",
                                    },
                                  }}
                                  onClick={handleAcception}
                                  value={[datum.service_requester_id, datum.id]}
                                >
                                  Accepts
                                </Button>
                                <Button
                                  variant="contained"
                                  sx={{
                                    textTransform: "none",
                                    width: "40%",
                                    bgcolor: "error.main",
                                    "&:hover": {
                                      backgroundColor: "error.dark",
                                    },
                                  }}
                                  onClick={handleRejection}
                                  value={[datum.service_requester_id, datum.id]}
                                >
                                  Reject
                                </Button>
                              </Container>
                            </Box>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })}
            </List>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Sellers;
