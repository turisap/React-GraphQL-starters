import Link from 'next/link';
import { Mutation } from 'react-apollo';
import User from './User';
import SignOut from './SignOut';

const Nav = props => (
    <User>
        {({data : {me}}) => (
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
                  <SignOut/>
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