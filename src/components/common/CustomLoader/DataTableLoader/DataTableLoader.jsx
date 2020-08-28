import React from "react";
import ContentLoader from "react-content-loader";

const DataTableLoader = (props) => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={"auto"}
    viewBox="0 0 620 125"
    backgroundColor="#d9d9d9"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="25" y="15" rx="5" ry="5" width="270" height="10" />
    <rect x="310" y="15" rx="5" ry="5" width="110" height="10" />
    <rect x="435" y="15" rx="5" ry="5" width="170" height="10" />
    <rect x="-1" y="15" rx="0" ry="0" width="12" height="12" />
    <rect x="25" y="42" rx="5" ry="5" width="270" height="10" />
    <rect x="310" y="42" rx="5" ry="5" width="110" height="10" />
    <rect x="435" y="42" rx="5" ry="5" width="170" height="10" />
    <rect x="-1" y="42" rx="0" ry="0" width="12" height="12" />
    <rect x="25" y="72" rx="5" ry="5" width="270" height="10" />
    <rect x="310" y="72" rx="5" ry="5" width="110" height="10" />
    <rect x="435" y="72" rx="5" ry="5" width="170" height="10" />
    <rect x="-1" y="72" rx="0" ry="0" width="12" height="12" />
    <rect x="25" y="102" rx="5" ry="5" width="270" height="10" />
    <rect x="310" y="102" rx="5" ry="5" width="110" height="10" />
    <rect x="435" y="102" rx="5" ry="5" width="170" height="10" />
    <rect x="-1" y="102" rx="0" ry="0" width="12" height="12" />
  </ContentLoader>
);

export default DataTableLoader;
