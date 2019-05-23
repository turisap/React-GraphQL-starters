import { Component } from "react";

class SaveToState extends Component {
  resetState = () => {
    const keys = Object.keys(this.state);
    keys.forEach(property => this.setState({ [property]: "" }));
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
}

export { SaveToState };
