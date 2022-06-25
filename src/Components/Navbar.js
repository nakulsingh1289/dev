import * as React from "react";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AppBar from "@mui/material/AppBar";
import { AuthContext } from "../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExploreIcon from "@material-ui/icons/Explore";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@material-ui/icons/MoreVert";
import Toolbar from "@mui/material/Toolbar";
import insta from "../Assets/Instagram.JPG";
import { useNavigate } from "react-router-dom";

export default function Navbar({ userData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();
  const { logout } = React.useContext(AuthContext);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleProfile = () => {
    navigate(`/profile/${userData.userId}`);
  };
  const handleBannerClick = () => {
    navigate("/");
  };
  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };
  const handleExplore = () => {
    let win = window.open("https://www.pepcoding.com", "_blank");
    win.focus();
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        <AccountCircleIcon />
        <p>&nbsp;&nbsp;</p>Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ExitToAppIcon />
        <p>&nbsp;&nbsp;</p>Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        <AccountCircleIcon />
        <p>&nbsp;&nbsp;</p>Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ExitToAppIcon />
        <p>&nbsp;&nbsp;</p>Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: "white" }}>
        <Toolbar>
          <div style={{ marginLeft: "5%" }}>
            <img
              src={insta}
              style={{ width: "20vh" }}
              onClick={handleBannerClick}
              alt=""
            />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              color: "black",
              alignItems: "center",
              marginRight: "8rem",
            }}
          >
            <HomeIcon
              onClick={handleBannerClick}
              sx={{ marginRight: "1rem", cursor: "pointer" }}
            />
            <ExploreIcon
              onClick={handleExplore}
              sx={{ marginRight: "1rem", cursor: "pointer" }}
            />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                src={userData?.profileUrl}
                sx={{ height: "2rem", width: "2rem" }}
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
