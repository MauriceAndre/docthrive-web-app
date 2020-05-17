import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import { Row, Col } from "react-bootstrap";
import Form from "../../../common/Form";
import List from "./../../../common/List";
import Dropzone from "./../../../common/Dropzone";
import { t, initT } from "../../../../utils/intl";
import { getElementSchema } from "./../../../../utils/validationUtils";
import style from "./UploadDocuments.module.css";

class UploadDocuments extends Form {
  state = {
    data: {
      labels: [],
      parentId: null,
    },
    errors: {},
    files: [],
  };

  schema = getElementSchema(["labels", "parentId"]);

  componentDidMount() {
    const { onInitForm, files } = this.props;

    const doSubmit = onInitForm(this.handleSubmit);
    this.doSubmit = () => {
      let { data, files } = this.state;
      return doSubmit(data, files);
    };

    this.setState({ files });
  }

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
    const { elements, getChildren } = this.props;
    const { files } = this.state;
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
                <Form.TreeSelectGroup
                  name="parentId"
                  label={t("parentId")}
                  getChildren={getChildren}
                  elements={elements}
                  onlyFolders={true}
                  scope={this}
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
    getChildren: (parentId) => dispatch(actionCreators.getChildren(parentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocuments);
