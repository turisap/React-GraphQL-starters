import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { CONFIG } from '../config';
import { LOCAL_STATE_QUERY} from "../components/Cart";

function createClient({ headers }) {
  return new ApolloClient({
      uri: process.env.NODE_ENV === 'development' ? CONFIG.END_POINT_DEV : CONFIG.END_POINT_PROD,
      request: operation => {
        operation.setContext({
          fetchOptions: {
            credentials: 'include',
          },
          headers,
        });
      },
      // local state store
      clientState : {
          resolvers : {
              Mutation : {
                  toggleCart(_, variables, {cache}) {
                      const cartOpen = cache.readQuery({
                          query : LOCAL_STATE_QUERY
                      });
                      cache.writeData({
                          data : { cartOpen : !cartOpen.cartOpen }
                      })
                      return;
                  }
              }
          },
          defaults : {
            cartOpen : false
          }
      }

  });
}

export default withApollo(createClient);
