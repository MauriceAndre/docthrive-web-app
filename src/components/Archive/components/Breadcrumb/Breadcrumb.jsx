import React from "react";

function Breadcrumb() {
  return (
    <div className="section-content">
      <Breadcrumb /*className={style.breadcrumb}*/>
        <Breadcrumb.Item href="">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="">Library</Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default Breadcrumb;
