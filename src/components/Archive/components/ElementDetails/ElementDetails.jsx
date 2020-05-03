import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actionCreators from "./../../../../store/actions/index";
import store from "./../../../../store";
import { Container } from "react-bootstrap";
import FloatingButton from "./../../../common/FloatingButton";
import DetailsForm from "./DetailsForm";
import { initT, t, useT } from "../../../../utils/intl";
import { updateObject } from "./../../../../utils/objectUtils";
import { format, isRoot } from "../../../../utils/elementUtils";
import * as feedback from "./../../../../utils/feedback";

const ElementDetails = ({
  selectedElement,
  edit,
  onEditClick,
  updateElement,
}) => {
  initT(useT(), "elementDetails");

  const [onSubmit, setOnSubmit] = useState();

  const doSubmit = (data) => {
    const element = updateObject(
      store.getState().archive.selectedElement,
      data
    );
    updateElement(element);
    feedback.action(
      t("elementDetails.feedback.succ", {
        useNamespace: false,
      }),
      feedback.TYPE.SUCCESS
    );
  };

  const handleInitForm = (onSubmitFnc) => {
    setOnSubmit(() => (e) => onSubmitFnc(e));
    return doSubmit;
  };

  const element = format(selectedElement, { ignoreEmptyValue: edit });

  if (edit) element.labels = selectedElement.labels;

  return (
    <Container className="p-3 section-content overflow-auto">
      <DetailsForm element={element} edit={edit} onInitForm={handleInitForm} />
      {!isRoot(selectedElement) && (
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateElement: (element) =>
      dispatch(actionCreators.updateElement(element._id, element)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ElementDetails);
