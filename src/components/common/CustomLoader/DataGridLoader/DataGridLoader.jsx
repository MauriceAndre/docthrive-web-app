import React from "react";
import ContentLoader from "react-content-loader";

const DataGridLoader = (props) => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={"auto"}
    viewBox="0 0 440 160"
    backgroundColor="#d9d9d9"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="7" y="7" rx="3" ry="3" width="136" height="36" />
    <rect x="151" y="7" rx="3" ry="3" width="136" height="36" />
    <rect x="295" y="7" rx="3" ry="3" width="136" height="36" />
    <rect x="7" y="52" rx="3" ry="3" width="136" height="36" />
    <rect x="151" y="52" rx="3" ry="3" width="136" height="36" />
    <rect x="295" y="52" rx="3" ry="3" width="136" height="36" />
    <rect x="7" y="98" rx="3" ry="3" width="136" height="36" />
    <rect x="151" y="98" rx="3" ry="3" width="136" height="36" />
    <rect x="295" y="98" rx="3" ry="3" width="136" height="36" />
  </ContentLoader>
);

export default DataGridLoader;
