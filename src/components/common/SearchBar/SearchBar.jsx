import React from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import style from "./SearchBar.module.css";
import { useT, initT, t } from "../../../utils/intl";

function SearchBar() {
  initT(useT(), "searchBar");

  return (
    <Form>
      <InputGroup size="sm" className={style["search-bar"]}>
        <FormControl
          name="search"
          className={style["search-input"]}
          placeholder={t("placeholder")}
        />
        <InputGroup.Append>
          <Button
            variant="light"
            className={["border-left-0 bg-white", style["search-btn"]]}
          >
            <FontAwesome name="search" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
