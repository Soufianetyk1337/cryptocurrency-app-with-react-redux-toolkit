import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Avatar,
  MenuItem,
  ListItemIcon,
  MenuList,
  ListItemText,
  Box
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import icon from "../../static/images/cryptocurrency-logo.png";
const Navbar = () => {
  return (
    <Box>
      <Box
        className="nav__container"
        sx={{
          width: "250px",
          position: "fixed",
          height: "100%",
          top: "0",
          left: "0",
        }}
      >
        <Box
          className="logo__container"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "1rem 0rem 1rem 0.75rem",
          }}
        >
          <Avatar
            component="span"
            alt="CryptoCurrency Website Logo"
            src={icon}
          />
          <Link to="/">
            <Typography
              sx={{
                fontSize: "30",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              component="span"
              className="nav__logo"
            >
              CryptoNews
            </Typography>
          </Link>
        </Box>
        <MenuList
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Link to="/" style={{ width: "100%", margin: "15px 0" }}>
            <MenuItem>
              <ListItemIcon>
                <HomeIcon fontSize="small"></HomeIcon>
              </ListItemIcon>
              <ListItemText color="text.secondary">Home</ListItemText>
            </MenuItem>
          </Link>

          <Link
            style={{ width: "100%", margin: "15px 0" }}
            to="/cryptocurrencies"
          >
            <MenuItem>
              <ListItemIcon>
                <AttachMoneyIcon fontSize="small"></AttachMoneyIcon>
              </ListItemIcon>
              <ListItemText color="text.secondary">
                Cryptocurrencies
              </ListItemText>
            </MenuItem>
          </Link>

          <Link style={{ width: "100%", margin: "15px 0" }} to="/exchanges">
            <MenuItem>
              <ListItemIcon>
                <TrendingUpIcon fontSize="small"></TrendingUpIcon>
              </ListItemIcon>
              <ListItemText color="text.secondary">Exchanges</ListItemText>
            </MenuItem>
          </Link>

          <Link style={{ width: "100%", margin: "15px 0" }} to="/news">
            <MenuItem>
              <ListItemIcon>
                <LightbulbIcon fontSize="small"></LightbulbIcon>
              </ListItemIcon>
              <ListItemText color="text.secondary">News</ListItemText>
            </MenuItem>
          </Link>
        </MenuList>
      </Box>
    </Box>
  );
};

export default Navbar;
