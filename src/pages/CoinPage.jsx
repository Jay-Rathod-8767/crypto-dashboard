import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import parse from "html-react-parser";

import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import { numberWithCommas } from "../components/banner/Carousel";


const theme = createTheme();

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled("div")(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid black",
}));

// -----------------------------
// Dotted Spinner
// -----------------------------
const spinnerKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const spinnerStyle = {
  position: "relative",
  width: "50px",
  height: "50px",
  animation: "spin 1.2s linear infinite",
};

const dotStyle = {
  position: "absolute",
  width: "8px",
  height: "8px",
  backgroundColor: "#073a89",
  borderRadius: "50%",
  top: "50%",
  left: "50%",
  transformOrigin: "0 0",
};

const DottedSpinner = () => (
  <div style={spinnerStyle}>
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        style={{
          ...dotStyle,
          transform: `rotate(${i * 45}deg) translate(0, -20px)`,
        }}
      />
    ))}
  </div>
);

// -----------------------------
// CoinPage Component
// -----------------------------
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  if (!coin) {
    return (
      <>
        <style>{spinnerKeyframes}</style>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <DottedSpinner />
          <Typography variant="h6" color="textPrimary">
            Loading coin data...
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* Sidebar */}
        <Sidebar>
          <img
            src={coin.image.large}
            alt={coin.name}
            height="200"
            style={{ marginBottom: 20 }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              fontFamily: "Montserrat",
              color: "#073a89",
            }}
          >
            {coin.name}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              width: "100%",
              fontFamily: "Montserrat",
              p: 3,
              pb: 2,
              pt: 2,
              textAlign: "justify",
            }}
          >
            {coin.description?.en
              ? parse(coin.description.en.split(". ")[0])
              : "Description not available"}
          </Typography>

          {/* Coin Info Box */}
          <Box
            sx={{
              alignItems: "center",
              padding: "5px 25px",
              backgroundColor: "#073a89",
              color: "white",
              borderRadius: "10px",
              fontFamily: "Montserrat, sans-serif",
              width: "fit-content",
            }}
          >
            <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Rank:
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="h6">{coin.market_cap_rank}</Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Current Price:
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="h6">
                {symbol}{" "}
                {numberWithCommas(
                  coin.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Market Cap:
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="h6">
                {symbol}{" "}
                {numberWithCommas(
                  coin.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </Box>
          </Box>
        </Sidebar>

        {/* Coin Chart Info */}
        <CoinInfo coin={coin} />
      </Container>
    </ThemeProvider>
  );
};

export default CoinPage;
