import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { initT, t } from "../../../utils/intl";
import { toArray } from "../../../utils/arrayUtils";
import { saveLabel } from "../../../services/labelService";
import PropTypes from "prop-types";

class LabelSelect extends Component {
  loadLabels = () => {
    let { labels } = this.props;
    labels = labels.map((label) => this.mapToViewModel(label));
    return labels;
  };

  mapToViewModel({ custom, name, _id }) {
    return {
      label: custom ? name : t(`options.${name}`),
      value: _id,
    };
  }

  mapToDataModel({ value }) {
    let { labels } = this.props;
    return labels.find((label) => label._id === value);
  }

  handleCreateLabel = async (label) => {
    await saveLabel(label);
    const labels = await this.loadLabels();
    this.setState({ labels });
  };

  handleChange = (option) => {
    option = toArray(option);
    option = option.map((label) => this.mapToDataModel(label));
    this.props.onChange(option);
  };

  render() {
    const { multi, creatable, selectedOption = [] } = this.props;
    initT(this.props.t, "labelSelect");
    const labels = this.loadLabels();
    const value = selectedOption.map((label) => this.mapToViewModel(label));

    const props = {
      isMulti: multi,
      value,
      onChange: this.handleChange,
      options: labels,
      noOptionsMessage: () => t("noLabelMsg"),
      placeholder: t("placeholder"),
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
  selectedOption: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = ({ archive }) => {
  return { labels: archive.labels };
};

export default withTranslation()(connect(mapStateToProps)(LabelSelect));
