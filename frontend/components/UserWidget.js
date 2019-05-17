import React, { Component } from "react";
import User from "./User";

class UserWidget extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <div className="user__widget">
            <img src={me.image} className="user__avatar" />
            <p>Kirill Shakirov</p>
            <span>OFF BTN</span>
          </div>
        )}
      </User>
    );
  }
}

export default UserWidget;
