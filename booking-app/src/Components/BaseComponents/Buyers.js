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
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Grid from "@mui/material/Grid";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
}));

const Buyers = () => {
  //states
  const [data, setData] = React.useState([]);
  const [searchField, setSearchField] = React.useState("");
  const [schedualDate, setSchedualDate] = React.useState(
    new Date("2014-08-18")
  );

  //on load effect
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/sellers")
      .then((res) => {
        setData(res.data.users);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearchChanges = (e) => {
    setSearchField(e.target.value);
  };

  const handleAppointmentBooking = (e) => {
    axios
      .post("http://localhost:4000/buyers/request/creat", {
        serviceProviderId: e.currentTarget.value,
        schedualDate: schedualDate,
      })
      .then((res) => {
        alert("Your Appointment Was Booked");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box mt={"2rem"}>
        <Container
          sx={{ flexGrow: 1, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        >
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={handleSearchChanges}
                placeholder="Search the Sellers..."
                inputProps={{ "aria-label": "Search the Sellers" }}
              />
            </Search>
          </Toolbar>
          <Divider />
        </Container>
      </Box>
      {data.length != 0 && (
        <Box mt={"2rem"}>
          <Container>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {data
                .filter((value) => {
                  if (searchField == "") return value;
                  else if (
                    value.first_name
                      .toLowerCase()
                      .includes(searchField.toLowerCase())
                  )
                    return value;
                })
                .map((datum, i) => {
                  return (
                    <React.Fragment key={i}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt={datum.first_name.toUpperCase()}
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
                                    sx={{ display: "flex" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {`${datum.title}: ${datum.first_name}  ${datum.middle_name}  ${datum.last_name}, Industry:  ${datum.industry_type},`}
                                  </Typography>
                                  <Typography
                                    sx={{ display: "flex" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    Contacts:{" "}
                                    {` Phone Number: ${datum.phone_number} , E-mail:  ${datum.email}`}
                                  </Typography>
                                </Container>
                                <Container>
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6}>
                                      <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                      >
                                        <DatePicker
                                          label="Booking Date"
                                          value={schedualDate}
                                          onChange={(newValue) => {
                                            setSchedualDate(newValue);
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                          sx={{
                                            display: "inline-grid",
                                          }}
                                        />
                                      </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                      <Button
                                        value={datum.id}
                                        variant="contained"
                                        sx={{
                                          textTransform: "none",
                                          width: "100%",
                                          padding: "15px 0px",
                                          display: "block",
                                        }}
                                        onClick={handleAppointmentBooking}
                                      >
                                        Book An Appointment
                                      </Button>
                                    </Grid>
                                  </Grid>
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

export default Buyers;
