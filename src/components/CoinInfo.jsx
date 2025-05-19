import React, { useEffect, useState, useRef } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/Data";

import { ThemeProvider, styled, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import zoomPlugin from "chartjs-plugin-zoom";
import Loader from "./Loader";
import Footer from "./Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

// Styled Components
const Container = styled(Box)(({ theme }) => ({
  width: "75%",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  padding: 20,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 0,
    padding: 10,
    paddingTop: 0,
  },
}));

const LoaderWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "60vh",
  width: "100%",
});

const ChartWrapper = styled(Box)({
  width: "100%",
  height: "70vh",
  position: "relative",
});

const DaySelector = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: 20,
  gap: 10,
});

const DayButton = styled("button")(({ selected }) => ({
  cursor: "pointer",
  padding: "8px 16px",
  borderRadius: 5,
  border: selected ? "2px solid #073a89" : "1px solid gray",
  backgroundColor: selected ? "#073a89" : "transparent",
  color: selected ? "#fff" : "#073a89",
  fontWeight: 600,
  fontSize: 14,
  outline: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#073a89",
    color: "#fff",
    border: "2px solid #073a89",
  },
}));

const CoinInfo = ({ coin = {} }) => {
  const [historicData, setHistoricData] = useState(null);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  const fetchHistoricData = async () => {
    try {
      setError(null);
      setHistoricData(null);
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data.prices);
    } catch (err) {
      console.error("Failed to fetch historic data:", err);
      setError("Failed to load data. Please try again later.");
    }
  };

  useEffect(() => {
    if (coin?.id) {
      fetchHistoricData();
    }
  }, [currency, days, coin?.id]);

  const theme = createTheme({
    palette: {
      primary: { main: "#fff" },
      mode: "dark",
    },
  });

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const preventPageScroll = (e) => {
    if (e.target.tagName === "CANVAS") {
      e.preventDefault();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {!historicData && !error ? (
          <LoaderWrapper>
            <Loader />
            {/* <Box mt={2} fontSize={16} fontWeight={500} color="#073a89">
              Loading Graph Data...
            </Box> */}
          </LoaderWrapper>
        ) : error ? (
          <Box color="error.main" mt={4}>
            {error}

          </Box>
        ) : (
          <>
            <ChartWrapper onWheel={preventPageScroll}>
              <Line
                ref={chartRef}
                key={days}
                data={{
                  labels: historicData.map((point) =>
                    days === 1
                      ? formatTime(point[0])
                      : new Date(point[0]).toLocaleDateString()
                  ),
                  datasets: [
                    {
                      data: historicData.map((point) => point[1]),
                      label: `Price (past ${days} day${days > 1 ? "s" : ""}) in ${currency}`,
                      borderColor: "#073a89",
                      backgroundColor: "rgba(7, 58, 137, 0.5)",
                      fill: true,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  elements: { point: { radius: 1 } },
                  scales: {
                    x: { ticks: { maxTicksLimit: 10 } },
                    y: {},
                  },
                  plugins: {
                    legend: { display: true, position: "top" },
                    tooltip: { mode: "index", intersect: false },
                    zoom: {
                      pan: {
                        enabled: true,
                        mode: "xy",
                        modifierKey: "ctrl",
                      },
                      zoom: {
                        wheel: {
                          enabled: true,
                          modifierKey: "ctrl",
                        },
                        pinch: {
                          enabled: true,
                        },
                        mode: "xy",
                      },
                      limits: {
                        x: { min: "original", max: "original" },
                        y: { min: "original", max: "original" },
                      },
                    },
                  },
                }}
              />
            </ChartWrapper>

            <button
              onClick={() => chartRef.current?.resetZoom()}
              style={{
                marginTop: 10,
                padding: "6px 12px",
                cursor: "pointer",
                backgroundColor: "#073a89",
                color: "#fff",
                border: "none",
                borderRadius: 4,
              }}
            >
              Reset Zoom
            </button>

            <DaySelector>
              {chartDays.map(({ label, value }) => (
                <DayButton
                  key={value}
                  selected={value === days}
                  onClick={() => setDays(value)}
                  type="button"
                  aria-pressed={value === days}
                >
                  {label}
                </DayButton>
              ))}
            </DaySelector>
          </>
        )}
      </Container>
     
    </ThemeProvider>
  );

  
};

export default CoinInfo;
