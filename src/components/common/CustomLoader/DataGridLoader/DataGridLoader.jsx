import React from "react";
import ContentLoader from "react-content-loader";

const DataGridLoader = ({ columns, ...props }) => {
  columns = columns || 3;
  const vbWidth = 146;

  const grid = [
    [
      <rect x="7" y="7" rx="3" ry="3" width="136" height="30" />,
      <rect x="151" y="7" rx="3" ry="3" width="136" height="30" />,
      <rect x="295" y="7" rx="3" ry="3" width="136" height="30" />,
    ],
    [
      <rect x="7" y="45" rx="3" ry="3" width="136" height="30" />,
      <rect x="151" y="45" rx="3" ry="3" width="136" height="30" />,
      <rect x="295" y="45" rx="3" ry="3" width="136" height="30" />,
    ],
    [
      <rect x="7" y="83" rx="3" ry="3" width="136" height="30" />,
      <rect x="151" y="83" rx="3" ry="3" width="136" height="30" />,
      <rect x="295" y="83" rx="3" ry="3" width="136" height="30" />,
    ],
  ];

  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={"auto"}
      viewBox={`0 0 ${vbWidth * columns} 160`}
      backgroundColor="#d9d9d9"
      foregroundColor="#ecebeb"
      {...props}
    >
      {grid.map((row) => row.slice(0, columns))}
    </ContentLoader>
  );
};

export default DataGridLoader;
