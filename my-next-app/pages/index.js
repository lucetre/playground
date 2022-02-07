import React from "react";
import Tabs from "../components/Tabs";
import NewFeature from "./new";

const PageOne = (props) => {
  return (
    <div>
      Home
      <Tabs />
      <NewFeature></NewFeature>
    </div>
  );
};

export default PageOne;
