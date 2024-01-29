import "./MainContent.css";
import {
  Typography,
  Container,
  textField,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Filter } from "../Filter/Filter";
import { Product } from "../Product/Product";
import axios from "axios";

export const MainContent = ({}) => {
  const [storeFilters, setStoreFilters] = useState(["H&M"]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(false);
  // const filter = [];

  // function changeFilter(filterName) {
  //   console.log(selectedFilter);
  //   if (!(selectedFilter == filterName)) {
  //     setSelectedFilter(filterName);
  //     m;
  //   } else {
  //     setSelectedFilter("");
  //   }
  //   console.log(selectedFilter);
  // }

  async function getProducts(searchInput, label) {
    console.log("retrieving products");
    const requestBody = { input: searchInput, label: selectedFilter };
    try {
      const response = await axios.post(
        "http://localhost:3001/search-results",
        requestBody
      );
      // Handle the response as needed
      console.log("Products retrieved:", response.data);
      setProducts(response.data);
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error retrieving products:", error.message);
    }
  }

  return (
    <Container>
      <Typography align="center">All in one e-commerce repository,</Typography>
      <Typography align="center">save time when online shopping</Typography>
      <Container className="filters">
        {storeFilters.map((storeFilter) => (
          <Filter
            filterName={storeFilter}
            onClick={() => {
              if (selectedFilter != storeFilter) {
                setSelectedFilter(storeFilter);
              } else {
                setSelectedFilter("");
              }
              console.log(selectedFilter);
            }}
            isSelected={selectedFilter == storeFilter}
          />
        ))}
      </Container>
      <Alert severity="error" sx={{ display: alert ? "block" : "none" }}>
        <AlertTitle>Select a filter to proceed with the search</AlertTitle>
      </Alert>
      <SearchBar
        onClick={() => {
          console.log("clicked");
          if (selectedFilter != "") {
            getProducts("bike%20shorts", selectedFilter);
          } else {
            setAlert(true);
            console.log("set alert");
          }
        }}
      />
      {/* search results - might put in separate component */}
      <Container className="search-results">
        {products.map((product) => (
          <Product />
        ))}
      </Container>
    </Container>
  );
};
