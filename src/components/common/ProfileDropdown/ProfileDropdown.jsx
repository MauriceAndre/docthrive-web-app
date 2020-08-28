import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Icon from "./../Icon";
import { useT, initT, t } from "../../../utils/intl";

function ProfileDropdown() {
  initT(useT(), "profileDropdown");

  return (
    <Dropdown alignRight>
      <Dropdown.Toggle size="sm" className="bg-transparent text-dark border-0">
        <Icon name="user-circle" size="2x" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="text-center">
        <Dropdown.Item disabled>{t("profile")}</Dropdown.Item>
        <Dropdown.Item disabled>{t("settings")}</Dropdown.Item>
        <Dropdown.Item as={Link} to="/logout">
          {t("logout")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileDropdown;
