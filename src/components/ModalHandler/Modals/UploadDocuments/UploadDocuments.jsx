import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import { Row, Col } from "react-bootstrap";
import Form from "../../../common/Form";
import List from "./../../../common/List";
import TreeView from "../../../common/TreeView";
import Dropzone from "./../../../common/Dropzone";
import { updateObject } from "./../../../../utils/objectUtils";
import { t, initT } from "../../../../utils/intl";
import style from "./UploadDocuments.module.css";

class UploadDocuments extends Form {
  state = {
    data: {
      labels: [],
    },
    errors: {},
    selectedElement: {},
    files: [],
  };

  schema = {
    labels: Joi.array().label("Labels"),
  };

  componentDidMount() {
    const { onInitForm, files } = this.props;

    const doSubmit = onInitForm(this.handleSubmit);
    this.doSubmit = () => {
      let { data, selectedElement, files } = this.state;
      data = updateObject(data, { parentId: selectedElement._id });
      return doSubmit(data, files);
    };

    this.setState({ files });
  }

  handleSelect = (selectedElement) => {
    this.setState({ selectedElement });
  };

  handleGetChildren = (parentId) => {
    this.props.getChildren(parentId);
  };

  handleFileDrop = (files) => {
    const mergeFiles = [...this.state.files];
    for (let file of files) {
      const isIncluded = mergeFiles.find((mFile) => mFile.path === file.path);
      if (!isIncluded) mergeFiles.push(file);
    }

    this.setState({ files: mergeFiles });
  };

  handleRemoveFile = (rFile) => {
    const files = this.state.files.filter((file) => file.path !== rFile.path);
    this.setState({ files });
  };

  render() {
    const { elements } = this.props;
    const { selectedElement, files } = this.state;
    initT(null, "uploadDocuments");

    return (
      <Form.Container>
        <Row>
          <Col xs={12} lg={6}>
            <Row>
              <Col>
                <Form.LabelSelectGroup
                  name="labels"
                  label={t("labels")}
                  multi
                  scope={this}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TreeView
                  selectedId={selectedElement._id}
                  onSelect={this.handleSelect}
                  getChildren={this.handleGetChildren}
                  elements={elements}
                  onlyFolders={true}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} lg={6}>
            <div className="mb-2">
              <span>
                {t("selectedFilesDesc", { data: { count: files.length } })}:
              </span>
              <div className={style["file-list"]}>
                <List
                  items={files}
                  mapItem={(file) => ({ content: file.name, key: file.path })}
                  onRemove={this.handleRemoveFile}
                />
              </div>
            </div>
            <Dropzone size="lg" onDrop={this.handleFileDrop} />
          </Col>
        </Row>
      </Form.Container>
    );
  }
}

const mapStateToProps = ({ archive }) => {
  return {
    elements: archive.elements,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChildren: (...params) => dispatch(actionCreators.getChildren(...params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocuments);
