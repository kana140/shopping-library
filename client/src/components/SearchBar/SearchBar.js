import "./SearchBar.css";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  SvgIcon,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { STORE_FILTERS } from "../../constants.js";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export const SearchBar = ({
  searchQuery,
  selectedFilter,
  onSearch,
  onClick,
  setSelectedFilter,
  setSearchQuery,
}) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFilter(value);
    console.log(selectedFilter);
  };
  return (
    <Box className="search-bar" display="flex" alignItems="center">
      <FormControl sx={{ m: 1, width: 200, margin: 0 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedFilter}
          onChange={handleChange}
          MenuProps={MenuProps}
          sx={{
            borderRadius: "100px 0 0 100px",
            borderColor: "#c0a5a5",
            borderWidth: "2px",
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            backgroundColor: "#f2c9c9",
          }} //put this in a theme componentn thing
        >
          {STORE_FILTERS.map((storeFilter) => (
            <MenuItem key={storeFilter} value={storeFilter}>
              <Typography textAlign={"center"}> {storeFilter} </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box flex="1" display="flex" alignItems="center">
        <TextField
          className="text-area"
          onInput={(e) => {
            setSearchQuery(e.target.value);
          }}
          sx={{
            "& fieldset": { border: "none" },
          }}
        />
        <IconButton
          type="submit"
          aria-label="search"
          onClick={() => {
            onSearch();
            console.log("search clicked");
            console.log(searchQuery);
          }}
        >
          <SearchIcon className="search-icon" fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};
