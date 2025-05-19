import { makeStyles } from "@mui/styles";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./6379114.jpg)",
    backgroundSize: "cover", // OR use "contain"
    backgroundPosition: "center",
    height: 400,
    width: "100%",
  },
  bannerContent: {
    height: 400,
    position: "fit",
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              color: "white",
              marginBottom: 20,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Engine...
          </Typography>

          <Typography
            variant="subtitle2"
            style={{
              color: "white",
              textTransform: "capitalize",
            }}
          >
            The Ultimate Crypto Dashboard Designed to Equip You with Real-Time
            Trends,
            <br />
            Historical Data, and Smart Tools for Confident Investing and Trading
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
