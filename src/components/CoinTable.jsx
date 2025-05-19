import { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../CryptoContext"; // Correctly importing CryptoState
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import { numberWithCommas } from "./Banner/Carousel";
import { makeStyles } from "@mui/styles"; // Ensure correct import for v4 users

import {
  Container,
  TableCell,
  LinearProgress,
  TextField,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  Typography,
  TableBody,
} from "@mui/material";

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#d2e9f7",
    },
    fontFamily: "Montserrat",
  },
}));

const CoinTable = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState(); // ✅ Fix applied: added 'symbol'

  const navigate = useNavigate();
  const classes = useStyles();

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coin.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <Container>
      <Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat" }}>
        The price of cryptocurrency based on its market capitalization.
      </Typography>
      <TextField
        label="Search for a Crypto Currency.."
        variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "blue" }} />
        ) : (
          <Table>
            <TableHead style={{ backgroundColor: "#073a89" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      color: "white",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align={head === "Coin" ? "left" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {handleSearch().map((row) => {
                const profit = row.price_change_percentage_24h > 0;

                return (
                  <TableRow
                    onClick={() => navigate(`/coins/${row.id}`)}
                    key={row.name}
                    className={classes.row} // ✅ Applied styling
                  >
                     
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        gap: "15px",
                      }}
                    >
                      <img
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{ marginBottom: 10 }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: 22,
                          }}
                        >
                          {row.symbol}
                        </span>
                        {row.name}
                      </div>
                    </TableCell>

                    <TableCell align="right">
                      {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>

                    <TableCell
                      align="right"
                      style={{
                        color: profit ? "green" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>

                    <TableCell align="right">
                      {symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))} M
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          
        )}
      </TableContainer>

    
    </Container>
  );
};

export default CoinTable;
