import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { confirmUser } from "../../services/userService";
import { handleCatch } from "./../../utils/errorHandler";

const Confirm = ({ match }) => {
  const { id } = match.params;
  const [active, setActive] = useState(false);

  useEffect(() => {
    const exec = async () => {
      await confirmUser(id);
      setActive(true);
    };
    exec().catch((ex) => {
      handleCatch(ex);
    });
  }, [id]);

  return (
    <Container>
      <h1>
        {active
          ? "Your account was confirmed and is active"
          : "Your account is inactive"}
        : {match.params.id}
      </h1>
    </Container>
  );
};

export default withRouter(Confirm);
