import React from "react";
import Link from "next/link";
import User from "./User";
import SignOut from "./SignOut";

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <>
        {me && (
          <>
            <Link href="/link1">
              <a>Link1</a>
            </Link>
            <Link href="/link2">
              <a>Link2</a>
            </Link>
            <Link href="/link3">
              <a>Link3</a>
            </Link>
            <SignOut />
          </>
        )}

        {!me && (
          <>
            <Link href="/signup">
              <a>SignUp</a>
            </Link>
          </>
        )}
      </>
    )}
  </User>
);

export default Nav;
