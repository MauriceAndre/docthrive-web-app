import React from "react";
import { join } from "./../../../utils/arrayUtils";

function Section({ children, className }) {
  return (
    <div className="section">
      <div className="section-wrapper">
        <div className={join(["section-content", className])}>{children}</div>
      </div>
    </div>
  );
}

export default Section;
