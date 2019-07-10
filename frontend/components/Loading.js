import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const Loading = () => (
  <div className="loader">
    <BounceLoader
      sizeUnit={"px"}
      size={75}
      color={"rgba(87,87,87,0.99)"}
      loading={true}
    />
  </div>
);

export default Loading;
