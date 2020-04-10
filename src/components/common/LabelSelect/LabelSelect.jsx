import React, { Component } from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { withTranslation } from "react-i18next";
import { initT, t } from "../../../utils/intl";
import { getAllLabels, saveLabel } from "../../../services/labelService";
import PropTypes from "prop-types";

class LabelSelect extends Component {
  state = {
    labels: [],
  };

  componentDidMount = async () => {
    const labels = await this.loadLabels();
    this.setState({ labels });
  };

  loadLabels = async () => {
    let labels = await getAllLabels();
    labels = labels.map((label) => this.mapToViewModel(label));
    return labels;
  };

  mapToViewModel({ custom, name, id }) {
    return {
      label: custom ? name : t(`options.${name}`),
      value: id,
    };
  }

  handleCreateLabel = async (label) => {
    await saveLabel(label);
    const labels = await this.loadLabels();
    this.setState({ labels });
  };

  render() {
    const { labels } = this.state;
    const { multi, creatable, selectedOption, onChange } = this.props;
    initT(this.props.t, "labelSelect");

    const props = {
      isMulti: multi,
      value: selectedOption,
      onChange: onChange,
      options: labels,
      noOptionsMessage: () => t("noLabelMsg"),
    };

    return creatable ? (
      <Creatable
        onCreateOption={this.handleCreateLabel}
        formatCreateLabel={(value) => `${t("createLabelMsg")} "${value}"`}
        {...props}
      />
    ) : (
      <Select {...props} />
    );
  }
}

LabelSelect.propTypes = {
  multi: PropTypes.bool,
  creatable: PropTypes.bool,
  selectedOption: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withTranslation()(LabelSelect);
