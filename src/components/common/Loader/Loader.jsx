import React from "react";
import { Spinner } from "react-bootstrap";
import style from "./Loader.module.css";

function Loader(props) {
  return (
    <div className={style.loader}>
      <Spinner animation="border" variant="primary" {...props} />
    </div>
  );
}

export default Loader;
