import { BrowserRouter, Route, Routes } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";

const useStyles = makeStyles(() => ({
  appContainer: {
    backgroundColor: "#white",
    color: "black",
    minHeight: "100vh",
  }, // Ensure full page coverage
}));

const App = () => {
  const classes = useStyles(); // Correctly called inside the function

  return (
    <BrowserRouter>
      <div className={classes.appContainer}>
        {" "}
        {/* Correct class reference */}
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
};

export default App;
