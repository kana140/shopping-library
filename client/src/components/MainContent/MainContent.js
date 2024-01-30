import "./MainContent.css";
import {
  Typography,
  Container,
  textField,
  TextField,
  Alert,
  AlertTitle,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Filter } from "../Filter/Filter";
import { Product } from "../Product/Product";

import axios from "axios";

export const MainContent = ({}) => {
  const [storeFilters, setStoreFilters] = useState(["H&M"]);
  const [selectedFilter, setSelectedFilter] = useState("H&M");
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  async function getProducts() {
    console.log("retrieving products");
    const requestBody = { input: searchQuery, label: selectedFilter };
    console.log(searchQuery, selectedFilter);
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/search-results",
        requestBody
      );
      // Handle the response as needed
      console.log("Products retrieved:", response.data.data);
      setProducts(response.data.data);
      setProductsLoaded(true);
      setIsLoading(false);
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error retrieving products:", error.message);
    }
  }
  // const handleSearch = () => {
  //   //getProducts(searchQuery, selectedFilter);
  //   console.log(searchQuery, selectedFilter);
  // };

  return (
    <Container>
      <Typography align="center">All in one e-commerce repository,</Typography>
      <Typography align="center">save time when online shopping</Typography>
      {/* <Container className="filters">
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
      </Container> */}
      {/* <Alert severity="error" sx={{ display: alert ? "block" : "none" }}>
        <AlertTitle>Select a filter to proceed with the search</AlertTitle>
      </Alert> */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        // onClick={() => {
        //   // console.log("clicked");
        //   // console.log(selectedFilter);
        //   // // if (selectedFilter != "")
        //   // getProducts("bike%20shorts", selectedFilter);
        // }
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        onSearch={getProducts}
      />
      {/* search results - might put in separate component */}
      {productsLoaded || isLoading ? (
        <Container className="search-results">
          {isLoading ? (
            <Container
              className="loading-bar"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress sx={{ color: "#f08080", margin: "auto" }} />
            </Container>
          ) : (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product, index) => (
                  <Grid
                    item
                    xs={4}
                    sm={3}
                    md={3}
                    key={index}
                    className="grid-item"
                  >
                    <Product product={product} key={product.id} />
                  </Grid>
                ))
              ) : (
                <p>No products available</p>
              )}
            </Grid>
          )}
        </Container>
      ) : (
        <div></div>
      )}
    </Container>
  );
};
