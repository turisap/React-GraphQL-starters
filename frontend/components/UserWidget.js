import React, { Component } from "react";

class UserWidget extends Component {
  render() {
    return (
      <div className="user__widget">
        <img
          src="https://placeimg.com/100/100/people"
          className="user__avatar"
        />
        <p>Kirill Shakirov</p>
        <span>OFF BTN</span>
      </div>
    );
  }
}

export default UserWidget;
