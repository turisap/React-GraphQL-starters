import React from "react";
import Link from "next/link";
import User from "./User";
import SignOut from "./SignOut";

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <div className="nav__right">
        {me && (
          <>
            <Link href="/link1">
              <a className="nav__link hvr-shadow">Link1</a>
            </Link>
            <Link href="/link2">
              <a className="nav__link hvr-shadow">Link2</a>
            </Link>
            <Link href="/link3">
              <a className="nav__link hvr-shadow">Link3</a>
            </Link>
            <SignOut />
          </>
        )}
      </div>
    )}
  </User>
);

export default Nav;
