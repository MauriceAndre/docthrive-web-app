import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import FloatingButton from "./../../../common/FloatingButton";
import DetailsForm from "./DetailsForm";
import { initT, t, useT } from "../../../../utils/intl";
import { format, isRoot } from "../../../../utils/elementUtils";
import {} from "react";

const ElementDetails = ({ element, edit, doSubmit, onEditClick }) => {
  initT(useT(), "elementDetails");
  const [onSubmit, setOnSubmit] = useState();

  const handleInitForm = (onSubmitFnc) => {
    setOnSubmit(() => (e) => onSubmitFnc(e));
    return doSubmit;
  };

  const fElement = format(element, { ignoreEmptyValue: edit });

  if (edit) fElement.labels = element.labels;

  return (
    <Container className="p-3 section-content overflow-auto">
      <DetailsForm element={fElement} edit={edit} onInitForm={handleInitForm} />
      {!isRoot(element) && (
        <FloatingButton
          text={(edit && t("save")) || t("edit")}
          variant={(edit && "success") || ""}
          icon={(edit && "check") || "pen"}
          bottom
          right
          onClick={(e) => {
            if (edit) {
              const isSubmited = onSubmit(e);

              if (!isSubmited) return;
            }
            onEditClick();
          }}
        />
      )}
    </Container>
  );
};

ElementDetails.propTypes = {
  selectedElement: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({ archive }) => {
  return {
    docVersion: archive.workVersion,
  };
};
export default connect(mapStateToProps)(ElementDetails);
