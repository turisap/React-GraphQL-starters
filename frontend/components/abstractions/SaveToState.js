import { Component } from "react";
import Router from "next/router";

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

  routeTo = (pathname, query = {}) => {
    Router.push({
      pathname,
      query
    });
  };
}

export { SaveToState };
