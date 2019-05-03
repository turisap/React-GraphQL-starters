import React from "react";

const Widget = () => {
  setTimeout(() => {
    throw new Error("olo");
  }, 3000);
  return <h3>Widget</h3>;
};

export default Widget;
