import React from "react";
import { Container, Typography } from "@mui/material";
import { Header } from "./components/Header/Header";
import { MainContent } from "./components/MainContent/MainContent";
import { Footer } from "./components/Footer/Footer";

import ".//App.css";

class App extends React.Component {
  state = {
    name: "",
  };

  componentDidMount() {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => this.setState({ name: data.name }));
  }

  render() {
    return (
      <>
        <Header />
        <MainContent />
        <Footer />
      </>
      /* <h1>Hello {this.state.name}!</h1> */
    );
  }
}

export default App;
