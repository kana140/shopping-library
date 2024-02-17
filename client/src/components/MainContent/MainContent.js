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

  return (
    <Container>
      <Typography align="center">All in one e-commerce repository,</Typography>
      <Typography align="center">save time when online shopping</Typography>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
            <div>
              {products.length > 0 ? (
                <div>
                  <Typography align="center">
                    <b> {products.length}</b> items found{" "}
                  </Typography>
                  <br />
                </div>
              ) : (
                <p></p>
              )}

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
                  <Container>
                    <Typography align="center" variant="h6">
                      {" "}
                      No products found
                    </Typography>
                    <img src="/../../../public/sadempty.svg"></img>
                  </Container>
                )}
              </Grid>
            </div>
          )}
        </Container>
      ) : (
        <div></div>
      )}
    </Container>
  );
};
