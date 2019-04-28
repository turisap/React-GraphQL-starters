import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import propTypes from 'prop-types';

/**here we grab an item in this query based on relationship between CartItem and Item**/
const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      orders {
          id
      }
      cart {
          id
          quantity
          item {
              id
              title
              price
              image
              description
          }
      }  
    }
  }
`;

const User = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
        {payload =>  props.children(payload)}
    </Query>
);

User.propTypes = {
    children: propTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
