import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import Widget from "./Widget";

const Home = () => {
  return (
    <>
      <ErrorBoundary>
        <div>Home Page</div>
        <Widget />
      </ErrorBoundary>
    </>
  );
};

export default Home;
