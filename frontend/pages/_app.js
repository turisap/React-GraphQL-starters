/* eslint-disable no-unused-vars */
import React from "react";
import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import { FormProvider } from "react-advanced-form";
import validationMessages from "../lib/validationMessages";
import validationRules from "../lib/validationRules";
import WithData from "../lib/withData";
import css from "../styles/styles.scss";
/* eslint-enable no-unused-vars */

// TODO minimize the application build (read an article)
// TODO make a page loading like here https://redd.gitbook.io/react-advanced-form/getting-started/handle-submit

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <FormProvider messages={validationMessages} rules={validationRules}>
            <Page>
              <Component {...pageProps} />
            </Page>
          </FormProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default WithData(MyApp);
