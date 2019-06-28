import React from "react";
import BounseLoader from "react-spinners/BounceLoader";

const Loading = () => (
  <BounseLoader
    sizeUnit={"60px"}
    size={150}
    color={"rgb(21, 189, 118)"}
    loading={true}
  />
);

export default Loading;
