import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Booking App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleType, setRoleType] = useState("");
  const [title, setTitle] = useState("");
  const [industryType, setIndustryType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      firstName,
      middleName,
      lastName,
      phoneNumber,
      email,
      password,
      roleType,
      title,
      industryType,
    };

    axios
      .post("http://localhost:4000/auth/signup", {
        user,
      })
      .then(function (response) {
        console.log(response);
        window.location.replace("http://localhost:3000/Login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleTypeChange = (e) => {
    setRoleType(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleindustryTypeChange = (e) => {
    setIndustryType(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#459C98" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="title_label">Title</InputLabel>
                  <Select
                    labelId="title_label"
                    id="role_type"
                    value={title}
                    label="Title"
                    onChange={handleTitleChange}
                    required
                  >
                    <MenuItem value={"Mr."}>Mr.</MenuItem>
                    <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleFirstNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  name="middleName"
                  autoComplete="family-name"
                  onChange={handleMiddleNameChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleLastNameChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="role_type_label">Are You?</InputLabel>
                  <Select
                    labelId="role_type_label"
                    id="role_type"
                    value={roleType}
                    label="Are You?"
                    onChange={handleRoleTypeChange}
                    required
                  >
                    <MenuItem value={"seller"}>Service Provider</MenuItem>
                    <MenuItem value={"buyer"}>Service Requester</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={handlePhoneNumberChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="industry_type_label">
                    What Industry type You Work At?
                  </InputLabel>
                  <Select
                    labelId="industry_type_label"
                    id="industry_type"
                    value={industryType}
                    label="What Industry type You Work At?"
                    onChange={handleindustryTypeChange}
                    required
                  >
                    <MenuItem value={"Manufacturing"}>Manufacturing</MenuItem>
                    <MenuItem value={"Production"}>Production</MenuItem>
                    <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
                    <MenuItem value={"Retail"}>Retail</MenuItem>
                    <MenuItem value={"Mining"}>Mining</MenuItem>
                    <MenuItem value={"Construction"}>Construction</MenuItem>
                    <MenuItem value={"Finance"}>Finance</MenuItem>
                    <MenuItem value={"Telecommunications"}>
                      Telecommunications
                    </MenuItem>
                    <MenuItem value={"Food industry"}>Food industry</MenuItem>
                    <MenuItem value={"Investment"}>Investment</MenuItem>
                    <MenuItem value={"Transport"}>Transport</MenuItem>
                    <MenuItem value={"Insurance"}>Insurance</MenuItem>
                    <MenuItem value={"Financial services"}>
                      Financial services
                    </MenuItem>
                    <MenuItem value={"Health care"}>Health care</MenuItem>
                    <MenuItem value={"Wholesale"}>Wholesale</MenuItem>
                    <MenuItem value={"Computer"}>Computer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleEmailChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
