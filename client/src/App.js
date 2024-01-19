import React from "react";
import ".//App.css";
import { Product } from "./components/Product.js";

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
      <div className="main">
        <h1>Hello {this.state.name}!</h1>
      </div>
    );
  }
}

export default App;
