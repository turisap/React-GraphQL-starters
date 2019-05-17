import { Component } from "react";

class SaveToState extends Component {
  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
}

export { SaveToState };
