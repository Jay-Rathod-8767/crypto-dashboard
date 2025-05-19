// Loader.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const spinnerKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const Spinner = styled(Box)({
  position: "relative",
  width: 50,
  height: 50,
  animation: "spin 1.2s linear infinite",
  // Inject keyframes into global styles
  "@global": {
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  },
});

const Dot = styled(Box)({
  position: "absolute",
  width: 8,
  height: 8,
  backgroundColor: "#073a89",
  borderRadius: "50%",
  top: "50%",
  left: "50%",
  transformOrigin: "0 0",
});

const LoaderWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh",
  width: "100%",
});

const Loader = ({ message = "Loading..." }) => {
  return (
    <>
      <style>{spinnerKeyframes}</style>
      <LoaderWrapper>
        <Spinner>
          {[...Array(8)].map((_, i) => (
            <Dot
              key={i}
              sx={{
                transform: `rotate(${i * 45}deg) translate(0, -20px)`,
              }}
            />
          ))}
        </Spinner>
        <Typography
          variant="h6"
          sx={{ marginTop: 2, color: "#073a89", fontWeight: "bold" }}
        >
          {message}
        </Typography>
      </LoaderWrapper>
    </>
  );
};

export default Loader;
