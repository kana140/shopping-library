import "./SearchBar.css";
import { Typography, Box, TextField } from "@mui/material";
import { useState } from "react";

export const SearchBar = ({ onClick }) => {
  return (
    <Box
      className="search-bar"
      onClick={() => {
        onClick();
      }}
    >
      <TextField
        className="text-area"
        placeholder="little black dress..."
        sx={{
          "& fieldset": { border: "none" },
        }}
      />
    </Box>
  );
};
