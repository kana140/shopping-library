import "./Filter.css";
import { Typography, Box } from "@mui/material";
import { useState } from "react";

export const Filter = ({ filterName, index, onClick, isSelected }) => {
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
