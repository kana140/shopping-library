import "./Header.css";
import { Typography, Container } from "@mui/material";
import { useState } from "react";

export const Header = ({}) => {
  return (
    <Container className="heading">
      <Typography variant="h2" align="center">
        {" "}
        One Tab Fits All{" "}
      </Typography>
    </Container>
  );
};
