import React, { Component } from "react";
import User from "./User";

class UserWidget extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            {me && (
              <div className="user__widget">
                <div className="user__avatarContaier">
                  <img
                    src={me.image || "https://i.pravatar.cc/300"}
                    className="user__avatar"
                  />
                </div>
                <p>{me.name}</p>
              </div>
            )}
          </>
        )}
      </User>
    );
  }
}

export default UserWidget;
