import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";

import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";

// Utility: Format numbers with commas
export function numberWithCommas(value) {
  if (value === undefined || value === null) return "N/A";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Loader component showing spinner and message
const Loader = ({ message = "Loading..." }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="60vh"
    width="100%"
  >
    <CircularProgress color="primary" />
    <Typography mt={2} fontSize={16} fontWeight={500} color="#073a89">
      {message}
    </Typography>
  </Box>
);

const CryptoList = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trending coins:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
    const interval = setInterval(fetchTrendingCoins, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [currency]);

  if (loading) {
    return <Loader message="Loading Trending Coins..." />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 7,
          animation: "scrolling 5s linear infinite",
        }}
      >
        {trending.map((coin) => {
          const profit = coin?.price_change_percentage_24h >= 0;

          return (
            <Link
              to={`/coins/${coin.id}`}
              key={coin.id}
              style={{ textTransform: "uppercase", color: "blue" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: 2,
                  borderRadius: 2,
                  backgroundColor: "#ffffff",
                  width: 120,
                  transition: "transform 0.4s ease-in-out",
                  "&:hover": { transform: "scale(1.15)" },
                }}
              >
                <img src={coin?.image} alt={coin.name} height="80" />
                <Typography sx={{ fontWeight: "bold", mt: 1, color: "black" }}>
                  {coin?.symbol}
                </Typography>
                <span style={{ fontSize: 16, fontWeight: 500, color: "blue" }}>
                  {symbol}
                  {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: profit ? "green" : "red",
                  }}
                >
                  {profit && "+"}
                  {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </Box>
            </Link>
          );
        })}
      </Box>

      <style>
        {`
          @keyframes scrolling {
            0% { transform: translateX(0); }
            100% { transform: translateX(-30%); }
          }
        `}
      </style>
    </Box>
  );
};

export default CryptoList;
