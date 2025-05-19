import React from "react";
import {
  AppBar,
  MenuItem,
  Select,
  Toolbar,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "black",
    width: "150px",
    height: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "start",
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();

  return (
    <AppBar sx={{ backgroundColor: "white" }} position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <img src="/logo.png" alt="CryptoEngine Logo" style={{ height: 54 }} />
        </div>

        {/* Group the rest into a container and align left */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Navigation Tabs */}
          <Tabs
            textColor="primary"
            indicatorColor="primary"
            value={false}
            sx={{
              "& .MuiTab-root": {
                fontFamily: "Montserrat",
                color: "#073a89",
                fontSize: "16px",
                padding: "12px 20px",
                minWidth: "100px",
                borderRadius: "6px",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#073a89",
                  color: "#fff",
                },
              },
            }}
          >
            <Tab label="Home" onClick={() => navigate("/")} />
            <Tab label="Markets" />
            <Tab label="News" />
            <Tab label="About" />
          </Tabs>

          {/* "Open Account" button */}
          <Button
            variant="outlined"
            
            sx={{
              color: "#073a89",
              borderColor: "#073a89",
              textTransform: "none",
              fontWeight: 600,
              width: 100,
              height: 40,
              fontFamily: "Montserrat",
              lineHeight: 1.2,
              "&:hover": {
                backgroundColor: "#073a89",
                color: "#fff",
                borderColor: "#073a89",
              },
            }}
          >
            Open Account
          </Button>

          {/* Currency Selector */}
          <Select
            variant="outlined"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            sx={{
              width: 100,
              height: 40,
              fontFamily: "Montserrat",
              marginRight:10,
               color: "#073a89",
               
            }}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
