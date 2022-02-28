import React from "react";

const NewFeature = () => {
  return <div>This is a page for new feature.</div>;
};

const NewPage = (props) => {
  return (
    <div>
      <NewFeature />
    </div>
  );
};

export { NewFeature };
export default NewPage;