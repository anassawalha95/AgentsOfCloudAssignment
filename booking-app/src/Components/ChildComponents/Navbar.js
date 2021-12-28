import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
const pages = new Array({ url: "Home", text: "Home" });
const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/auth/checkLogin")
      .then(function (response) {
        if (cookies.get("roleType") == "seller") {
          pages.push({ url: "Buyers", text: "View Your Service Buyers" });
        } else if (cookies.get("roleType") == "buyer") {
          pages.push({ url: "Sellers", text: "View All Services Sellers" });
        }
        setIsLoggedIn(response.data.loggedIn);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignUp = () => {
    window.location.replace("http://localhost:3000/Signup");
  };

  const handleLogIn = () => {
    window.location.replace("http://localhost:3000/Login");
  };
  const handleLogout = () => {
    axios
      .get("http://localhost:4000/auth/logout", {})
      .then(function (response) {
        cookies.remove("id", { path: "/" });
        cookies.remove("roleType", { path: "/" });
        cookies.remove("firstName", { path: "/" });
        setIsLoggedIn(false);
        window.location.replace("http://localhost:3000/Login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <AppBar position="static" style={{ background: "#459C98" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Booking Appointments
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Link
                    style={{
                      textDecoration: "none",
                      display: "block",
                      color: "black",
                    }}
                    to={`/${page.url}`}
                  >
                    {page.text}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Booking Appointments
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Link
                onClick={handleCloseNavMenu}
                key={i}
                to={`/${page.url}`}
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "block",
                  marginLeft: "2rem",
                }}
              >
                {page.text}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? (
                <MenuItem onClick={(handleCloseNavMenu, handleLogout)}>
                  <Typography textAlign="center">{"Log out"}</Typography>
                </MenuItem>
              ) : (
                [
                  <MenuItem
                    key={0}
                    onClick={(handleCloseNavMenu, handleSignUp)}
                  >
                    <Typography textAlign="center">{"Sign up"}</Typography>
                  </MenuItem>,
                  <MenuItem key={1} onClick={(handleCloseNavMenu, handleLogIn)}>
                    <Typography textAlign="center">{"Log In"}</Typography>
                  </MenuItem>,
                ]
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
