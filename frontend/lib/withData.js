import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { CONFIG } from "../config";
import clientState from "./clientState";

function createClient({ headers }) {
  return new ApolloClient({
    uri:
      process.env.NODE_ENV === "development"
        ? CONFIG.END_POINT_DEV
        : CONFIG.END_POINT_PROD,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    // local state store
    clientState
  });
}

export default withApollo(createClient);
