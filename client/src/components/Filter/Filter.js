import "./Filter.css";
import { Typography, Box } from "@mui/material";
import { useState } from "react";

export const Filter = ({ filterName, onClick, isSelected }) => {
  return (
    <Box
      className={`filter ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(filterName)}
    >
      <Typography variant="subtitle1" align="center">
        {filterName}
      </Typography>
    </Box>
  );
};

// will eventually have to make option so that if the store has multiple shops for different countries within EU, then it comes up
// pop up for user to choose which site they would like to stop from
