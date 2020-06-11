import React from "react";
import ContentLoader from "react-content-loader";

const DataBlockLoader = (props) => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={320}
    viewBox="0 0 370 320"
    backgroundColor="#d9d9d9"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="9" rx="6" ry="6" width="357" height="93" />
    <rect x="5" y="113" rx="6" ry="6" width="357" height="93" />
    <rect x="5" y="216" rx="6" ry="6" width="357" height="93" />
  </ContentLoader>
);

export default DataBlockLoader;
