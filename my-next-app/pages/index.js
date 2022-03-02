import React from "react";
import FeatureTabs from "../components/feature-tabs";

const MainPage = (props) => {
  return (
    <div>
      <FeatureTabs { ...props } />
    </div>
  );
};

export default MainPage;
