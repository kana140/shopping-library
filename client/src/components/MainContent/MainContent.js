import "./MainContent.css";
import { Typography, Container } from "@mui/material";
import { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Filter } from "../Filter/Filter";

export const MainContent = ({}) => {
  const [storeFilters, setStoreFilters] = useState(["H&M"]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const filterList = [];

  function changeFilterList(filterName, index) {
    if (!selectedFilters.includes(filterName)) {
      setSelectedFilters([...selectedFilters, filterName]);
    } else {
      setSelectedFilters(
        selectedFilters.filter((filter) => filter !== filterName)
      );
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
            index={storeFilters.indexOf(storeFilter)}
            onClick={() =>
              changeFilterList(storeFilter, storeFilters.indexOf(storeFilter))
            }
            isSelected={selectedFilters.includes(storeFilter)}
          />
        ))}
      </Container>
      <SearchBar />
    </Container>
  );
};
