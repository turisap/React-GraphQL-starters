import React from "react";
//
// import User from "./User";
// import SignOut from "./SignOut";

const Nav = () => (

  <User>
    {({ data: { me } }) => (
      <div className="nav__right">
        {me && (
          <>
            <SignOut />
          </>
        )}
      </div>
    )}
  </User>
);

export default Nav;
