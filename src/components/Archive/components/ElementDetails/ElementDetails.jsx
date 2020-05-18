import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import FloatingButton, {
  FloatingGroup,
} from "./../../../common/FloatingButton";
import DetailsForm from "./DetailsForm";
import { initT, t, useT } from "../../../../utils/intl";
import { compact } from "../../../../utils/arrayUtils";
import { format, isRoot } from "../../../../utils/elementUtils";

const ElementDetails = ({ element, edit, doSubmit, onEdit, onCancel }) => {
  initT(useT(), "elementDetails");
  const [onSubmit, setOnSubmit] = useState();

  const handleInitForm = (onSubmitFnc) => {
    setOnSubmit(() => (e) => onSubmitFnc(e));
    return doSubmit;
  };

  const fElement = format(element, { ignoreEmptyValue: edit });

  if (edit) fElement.labels = element.labels;

  let buttons = [
    <FloatingButton
      text={edit ? t("save") : t("edit")}
      variant={edit ? "success" : ""}
      icon={edit ? "check" : "pen"}
      onClick={(e) => {
        if (edit) {
          const isSubmited = onSubmit(e);
          if (!isSubmited) return;
        }
        onEdit();
      }}
    />,
    edit && (
      <FloatingButton
        text={t("cancel")}
        variant={"danger"}
        icon={"times"}
        onClick={() => onCancel()}
      />
    ),
  ];
  buttons = compact(buttons);

  return (
    <Container className="p-3 section-content overflow-auto">
      <DetailsForm element={fElement} edit={edit} onInitForm={handleInitForm} />
      {!isRoot(element) && (
        <FloatingGroup bottom right>
          {buttons}
        </FloatingGroup>
      )}
    </Container>
  );
};

ElementDetails.propTypes = {
  selectedElement: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ archive }) => {
  return {
    docVersion: archive.workVersion,
  };
};

export default connect(mapStateToProps)(ElementDetails);
